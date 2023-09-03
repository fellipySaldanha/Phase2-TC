export default interface PaymentConfirmationInterface {
  confirmPayment(orderId: number, paymentStatus: number): any;
}
