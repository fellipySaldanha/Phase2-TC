import { IOrderItem } from '../../interfaces/IOrderItem';

export interface ListOrderInputDTO {
  id?: number;
}

export interface ResultOrderDTO {
  order_id: number;
  order_date: Date;
  order_total: number;
  order_status?: string;
  customer_name?: string;
  order_items: IOrderItem[];
}

export interface ListOrderOutputDTO {
  hasError: boolean;
  message?: string;
  result?: ResultOrderDTO[];
  httpCode?: number;
}
