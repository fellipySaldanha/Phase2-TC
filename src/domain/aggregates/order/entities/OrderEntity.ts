import { OrderItem } from "./OrderItem";

export class OrderEntity {
	id?: number;
	order_date: Date;
	order_total: number;
	order_items: OrderItem[];
	customer_id: string;

	constructor(
		order_date: Date,
		order_total: number,
		customer_id: string,
		order_items: OrderItem[],
		orderId?: number
	) {
		this.id = orderId;
		this.order_date = order_date;
		this.order_total = order_total;
		this.order_items = order_items;
		this.customer_id = customer_id;
	}
}
