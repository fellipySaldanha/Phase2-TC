// DTOs
import {
  GetPaymentStatusInputDTO,
  GetPaymentStatusOutputDTO,
} from '../usecases/getPaymentStatus/GetPaymentStatusDTO';

// UseCases
import { GetPaymentStatusUseCase } from '../usecases/getPaymentStatus/GetPaymentStatus';
import { MySQLPaymentRepository } from '../gateways/PaymentRepository';

export class OrderPaymentController {
  static async getPaymentOrder(
    searchId?: number,
  ): Promise<GetPaymentStatusOutputDTO> {
    const paymentGateway = new MySQLPaymentRepository();
    const input: GetPaymentStatusInputDTO = {
      id: searchId,
    };

    return await GetPaymentStatusUseCase.execute(input, paymentGateway);
  }
}
