export default interface PaymentProviderInterface {
  makePayment(orderId: number, orderValue: number): boolean;
}
