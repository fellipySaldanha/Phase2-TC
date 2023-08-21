import { MercadoPago } from '../services/MercadoPago';
import { PaymentGatewayInterface } from '../interfaces/gateways/PaymentGatewayInterface';

export class PaymentRepository implements PaymentGatewayInterface {
  private paymentMethod: MercadoPago;

  constructor() {
    this.paymentMethod = new MercadoPago();
  }

  makePayment(order_id: number, total: number): boolean {
    return this.paymentMethod.makePayment(order_id, total);
  }
}
