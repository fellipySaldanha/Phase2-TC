import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import ICustomerRepository from '../../core/ports/ICustomerRepository';
import {
  ListCustomerInputDTO,
  ListCustomerOutputDTO,
  customerInfo,
} from './ListCustomerDTO';

export default class ListCustomer implements UseCaseInterface {
  private readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(input: ListCustomerInputDTO): Promise<ListCustomerOutputDTO> {
    try {
      let result;
      if (input.params.id) {
        result = await this.repository.getCustomerById(Number(input.params.id));
      } else if (input.params.cpf) {
        result = await this.repository.getCustomerByCPF(
          Number(input.params.cpf),
        );
      } else {
        result = await this.repository.getCustomers();
      }
      const output: ListCustomerOutputDTO = this.transformToOutput(result);
      return output;
    } catch (error: any) {
      const output = {
        hasError: true,
        message: 'Failed to get customers informations',
      };
      return output;
    }
  }

  private transformToOutput(result: any): ListCustomerOutputDTO {
    let output: ListCustomerOutputDTO = {
      hasError: false,
      result: [],
    };
    result.forEach((element: any) => {
      let client: customerInfo = {
        id: element.id,
        cpf: element.cpf.value,
        name: element.name,
        email: element.email.value,
        isActive: element.isActive,
      };
      output.result?.push(client);
    });
    return output;
  }
}
