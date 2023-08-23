export interface PaymentGatewayInterface {
  getPaymentStatus(orderId?: number): Promise<string>;
}
