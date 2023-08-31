import { PaymentStatusCode } from '../../../../sharedKernel/enums/PaymentStatus';

export class OrderPaymentEntity {
  payment_id?: number;
  order_id: number;
  last_update: Date;
  status: number;
  payment_method: number;

  constructor(
    orderId: number,
    last_update: Date,
    status: number,
    payment_method: number,
    payment_id?: number,
  ) {
    this.order_id = orderId;
    this.payment_id = payment_id;
    this.last_update = last_update;
    this.status = status;
    this.payment_method = payment_method;
  }

  static buildPayment(
    orderId: number,
    paymentMethod: number,
  ): OrderPaymentEntity {
    let payment: OrderPaymentEntity = new OrderPaymentEntity(
      orderId,
      new Date(),
      PaymentStatusCode.Pending,
      paymentMethod,
    );
    return payment;
  }
}
