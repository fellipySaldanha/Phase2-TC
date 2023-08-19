import UseCaseInterface from "../../../../sharedKernel/usecase/UseCaseInterface";
import ICustomerRepository from "../../core/ports/ICustomerRepository";
import { UpdateCustomerInputDTO, UpdateCustomerOutputDTO } from "./UpdateCustomerDTO";

export default class UpdateCustomer implements UseCaseInterface{
    private readonly repository : ICustomerRepository;

    constructor(repository:ICustomerRepository){
        this.repository = repository;
    }
    
    async execute(input: UpdateCustomerInputDTO): Promise<UpdateCustomerOutputDTO> {
        try {
            let message;
            let hasError = false;
            if(!input.id){
                message = 'Missing parameters. Please provide id';
                hasError = true;
            } else {
                const result = await this.repository.updateCustomer(
                    input.id,
                    input.name,
                    input.email,
                    input.cpf,
                    input.isActive
                );
                message = result;
            }
            const output:UpdateCustomerOutputDTO = {
                hasError,
                message
            }
            return output;
        } catch (error:any) {
            const output = {
                hasError: true,
                message: 'Failed to update customer'
            }
            return output;
        }
    }
}