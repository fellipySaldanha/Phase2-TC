export interface PaymentGatewayInterface {
	makePayment(orderId: number, orderValue: number): boolean;
}
