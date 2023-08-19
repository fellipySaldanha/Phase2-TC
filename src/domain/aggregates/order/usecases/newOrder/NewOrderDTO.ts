import { OrderItem } from "../../interfaces/IOrderItem";

export interface NewOrderInputDTO {
	id: number;
	order_date: Date;
	order_total: number;
	customer_id: number;
	order_items: OrderItem[];
}
