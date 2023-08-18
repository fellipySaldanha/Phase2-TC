import { OrderItem } from "../../interfaces/IOrderItem";

export interface ListOrderInputDTO {
	id?: number;
}

export interface ResultOrderDTO {
	id: number;
	order_date: Date;
	order_total: number;
	customer_id: number;
	order_items: OrderItem[];
}

export interface ListOrderOutputDTO {
	hasError: boolean;
	message?: string;
	result?: ResultOrderDTO[];
}
