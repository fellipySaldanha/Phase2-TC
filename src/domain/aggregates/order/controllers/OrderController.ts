// Gateways
import { MySQLOrderRepository } from '../gateways/OrderRepository';

// DTOS
import {
  ListOrderInputDTO,
  ListOrderOutputDTO,
} from '../usecases/listOrder/ListOrderDTO';
import { NewOrderInputDTO, NewOrderOutputDTO } from '../usecases/newOrder/NewOrderDTO';

// UseCases
import { ListOrderUseCase } from '../usecases/listOrder/ListOrder';
import { NewOrderUseCase } from '../usecases/newOrder/NewOrder';

// Entities
import { OrderEntity } from '../core/entities/OrderEntity';
import { MercadoPago } from '../../payment/services/MercadoPago';

export class OrderController {
  static async getOrders(searchId?: number): Promise<ListOrderOutputDTO> {
    const orderGateway = new MySQLOrderRepository();
    const input: ListOrderInputDTO = {
      id: searchId,
    };
    return await ListOrderUseCase.execute(input, orderGateway);
  }

  static async newOrder(body: NewOrderInputDTO): Promise<ListOrderOutputDTO | null> {
    const orderGateway = new MySQLOrderRepository();
    const paymentProvider = new MercadoPago();

    let output: NewOrderOutputDTO = await NewOrderUseCase.execute(body, orderGateway, paymentProvider);
    if (! output.hasError){
      const input: ListOrderInputDTO = {
        id: output.orderId
      };
      return await ListOrderUseCase.execute(input, orderGateway);
    } else {
      return output;
    }
  }
}
