import { OrderItemEntity } from './OrderItemEntity';

export class OrderEntity {
  order_id: number;
  order_date: Date;
  order_total: number;
  customer_id: number;
  order_items: OrderItemEntity[];

  constructor(
    order_id: number,
    order_date: Date,
    order_total: number,
    customer_id: number,
    order_items: OrderItemEntity[],
  ) {
    this.order_id = order_id;
    this.order_date = order_date;
    this.order_total = order_total;
    this.order_items = order_items;
    this.customer_id = customer_id;
  }
}
