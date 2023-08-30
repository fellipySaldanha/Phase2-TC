import { OrderEntity } from '../../core/entities/OrderEntity';
import { OrderItemEntity } from '../../core/entities/OrderItemEntity';
import { OrderGatewayInterface } from '../../interfaces/gateways/OrderGatewayInterface';
import { ListOrderInputDTO, ListOrderOutputDTO, ResultOrderDTO } from './ListOrderDTO';

export class ListOrderUseCase {
  static async execute(
    params: ListOrderInputDTO,
    OrderGateway: OrderGatewayInterface,
  ): Promise<ListOrderOutputDTO> {
    try {
      let result = null;
      if (params.id) {
        result = await OrderGateway.getOrders(Number(params.id));
      } else {
        result = await OrderGateway.getOrders();
      }

      const orders: OrderEntity[] = result.map((result: any) => {
        return {
          ...result,
          order_items: JSON.parse(result.order_items),
        };
      });

      let output: ListOrderOutputDTO = {
        hasError: false,
        result: [],
      };

      const filteredOrders = this.filterOrders(orders);
      filteredOrders.forEach((element: any) => {
        const {
          order_id,
          order_date,
          order_total,
          customer_id,
          customer_name,
          order_status,
          order_items,
        } = element;

        const orderEntity: ResultOrderDTO = { order_id, order_date, order_total, order_status, customer_name, order_items }  
        output.result?.push(orderEntity);
      });
      return output;

    } catch (error: any) {
      console.log('Error in query Database', error);
      const output = {
        hasError: true,
        message: error,
      };

      return output;
    }
  }

  static filterOrders(orders: OrderEntity[]) {
    // Filtrar e remover pedidos com status "Finalizado"
    const filteredOrders = orders.filter(
      (order) => order.order_status !== 'Finalizado',
    );

    // Definir a ordem personalizada dos status
    const customStatusOrder = ['Pronto', 'Em Preparação', 'Recebido'];

    // Ordenar por status personalizado e depois por data
    filteredOrders.sort((a, b) => {
      if (a.order_status && b.order_status) {
        const statusComparison =
          customStatusOrder.indexOf(a.order_status) -
          customStatusOrder.indexOf(b.order_status);

        if (statusComparison !== 0) {
          return statusComparison;
        }
      }

      const dateA = new Date(Number(a.order_date)).getTime();
      const dateB = new Date(Number(b.order_date)).getTime();

      return dateB - dateA; // Ordenação decrescente por data
    });

    return filteredOrders;
  }
}
