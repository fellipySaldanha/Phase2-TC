// DTOs
import { NewOrderInputDTO } from "./NewOrderDTO";

// Interfaces
import { OrderGatewayInterface } from "../../interfaces/gateways/OrderGatewayInterface";
import { IOrderItem } from "../../interfaces/IOrderItem";

// Entities
import { OrderEntity } from "../../entities/OrderEntity";
import { OrderItemEntity } from "../../entities/OrderItemEntity";

export class NewOrderUseCase {
	static async execute(
		body: NewOrderInputDTO,
		OrderGateway: OrderGatewayInterface
	): Promise<OrderEntity | null> {
		try {
			const { order_total, customer_id, order_items } = body;

			OrderGateway.beginTransaction();

			const order_id = await OrderGateway.newOrder(
				customer_id || 1,
				order_total
			);
			if (!order_id) return null;

			//Simulate the payment process
			// TO-DO: Verificar como vai ficar essa parte
			// if (!this.service.payOrder(order_id, total)) {
			// 	this.repository.rollback();
			// 	return response.status(400).json({
			// 		Error: "Unable to proceed with the order payment! Please, try again later",
			// 	});
			// }

			//insert order_items
			const formated_order_items = NewOrderUseCase.formatOrderItems(
				order_id,
				order_items
			);
			await OrderGateway.insertOrderItems(formated_order_items);

			//adding order into the order_queue
			await OrderGateway.addOrderQueue(order_id);

			OrderGateway.commit();
			return new OrderEntity(
				order_id,
				new Date(),
				order_total,
				customer_id,
				formated_order_items
			);
		} catch (error) {
			console.log("Error update customer", error);
			OrderGateway.rollback();
			return null;
		}
	}

	static formatOrderItems(
		order_id: number,
		order_items: IOrderItem[]
	): IOrderItem[] {
		let queryParams: IOrderItem[] = [];
		for (let i in order_items) {
			const { item_id, order_item_qtd } = order_items[i];

			const orderItemEntity = new OrderItemEntity(
				order_id,
				item_id,
				order_item_qtd
			);

			queryParams.push({
				order_id: orderItemEntity.order_id,
				item_id: orderItemEntity.item_id,
				order_item_qtd: orderItemEntity.order_item_qtd,
			});
		}

		return queryParams;
	}
}
