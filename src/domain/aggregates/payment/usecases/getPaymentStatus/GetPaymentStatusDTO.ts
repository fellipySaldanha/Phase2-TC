export interface GetPaymentStatusInputDTO {
  id?: number;
}

export interface GetPaymentStatusOutputDTO {
  hasError: boolean;
  message?: string;
  result?: string;
}
