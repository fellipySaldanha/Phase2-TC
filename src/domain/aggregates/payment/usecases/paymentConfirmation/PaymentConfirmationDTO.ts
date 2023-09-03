export interface PaymentConfirmationInputDTO {
  orderId: number;
  paymentStatus: number;
}

export interface PaymentConfirmationOutputDTO {
  hasError: boolean;
  message?: string;
}
