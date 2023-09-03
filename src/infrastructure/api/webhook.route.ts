import { Request, Response } from 'express';
import { OrderPaymentController } from '../../domain/aggregates/payment/controllers/OrderPaymentController';
import { PaymentConfirmationMock } from './json/PaymentConfirmationMock';
import HttpServer from '../../application/ports/HttpServer';

export class WebhookRoute {
  private readonly httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.routes();
  }

  async routes() {
    this.httpServer.register(
      'post',
      '/webhook/confirm_webhook_payment',
      async (req: Request, res: Response) => {
        try {
          let paymentConfirmationMock = new PaymentConfirmationMock();

          const output = await OrderPaymentController.confirmMockPaymentOrder(
            paymentConfirmationMock.order_id as number,
            paymentConfirmationMock.payment_status as number,
          );
          return res.status(200).json(output.message);
        } catch (error) {
          return res.status(400).json({ error });
        }
      },
    );
  }
}
