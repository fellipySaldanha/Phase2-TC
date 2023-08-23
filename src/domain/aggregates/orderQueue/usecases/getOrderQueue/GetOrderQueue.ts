import IOrderQueueGateway from '../../core/ports/IOrderQueueGateway';
import {
  GetOrderQueueInputDTO,
  GetOrderQueueOutputDTO,
  orderqueueInfo,
} from './GetOrderQueueDTO';

export class GetOrderQueueUseCase {
  static async execute(
    params: GetOrderQueueInputDTO,
    gateway: IOrderQueueGateway,
  ): Promise<GetOrderQueueOutputDTO> {
    let output: GetOrderQueueOutputDTO;
    let result;

    try {
      if (params.id) {
        result = await gateway.getOrderQueue(Number(params.id));
      } else {
        result = await gateway.getOrderQueue();
      }

      output = this.transformToOutput(result);
    } catch (error: any) {
      output = {
        hasError: true,
        message: 'Failed to get order queue information',
      };

      console.log('Error in query Database', error);
    }

    return output;
  }

  static transformToOutput(result: any): GetOrderQueueOutputDTO {
    let output: GetOrderQueueOutputDTO = {
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
