export interface OrderGatewayInterface {
	getOrders(orderId?: number): Promise<any>;
	newOrder(customerId: number, total: number): any;
	insertOrderItems(items: any): any;
	addOrderQueue(orderId: number): Promise<number | null>;
	beginTransaction(): void;
	commit(): void;
	rollback(): void;
}
