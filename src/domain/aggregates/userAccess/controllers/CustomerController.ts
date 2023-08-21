import ListCustomer from '../usecases/listCustomer/ListCustomer';
import MySQLCustomerRepository from '../gateways/MySQLCustomerRepository';
import {
  ListCustomerInputDTO,
  ListCustomerOutputDTO,
} from '../usecases/listCustomer/ListCustomerDTO';
import CreateCustomer from '../usecases/createCustomer/CreateCustomer';
import {
  CreateCustomerInputDTO,
  CreateCustomerOutputDTO,
} from '../usecases/createCustomer/CreateCustomerDTO';
import {
  DeleteCustomerInputDTO,
  DeleteCustomerOutputDTO,
} from '../usecases/deleteCustomer/DeleteCustomerDTO';
import DeleteCustomer from '../usecases/deleteCustomer/DeleteCustomer';
import UpdateCustomer from '../usecases/updateCustomer/UpdateCustomer';
import {
  UpdateCustomerInputDTO,
  UpdateCustomerOutputDTO,
} from '../usecases/updateCustomer/UpdateCustomerDTO';

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
