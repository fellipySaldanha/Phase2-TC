import { Request, Response } from 'express';
import { OrderController } from '../../domain/aggregates/order/controllers/OrderController';
import { ListOrderOutputDTO } from '../../domain/aggregates/order/usecases/listOrder/ListOrderDTO';
import HttpServer from '../../application/ports/HttpServer';

export default class OrderRoute {
  private readonly httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.routes();
  }

  async routes() {
    this.httpServer.register(
      'get',
      '/order',
      async (req: Request, res: Response) => {
        try {
          const id = req.query.id ? Number(req.query.id) : undefined;
          const output: ListOrderOutputDTO = await OrderController.getOrders(
            id,
          );

          if (output.hasError) {
            return res
              .status(!output.httpCode ? 500 : output.httpCode)
              .json({ Error: output.message });
          } else {
            return res.status(200).json(output.result);
          }
        } catch (error) {
          return res.status(500).json({ error });
        }
      },
    );

    this.httpServer.register(
      'post',
      '/order',
      async (req: Request, res: Response) => {
        try {
          const result = await OrderController.newOrder(req.body);
          if (result?.hasError) {
            return res
              .status(!result.httpCode ? 500 : result.httpCode)
              .json({ Error: result.message });
          } else {
            return res.status(201).json(result?.result);
          }
        } catch (error) {
          res.status(400).json({ error });
        }
      },
    );
  }
}
