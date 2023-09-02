import { PaymentCheckoutInputDTO } from '../usecases/paymentCheckout/PaymentCheckoutDTO';

export default interface ICheckout {
  execute(input?: PaymentCheckoutInputDTO): Promise<any>;
}
