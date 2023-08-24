import { PaymentGatewayInterface } from '../../interfaces/gateways/PaymentGatewayInterface';
import {
  GetPaymentStatusInputDTO,
  GetPaymentStatusOutputDTO,
} from './GetPaymentStatusDTO';

export class GetPaymentStatusUseCase {
  static async execute(
    params: GetPaymentStatusInputDTO,
    PaymentGateway: PaymentGatewayInterface,
  ): Promise<GetPaymentStatusOutputDTO> {
    try {
      const status = await PaymentGateway.getPaymentStatus(params.id);
      const output: GetPaymentStatusOutputDTO = {
        hasError: false,
        result: status,
      };

      return output;
    } catch (error: any) {
      console.log('Error in query Database', error);
      const output = {
        hasError: true,
        message: error,
      };

      return output;
    }
  }
}
