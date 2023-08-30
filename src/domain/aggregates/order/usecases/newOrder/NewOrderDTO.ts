import { IOrderItem } from '../../interfaces/IOrderItem';

export interface NewOrderInputDTO {
  customer_id?: number;
  order_items: IOrderItem[];
}

export interface NewOrderOutputDTO {
  hasError: boolean;
  orderId: number;
  message?: string;
  httpCode?: number;
}