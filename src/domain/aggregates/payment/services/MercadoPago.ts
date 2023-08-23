import PaymentProviderInterface from '../interfaces/PaymentProviderInterface';

export class MercadoPago implements PaymentProviderInterface {
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
