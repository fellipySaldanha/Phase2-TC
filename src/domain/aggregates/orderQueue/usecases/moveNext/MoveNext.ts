import {
  OrderQueueStatus,
  OrderWaitingTime,
} from '../../core/entities/OrderQueue';
import IOrderQueueGateway from '../../core/ports/IOrderQueueGateway';
import {
  MoveNextInputDTO,
  MoveNextOutputDTO,
  orderqueueInfo,
} from './MoveNextDTO';

export class MoveNextUseCase {
  static async execute(
    params: MoveNextInputDTO,
    gateway: IOrderQueueGateway,
  ): Promise<MoveNextOutputDTO> {
    try {
      gateway.beginTransaction();

      const myOrder = await gateway.getOrderQueueStatus(params.id);
      if (myOrder.length == 0) {
        gateway.rollback();

        const output = {
          hasError: true,
          message:
            'Order not found in the queue. Please, certify that it is a valid Order Number.',
          httpCode: 404,
        };

        console.log(
          'Order not found in the queue. Please, certify that it is a valid Order Number.',
        );
        return output;
      }

      var status_queue_enum_id = myOrder[0].status_queue_enum_id;
      var waiting_time = myOrder[0].waiting_time;

      //set the status the the next level (see OrderQueueStatus enum): 1: Recebido, 2: Em preparação; 3: Pronto; 4: Finalizado
      if (status_queue_enum_id != OrderQueueStatus.Finalizado) {
        status_queue_enum_id++;

        if (status_queue_enum_id == OrderQueueStatus.EmPreparacao) {
          waiting_time = OrderWaitingTime.TempoEmPreparacao;
        } else {
          waiting_time = OrderWaitingTime.TempoPronto;
        }
      } else {
        gateway.rollback();
        const output = {
          hasError: true,
          message: 'WARNING: Order has already delivered!',
          httpCode: 409,
        };
        console.log('WARNING: Order has already delivered!');
        return output;
      }

      await gateway.updateOrderQueue(
        params.id,
        status_queue_enum_id,
        waiting_time,
      );
      gateway.commit();

      const result = await gateway.getOrderQueue(params.id);
      const output = this.transformToOutput(result);
      return output;
    } catch (error: any) {
      gateway.rollback();

      const output = {
        hasError: true,
        message: 'Failed to get order queue information',
        httpCode: 500,
      };

      console.log('Error moving order into the queue', error);
      return output;
    }
  }

  static transformToOutput(result: any): MoveNextOutputDTO {
    let output: MoveNextOutputDTO = {
      hasError: false,
      result: [],
    };

    result.forEach((element: any) => {
      let orderQueue: orderqueueInfo = {
        id: element.order_id,
        status: element.status_queue,
        waiting_time: element.waiting_time,
      };
      output.result?.push(orderQueue);
    });

    return output;
  }
}
