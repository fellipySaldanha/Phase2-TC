// DTOs
import { NewOrderInputDTO, NewOrderOutputDTO } from './NewOrderDTO';

// Interfaces
import { IOrderItem } from '../../interfaces/IOrderItem';

// Gateways
import { OrderGatewayInterface } from '../../interfaces/gateways/OrderGatewayInterface';

// Entities
import { OrderEntity } from '../../core/entities/OrderEntity';
import { OrderItemEntity } from '../../core/entities/OrderItemEntity';
import PaymentProviderInterface from '../../../payment/interfaces/PaymentProviderInterface';
import { PaymentCheckoutInputDTO } from '../../../payment/usecases/paymentCheckout/PaymentCheckoutDTO';
import { PaymentMethod } from '../../../../sharedKernel/enums/PaymentMethod';
import ICheckout from '../../../payment/interfaces/ICheckout';

export class NewOrderUseCase {
  static async execute(
    body: NewOrderInputDTO,
    orderGateway: OrderGatewayInterface,
    paymentGateway: PaymentProviderInterface,
    checkout: ICheckout,
  ): Promise<NewOrderOutputDTO> {
    let _order: OrderEntity;
    let _orderItems: OrderItemEntity[] = [];

    try {
      const { customer_id, order_items } = body;

      _orderItems = await this.loadItemPrices(orderGateway, body.order_items);
      _order = new OrderEntity(body.customer_id, _orderItems);
      const order_total = _order.totalOrderPrice();

      orderGateway.beginTransaction();

      let order_id = await orderGateway.newOrder(customer_id || 1, order_total);

      //insert order_items
      const formated_order_items = NewOrderUseCase.formatOrderItems(
        order_id,
        order_items,
      );
      await orderGateway.insertOrderItems(formated_order_items);

      //adding order into the order_queue
      await orderGateway.addOrderQueue(order_id);

      orderGateway.commit();

      let output: NewOrderOutputDTO = {
        hasError: false,
        orderId: order_id,
        httpCode: 200,
      };

      const inputCheckout: PaymentCheckoutInputDTO = {
        orderId: order_id,
        order_items: formated_order_items,
        paymentMethod: PaymentMethod.QrCode,
      };
      const checkoutResult = await checkout.execute(inputCheckout);
      return output;
    } catch (error) {
      console.log(
        'Error by inserting a new order. Please, check your data.',
        error,
      );
      orderGateway.rollback();

      let output: NewOrderOutputDTO = {
        orderId: 0,
        hasError: true,
        message: 'Error by inserting a new order. Please, check your data.',
        httpCode: 500,
      };

      return output;
    }
  }

  static formatOrderItems(
    order_id: number,
    order_items: IOrderItem[],
  ): IOrderItem[] {
    let queryParams: IOrderItem[] = [];
    for (let i in order_items) {
      const { item_id, order_item_qtd } = order_items[i];

      queryParams.push({
        order_id: order_id,
        item_id: order_items[i].item_id,
        order_item_qtd: order_items[i].order_item_qtd,
      });
    }
    return queryParams;
  }

  static async loadItemPrices(
    gateway: OrderGatewayInterface,
    order_items: IOrderItem[],
  ) {
    let ids: number[] = [];
    let items = new Map<number, IOrderItem>();
    let ret: OrderItemEntity[] = [];

    for (let i in order_items) {
      ids.push(order_items[i].item_id);
      items.set(order_items[i].item_id, order_items[i]);
    }

    let result = await gateway.getItemPrices(ids);
    for (let row of result) {
      var ordemItem = new OrderItemEntity();
      ordemItem.item_id = row.id;
      ordemItem.order_item_qtd = items.get(row.id)?.order_item_qtd;
      ordemItem.price = row.item_price;

      ret.push(ordemItem);
    }

    return ret;
  }
}
