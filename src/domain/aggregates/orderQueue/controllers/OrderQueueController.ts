import { Request, Response, query } from 'express';
import HttpServer from '../../../../application/ports/HttpServer';
import IOrderQueueRepository from '../core/ports/IOrderQueueGateway';
import { ParsedQs } from 'qs';
import {
  OrderQueueStatus,
  OrderWaitingTime,
} from '../core/entities/OrderQueue';
import { GetOrderQueueUseCase } from '../usecases/getOrderQueue/GetOrderQueue';
import MySqlOrderQueueRepository from '../gateways/OrderQueueRepository';
import {
  GetOrderQueueInputDTO,
  GetOrderQueueOutputDTO,
} from '../usecases/getOrderQueue/GetOrderQueueDTO';
import { MoveNextInputDTO } from '../usecases/moveNext/MoveNextDTO';
import { MoveNextUseCase } from '../usecases/moveNext/MoveNext';

export class OrderQueueController {
  static async getOrderQueue(orderId?: number): Promise<any> {
    const orderQueueGateway = new MySqlOrderQueueRepository();
    const input: GetOrderQueueInputDTO = {
      id: orderId,
    };
    return await GetOrderQueueUseCase.execute(input, orderQueueGateway);
  }

  static async moveNext(orderId: number): Promise<any> {
    const orderQueueGateway = new MySqlOrderQueueRepository();
    const input: MoveNextInputDTO = {
      id: orderId,
    };
    return await MoveNextUseCase.execute(input, orderQueueGateway);
  }
}
