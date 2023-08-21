import { PaymentGatewayInterface } from '../interfaces/gateways/PaymentGatewayInterface';

export class MercadoPago implements PaymentGatewayInterface {
  constructor() {
    /////////////////////////////////////////
    //
    //Initializes Payment API from a provider
    //
    //TODO
    //
    /////////////////////////////////////////
  }

  makePayment(orderId: number, orderValue: number): boolean {
    //fake interaction mocking a payment process
    if (orderId > 0) {
      return true;
    } else {
      return false;
    }
  }
}
