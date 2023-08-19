import UseCaseInterface from "../../../../sharedKernel/usecase/UseCaseInterface";
import CPF from "../../../../sharedKernel/valueObjects/CPF";
import Email from "../../../../sharedKernel/valueObjects/Email";
import ICustomerRepository from "../../core/ports/ICustomerRepository";
import { CreateCustomerInputDTO, CreateCustomerOutputDTO, customerInfo } from './CreateCustomerDTO';

export default class CreateCustomer implements UseCaseInterface{
    private readonly repository : ICustomerRepository;

    constructor(repository:ICustomerRepository){
        this.repository = repository;
    }
    
    async execute(input: CreateCustomerInputDTO): Promise<CreateCustomerOutputDTO> {
        try {
            const errors:string[] = this.validateBodyRequest(input);
            if(errors?.length > 0){
                return {
                    hasError:true,
                    message:JSON.stringify(errors)
                }
            }
            console.log('@@@INPUT',input);
            const cpfVO = new CPF(input.cpf);
            const emailVO = new Email(input.email);
            const result = await this.repository.createCustomer(
                input.name,
                emailVO.value,
                cpfVO.value,
                input.isActive
            );
            const output:CreateCustomerOutputDTO = this.transformToOutput(result);
            return output; 
        } catch (error:any) {
            const output:CreateCustomerOutputDTO = {
                hasError: true,
                message: 'Failed to create customer'
            }
            return output;
        }
    }

    private transformToOutput(result:any):CreateCustomerOutputDTO {
        let output:CreateCustomerOutputDTO = {
            hasError: false,
            result: []
        }
        result.forEach((element:any) => {
            let client : customerInfo = {
                id: element.id,
                cpf: element.cpf.value,
                name: element.name,
                email: element.email.value,
                isActive: element.isActive,
            }
            output.result?.push(client);
        });
        return output;
    }

    private validateBodyRequest(input:CreateCustomerInputDTO):string[]{
        let errors:string[] = [];
        if(Object.keys(input).length === 0){
            errors.push('Missing body');
            return errors;
        }
        if(!input.cpf){
            errors.push('CPF is required');
        }
        if(!input.email){
            errors.push('Email is required');
        }
        if(!input.name){
            errors.push('Name is required')
        }
        return errors;
    }
}