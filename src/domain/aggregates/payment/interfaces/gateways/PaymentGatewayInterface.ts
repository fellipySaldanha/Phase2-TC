import { OrderPaymentEntity } from '../../core/entities/OrderPaymentEntity';

export interface PaymentGatewayInterface {
  getPaymentStatus(orderId?: number): Promise<string>;
  createPayment(
    orderId: number,
    paymentMethod: number,
  ): Promise<OrderPaymentEntity>;

  confirmPayment(orderId: number, paymentStatus: number): any;
}
