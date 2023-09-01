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

      let msg: string;
      let output: ListOrderOutputDTO = {
        hasError: false,
        result: [],
      };

      if (result.length == 0) {
        output = { hasError: true, httpCode: 404 };

        if (params.id) {
          msg = 'Order ' + Number(params.id) + ' not found. Please, certity that it is a valid Order Number!';
        } else {
          msg = 'Ops, No Orders found. Something went wrong... :(';
        }
        output.message = msg;
        console.log(msg);
        
        return output;
      } else {
        const orders: OrderEntity[] = result.map((result: any) => {
          return {
            ...result,
            order_items: JSON.parse(result.order_items),
          };
        });

        const filteredOrders = this.filterOrders(orders);
        filteredOrders.forEach((element: any) => {
          const resultOrder: ResultOrderDTO = 
          { order_id: element.order_id, 
            order_date: element.order_date, 
            order_total: element.order_total, 
            order_status: element.order_status,
            customer_name: element.customer_name, 
            order_items: element.order_items} = element;
            
            output.result?.push(resultOrder);
        });
        return output;
      }
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
