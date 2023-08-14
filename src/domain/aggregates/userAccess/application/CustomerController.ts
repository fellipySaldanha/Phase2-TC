import { Request, Response } from "express";
import HttpServer from "../../../../application/ports/HttpServer";
import ICustomerRepository from "../core/ports/ICustomerRepository";
import { ParsedQs } from "qs";
import CustomerDTO from "../dto/CustomerDTO";
import Email from '../../../sharedKernel/valueObjects/Email';
import CPF from '../../../sharedKernel/valueObjects/CPF';
import ListCustomer from "../usecase/list-customer/ListCustomer";
import MySQLCustomerRepository from "../infrastructure/MySQLCustomerRepository";
import { CustomerInputDTO, CustomerOutputDTO } from "../usecase/list-customer/ListCustomerDTO";

export default class CustomerController{

    static async getCustomers(searchId?:number, searchCPF?:string): Promise<any>{
            const listCustomer:ListCustomer = new ListCustomer(new MySQLCustomerRepository());
                const input: CustomerInputDTO = {
                params:{
                    id:searchId,
                    cpf:searchCPF
                }
            }
            const output: CustomerOutputDTO = await listCustomer.execute(input);
            return output;
    }

    // async createCustomer(body:string, response: Response): Promise<any>{
    //     try {
    //         const parsedJson: CustomerDTO = body as unknown as CustomerDTO;
    //         const cpf = new CPF(parsedJson.cpf);
    //         const email = new Email(parsedJson.email);
    //         const result = await this.repository.createCustomer(
    //             parsedJson.name,
    //             email.getEmail(),
    //             cpf.getCPF(),
    //             parsedJson.isActive
    //         );
    //         return response.status(200).json(result);;
    //     } catch (error:any) {
    //         console.log('Error create customer',error);
    //         return response.status(400).json({Error:error.message});
    //     }
    // }

    // async updateCustomer(queryParams: ParsedQs, body:string, response:Response): Promise<any>{
    //     try {
    //         const parsedJson: CustomerDTO = body as unknown as CustomerDTO;
    //         const cpf = new CPF(parsedJson.cpf);
    //         const email = new Email(parsedJson.email);
    //         if(!queryParams.id){
    //             return response.status(400).json({ Error: 'Missing parameters. Please provide id' });
    //         }
    //         const result = await this.repository.updateCustomer(
    //             Number(queryParams.id),
    //             parsedJson.name,
    //             email.getEmail(),
    //             cpf.getCPF(),
    //             parsedJson.isActive
    //         );
    //         return response.status(200).json(result);
    //     } catch (error:any) {
    //         console.log('Error update customer',error);
    //         return response.status(400).json({Error:error.message});
    //     }
    // }

    // async deleteCustomer(queryParams: ParsedQs, response:Response): Promise<any>{
    //     if(!queryParams.id){
    //         return response.status(400).json({ Error: 'Missing parameters. Please provide id' });
    //     }
    //     try {
    //         const result = await this.repository.deleteCustomer(Number(queryParams.id));
    //         if(result?.affectedRows > 0){
    //             response.status(200).json({Success:`Row with Id ${queryParams.id} deleted`});
    //         } else {
    //             response.status(200).json({Success:'No rows were deleted.'});
    //         }
    //     } catch (error:any) {
    //         console.log('Error delete customer',error);
    //         return response.status(400).json({ Error: error.message });
    //     }
    // }
}