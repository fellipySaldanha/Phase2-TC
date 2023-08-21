import { Request, Response } from 'express';
import CustomerController from '../../domain/aggregates/userAccess/controllers/CustomerController';
import { ListCustomerOutputDTO } from '../../domain/aggregates/userAccess/usecases/listCustomer/ListCustomerDTO';
import HttpServer from '../../application/ports/HttpServer';
import { CreateCustomerOutputDTO } from '../../domain/aggregates/userAccess/usecases/createCustomer/CreateCustomerDTO';
import { DeleteCustomerOutputDTO } from '../../domain/aggregates/userAccess/usecases/deleteCustomer/DeleteCustomerDTO';
import { UpdateCustomerOutputDTO } from '../../domain/aggregates/userAccess/usecases/updateCustomer/UpdateCustomerDTO';

export default class CustomerRoute {
  private readonly httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.routes();
  }

  async routes() {
    this.getCustomers();
    this.createCustomer();
    this.deleteCustomer();
    this.updateCustomer();
  }

  getCustomers() {
    this.httpServer.register(
      'get',
      '/customer',
      async (req: Request, resp: Response) => {
        try {
          const id = req.query.id ? Number(req.query.id) : undefined;
          const cpf = req.query.cpf ? String(req.query.cpf) : undefined;
          const output: ListCustomerOutputDTO =
            await CustomerController.getCustomers(id, cpf);
          if (output.hasError) {
            return resp.status(400).json(output);
          } else {
            return resp.status(200).json(output.result);
          }
        } catch (error) {
          return resp.status(500).json({
            hasError: true,
            message: 'Server error',
          });
        }
      },
    );
  }

  createCustomer() {
    this.httpServer.register(
      'post',
      '/customer',
      async (req: Request, resp: Response) => {
        try {
          const output: CreateCustomerOutputDTO =
            await CustomerController.createCustomer(req.body);
          if (output.hasError) {
            return resp.status(400).json(output);
          }
          return resp.status(200).json(output);
        } catch (error) {
          return resp.status(500).json({
            hasError: true,
            message: 'Server error',
          });
        }
      },
    );
  }

  updateCustomer() {
    this.httpServer.register(
      'patch',
      '/customer',
      async (req: Request, resp: Response) => {
        try {
          const output = await CustomerController.updateCustomer(
            req.body,
            Number(req.query.id),
          );
          if (output.hasError) {
            return resp.status(400).json(output);
          } else {
            return resp.status(200).json(output);
          }
        } catch (error) {
          return resp.status(500).json({
            hasError: true,
            message: 'Server error',
          });
        }
      },
    );
  }

  deleteCustomer() {
    this.httpServer.register(
      'delete',
      '/customer',
      async (req: Request, resp: Response) => {
        try {
          const output: DeleteCustomerOutputDTO =
            await CustomerController.deleteCustomer(Number(req.query.id));
          if (output.hasError) {
            return resp.status(400).json(output);
          } else {
            return resp.status(200).json(output);
          }
        } catch (error) {
          return resp.status(500).json({
            hasError: true,
            message: 'Server error',
          });
        }
      },
    );
  }
}
