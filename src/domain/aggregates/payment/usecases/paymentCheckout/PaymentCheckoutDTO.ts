export interface PaymentCheckoutInputDTO {
  orderId: number;
  order_items: orderItems[];
  paymentMethod: number;
}

export interface PaymentCheckoutOutputDTO {
  hasError: boolean;
  paymentId?: number;
  status?: number;
  message?: string;
}

type orderItems = {
  order_id: number;
  item_id: number;
  order_item_qtd: number;
};
