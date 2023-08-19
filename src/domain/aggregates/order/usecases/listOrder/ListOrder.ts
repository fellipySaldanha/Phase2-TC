import { OrderGatewayInterface } from "../../interfaces/gateways/OrderGatewayInterface";
import {
	ListOrderInputDTO,
	ListOrderOutputDTO,
	ResultOrderDTO,
} from "./ListOrderDTO";

export class ListOrderUseCase {
	static async execute(
		params: ListOrderInputDTO,
		OrderGateway: OrderGatewayInterface
	): Promise<ListOrderOutputDTO> {
		try {
			let result = null;
			if (params.id) {
				result = await OrderGateway.getOrders(Number(params.id));
			} else {
				result = await OrderGateway.getOrders();
			}

			const orders = result.map((result: any) => {
				return {
					...result,
					order_items: JSON.parse(result.order_items),
				};
			});

			let output: ListOrderOutputDTO = {
				hasError: false,
				result: [],
			};
			orders.forEach((element: any) => {
				const {
					id,
					order_date,
					order_total,
					customer_id,
					order_items,
				} = element;

				let order: ResultOrderDTO = {
					id,
					order_date,
					order_total,
					customer_id,
					order_items,
				};
				output.result?.push(order);
			});

			return output;
		} catch (error: any) {
			console.log("Error in query Database", error);
			const output = {
				hasError: true,
				message: error,
			};

			return output;
		}
	}
}
