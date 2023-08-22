// Gateways
import { MySQLOrderRepository } from '../gateways/OrderRepository';

// DTOS
import {
  ListOrderInputDTO,
  ListOrderOutputDTO,
} from '../usecases/listOrder/ListOrderDTO';
import { NewOrderInputDTO } from '../usecases/newOrder/NewOrderDTO';

// UseCases
import { ListOrderUseCase } from '../usecases/listOrder/ListOrder';
import { NewOrderUseCase } from '../usecases/newOrder/NewOrder';

// Entities
import { OrderEntity } from '../core/entities/OrderEntity';
import { PaymentRepository } from '../../payment/gateways/PaymentRepository';
import { MercadoPago } from '../../payment/services/MercadoPago';

export class OrderController {
  static async getOrders(searchId?: number): Promise<ListOrderOutputDTO> {
    const orderGateway = new MySQLOrderRepository();
    const input: ListOrderInputDTO = {
      id: searchId,
    };
    return await ListOrderUseCase.execute(input, orderGateway);
  }

  static async newOrder(body: NewOrderInputDTO): Promise<OrderEntity | null> {
    const orderGateway = new MySQLOrderRepository();
    const paymentGateway = new PaymentRepository();
    return await NewOrderUseCase.execute(body, orderGateway, paymentGateway);
  }
}
