import { Request, Response } from "express";
import CustomerController from "../../domain/aggregates/userAccess/application/CustomerController";
import { CustomerOutputDTO } from "../../domain/aggregates/userAccess/usecase/list-customer/ListCustomerDTO";
import HttpServer from "../../application/ports/HttpServer";

export default class CustomerRoute {
    private readonly httpServer : HttpServer;

    constructor(httpServer:HttpServer){
        this.httpServer = httpServer;
        this.routes();
    }

    async routes(){
        this.httpServer.register('get', '/customer', async (req: Request, resp: Response) => {
            const id = req.query.id ? Number(req.query.id) : undefined;
            const cpf = req.query.cpf ? String(req.query.cpf) : undefined;
            const output:CustomerOutputDTO = await CustomerController.getCustomers(id,cpf);
            if(output.hasError){
                return resp.status(400).json({Error:output.message});
            } else {
                return resp.status(200).json(output.result);
            }
        });
    }
}