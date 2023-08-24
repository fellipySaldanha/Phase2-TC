export class OrderPaymentEntity {
  payment_id: number;
  last_update: Date;
  status: string;
  payment_method: string;

  constructor(
    payment_id: number,
    last_update: Date,
    status: string,
    payment_method: string,
  ) {
    this.payment_id = payment_id;
    this.last_update = last_update;
    this.status = status;
    this.payment_method = payment_method;
  }
}
