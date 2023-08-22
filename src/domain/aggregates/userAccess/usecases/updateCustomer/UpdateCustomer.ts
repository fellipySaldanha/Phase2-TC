import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import ICustomerRepository from '../../core/ports/ICustomerRepository';
import {
  UpdateCustomerInputDTO,
  UpdateCustomerOutputDTO,
} from './UpdateCustomerDTO';

export default class UpdateCustomer implements UseCaseInterface {
  private readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(
    input: UpdateCustomerInputDTO,
  ): Promise<UpdateCustomerOutputDTO> {
    try {
      const validateParams = this.validateMissingParams(input);
      const validateBody = this.validateBodyRequest(input);
      if (validateParams) {
        return validateParams;
      }
      if (validateBody) {
        return validateBody;
      }
      const result = await this.repository.updateCustomer(
        input.id,
        input.name,
        input.email,
        input.cpf,
        input.isActive,
      );
      const output: UpdateCustomerOutputDTO = {
        hasError: false,
        message: result,
      };
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
    input: UpdateCustomerInputDTO,
  ): UpdateCustomerOutputDTO | undefined {
    if (Object.keys(input).length === 1 && input['id']) {
      return {
        hasError: true,
        message: ['Missing body'],
      };
    }
  }

  private validateMissingParams(
    input: UpdateCustomerInputDTO,
  ): UpdateCustomerOutputDTO | undefined {
    if (!input.id) {
      return {
        hasError: true,
        message: ['Missing parameters. Please provide id'],
      };
    }
  }
}
