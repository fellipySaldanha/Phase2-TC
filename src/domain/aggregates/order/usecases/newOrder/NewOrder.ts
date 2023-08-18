import { NewOrderInputDTO } from "./NewOrderDTO";
import { OrderGatewayInterface } from "../../interfaces/gateways/OrderGatewayInterface";

export class NewOrderUseCase {
	static async execute(
		body: NewOrderInputDTO,
		OrderGateway: OrderGatewayInterface
	): Promise<number | null> {
		try {
			const { order_total, customer_id } = body;
			const total = order_total;
			var customerId = customer_id;

			OrderGateway.beginTransaction();

			//insert order
			if (!customerId) {
				customerId = 1; //Customer Default
			}
			const order_id = await OrderGateway.newOrder(customerId, total);

			//Simulate the payment process
			// TO-DO: Verificar como vai ficar essa parte
			// if (!this.service.payOrder(order_id, total)) {
			// 	this.repository.rollback();
			// 	return response.status(400).json({
			// 		Error: "Unable to proceed with the order payment! Please, try again later",
			// 	});
			// }

			//insert order_items
			let queryParams = [];
			for (let i in body.order_items) {
				const item_id = body.order_items[i].item_id;
				const order_item_qtd = body.order_items[i].order_item_qtd;

				let param = [order_id, item_id, order_item_qtd];
				queryParams.push(param);
			}

			await OrderGateway.insertOrderItems(queryParams);

			//adding order into the order_queue
			const result = await OrderGateway.addOrderQueue(order_id);

			OrderGateway.commit();
			return result;
		} catch (error) {
			console.log("Error update customer", error);
			OrderGateway.rollback();
			return null;
		}
	}
}
