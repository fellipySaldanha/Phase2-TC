import { Request, Response } from 'express';
import { GetPaymentStatusOutputDTO } from '../../domain/aggregates/payment/usecases/getPaymentStatus/GetPaymentStatusDTO';
import { OrderPaymentController } from '../../domain/aggregates/payment/controllers/OrderPaymentController';
import HttpServer from '../../application/ports/HttpServer';

export class PaymentRoute {
  private readonly httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.routes();
  }

  async routes() {
    this.httpServer.register(
      'get',
      '/payment/status',
      async (req: Request, res: Response) => {
        try {
          const id = req.query.id ? Number(req.query.id) : undefined;
          const output: GetPaymentStatusOutputDTO =
            await OrderPaymentController.getPaymentOrder(id);
          return res.status(200).json(output.result);
        } catch (error) {
          return res.status(400).json({ error });
        }
      },
    );
  }
}
