import UseCaseInterface from "../../../../sharedKernel/usecase/UseCaseInterface";
import ICustomerRepository from "../../core/ports/ICustomerRepository";
import { CustomerOutputDTO, resultClientDto } from "./ListCustomerDTO";

export default class ListCustomer implements UseCaseInterface{
    private readonly repository : ICustomerRepository;

    constructor(repository:ICustomerRepository){
        this.repository = repository;
    }

    async execute(input?: any): Promise<CustomerOutputDTO> {
        try {
            let result;
            if(input.params.id){
                result = await this.repository.getCustomerById(Number(input.params.id));
            }
            else if(input.params.cpf){
                result = await this.repository.getCustomerByCPF(Number(input.params.cpf));
            } else {
                result = await this.repository.getCustomers();
            }
            let output:CustomerOutputDTO = this.transformToOutput(result);
            return output;           
        } catch (error:any) {
            console.log('Error in query Database', error);
            const output = {
                hasError: true,
                message: error
            }
            return output;
        }
    }

    private transformToOutput(result:any): CustomerOutputDTO{
        let output:CustomerOutputDTO = {
            hasError: false,
            result: []
        }
        result.forEach((element:any) => {
            let client : resultClientDto = {
                id: element.id,
                cpf: element.customer_cpf,
                name: element.customer_name,
                email: element.customer_email,
                isActive: element.is_active,
            }
            output.result?.push(client);
        });
        return output;
    }
    
}