import { IOrderItem } from "../IOrderItem";

export interface OrderGatewayInterface {
	getOrders(orderId?: number): Promise<any>;
	newOrder(customerId: number, total: number): Promise<number | void>;
	insertOrderItems(items: IOrderItem[]): Promise<void>;
	addOrderQueue(orderId: number): Promise<number | null>;
	beginTransaction(): void;
	commit(): void;
	rollback(): void;
}
