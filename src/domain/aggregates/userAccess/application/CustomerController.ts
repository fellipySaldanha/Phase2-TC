import ListCustomer from '../usecase/list-customer/ListCustomer';
import MySQLCustomerRepository from '../infrastructure/MySQLCustomerRepository';
import {
  ListCustomerInputDTO,
  ListCustomerOutputDTO,
} from '../usecase/list-customer/ListCustomerDTO';
import CreateCustomer from '../usecase/create-customer/CreateCustomer';
import {
  CreateCustomerInputDTO,
  CreateCustomerOutputDTO,
} from '../usecase/create-customer/CreateCustomerDTO';
import {
  DeleteCustomerInputDTO,
  DeleteCustomerOutputDTO,
} from '../usecase/delete-customer/DeleteCustomerDTO';
import DeleteCustomer from '../usecase/delete-customer/DeleteCustomer';
import UpdateCustomer from '../usecase/update-customer/UpdateCustomer';
import {
  UpdateCustomerInputDTO,
  UpdateCustomerOutputDTO,
} from '../usecase/update-customer/UpdateCustomerDTO';

export default class CustomerController {
  static async getCustomers(
    searchId?: number,
    searchCPF?: string,
  ): Promise<any> {
    const listUseCase: ListCustomer = new ListCustomer(
      new MySQLCustomerRepository(),
    );
    const input: ListCustomerInputDTO = {
      params: {
        id: searchId,
        cpf: searchCPF,
      },
    };
    const output: ListCustomerOutputDTO = await listUseCase.execute(input);
    return output;
  }

  static async createCustomer(body: string): Promise<any> {
    const createUseCase: CreateCustomer = new CreateCustomer(
      new MySQLCustomerRepository(),
    );
    const input: CreateCustomerInputDTO =
      body as unknown as CreateCustomerInputDTO;
    const output: CreateCustomerOutputDTO = await createUseCase.execute(input);
    return output;
  }

  static async updateCustomer(
    body: string,
    id: number,
  ): Promise<UpdateCustomerOutputDTO> {
    const updateUseCase = new UpdateCustomer(new MySQLCustomerRepository());
    let input: UpdateCustomerInputDTO =
      body as unknown as UpdateCustomerInputDTO;
    input.id = id;
    const output: UpdateCustomerOutputDTO = await updateUseCase.execute(input);
    return output;
  }

  static async deleteCustomer(id: number): Promise<any> {
    const deleteUseCase = new DeleteCustomer(new MySQLCustomerRepository());
    const input: DeleteCustomerInputDTO = { id };
    const output: DeleteCustomerOutputDTO = await deleteUseCase.execute(input);
    return output;
  }
}
