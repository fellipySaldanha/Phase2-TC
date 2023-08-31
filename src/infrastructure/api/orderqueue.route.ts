import { Request, Response } from 'express';
import { OrderQueueController } from '../../domain/aggregates/orderQueue/controllers/OrderQueueController';
import { ListOrderOutputDTO } from '../../domain/aggregates/order/usecases/listOrder/ListOrderDTO';

import HttpServer from '../../application/ports/HttpServer';
import { GetOrderQueueOutputDTO } from '../../domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueueDTO';
import { MoveNextOutputDTO } from '../../domain/aggregates/orderQueue/usecases/moveNext/MoveNextDTO';

export default class OrderQueueRoute {
  private readonly httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.routes();
  }

  async routes() {
    this.getOrderQueue();
    this.moveNext();
  }

  getOrderQueue() {
    this.httpServer.register(
      'get',
      '/orderqueue',
      async (req: Request, resp: Response) => {
        try {
          const output: GetOrderQueueOutputDTO =
            await OrderQueueController.getOrderQueue(Number(req.query.id));

          if (output.hasError) {
            return resp
              .status(!output.httpCode ? 500 : output.httpCode)
              .json({ Error: output.message });
          } else {
            return resp.status(200).json(output.result);
          }
        } catch (error) {
          return resp.status(400).json({ error });
        }
      },
    );
  }

  moveNext() {
    this.httpServer.register(
      'patch',
      '/orderqueue',
      async (req: Request, resp: Response) => {
        try {
          if (!req.query.id) {
            return resp
              .status(400)
              .json({ Error: 'Missing parameters. Please provide id' });
          }
          const output: MoveNextOutputDTO = await OrderQueueController.moveNext(
            Number(req.query.id),
          );

          if (output.hasError) {
            return resp
              .status(!output.httpCode ? 500 : output.httpCode)
              .json({ Error: output.message });
          } else {
            return resp.status(200).json(output.result);
          }
        } catch (error) {
          return resp.status(500).json({ error });
        }
      },
    );
  }
}
