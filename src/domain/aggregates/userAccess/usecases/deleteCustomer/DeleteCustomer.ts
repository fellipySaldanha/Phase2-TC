import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import ICustomerRepository from '../../core/ports/ICustomerRepository';
import {
  DeleteCustomerInputDTO,
  DeleteCustomerOutputDTO,
} from './DeleteCustomerDTO';

export default class DeleteCustomer implements UseCaseInterface {
  private readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(
    input: DeleteCustomerInputDTO,
  ): Promise<DeleteCustomerOutputDTO> {
    try {
      if (!input.id) {
        return {
          hasError: true,
          message: 'Missing parameters. Please provide id',
        };
      }
      const result = await this.repository.deleteCustomer(input.id);
      const output: DeleteCustomerOutputDTO = {
        hasError: false,
        message: result,
      };
      return output;
    } catch (error: any) {
      const output = {
        hasError: true,
        message: 'Failed to delete customer',
      };
      return output;
    }
  }
}
