import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import { PaymentGatewayInterface } from '../../interfaces/gateways/PaymentGatewayInterface';
import {
  PaymentConfirmationInputDTO,
  PaymentConfirmationOutputDTO,
} from './PaymentConfirmationDTO';

export class PaymentConfirmation implements UseCaseInterface {
  private readonly paymentGateway: PaymentGatewayInterface;
  constructor(private _paymentGateway: PaymentGatewayInterface) {
    this.paymentGateway = _paymentGateway;
  }

  async execute(
    input: PaymentConfirmationInputDTO,
  ): Promise<PaymentConfirmationOutputDTO> {
    try {
      const validateBody = this.validateBodyRequest(input);
      if (validateBody) {
        return validateBody;
      }
      const result = await this.paymentGateway.confirmPayment(
        input.orderId,
        input.paymentStatus,
      );
      const output: PaymentConfirmationOutputDTO = {
        hasError: false,
        message: 'Payment successfully updated',
      };
      console.log(output);
      return output;
    } catch (error: any) {
      const output = {
        hasError: true,
        message: error.hasOwnProperty('sqlMessage')
          ? [error.sqlMessage]
          : error,
      };
      return output;
    }
  }
  private validateBodyRequest(
    input: PaymentConfirmationInputDTO,
  ): PaymentConfirmationOutputDTO | undefined {
    if (Object.keys(input).length === 1 && input['orderId']) {
      return {
        hasError: true,
        message: 'Missing body',
      };
    }
  }
}
