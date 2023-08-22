import mysql from 'mysql';
import ICustomerRepository from '../core/ports/ICustomerRepository';
import Customer from '../core/entities/Customer';
import Email from '../../../sharedKernel/valueObjects/Email';
import CPF from '../../../sharedKernel/valueObjects/CPF';

export default class MySQLCustomerRepository implements ICustomerRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.connection.connect();
  }

  async createCustomer(
    name: string,
    email: string,
    cpf: string,
    active: boolean,
  ): Promise<Customer[]> {
    let customers: Customer[] = [];
    let customer: Customer = new Customer(
      name,
      new Email(email),
      new CPF(cpf),
      active,
    );
    const insertQuery =
      'INSERT INTO customers (customer_name, customer_email, customer_cpf, is_active) VALUES (?, ?, ?, ?)';
    const values = [name, email, cpf, active];
    const result: any = await this.commitDB(insertQuery, values);
    if (Object.keys(result).length !== 0) {
      customer.id = result.insertId;
      customers.push(customer);
    }
    return customers;
  }

  async getCustomers(): Promise<Customer[]> {
    const result: Customer[] = await new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM customers', (error, results) => {
        if (error) {
          reject(error);
        }
        let customers: Customer[] = [];
        results.forEach((element: any) => {
          let customer: Customer = new Customer(
            element.customer_name,
            new Email(element.customer_email),
            new CPF(element.customer_cpf),
            element.is_active,
            element.id,
          );
          customers.push(customer);
        });
        resolve(customers);
      });
    });
    return result;
  }

  async getCustomerById(id: number): Promise<Customer[]> {
    const selectQuery = `SELECT * FROM customers WHERE id = ?`;
    const values = [id];
    let result: any = await this.commitDB(selectQuery, values);
    let customers: Customer[] = [];
    if (Object.keys(result).length !== 0) {
      let customer: Customer = new Customer(
        result[0].customer_name,
        new Email(result[0].customer_email),
        new CPF(result[0].customer_cpf),
        result[0].is_active,
        result[0].id,
      );
      customers.push(customer);
    }
    return customers;
  }

  async getCustomerByCPF(cpf: number): Promise<Customer[]> {
    const selectQuery = `SELECT * FROM customers WHERE customer_cpf = ?`;
    const values = [cpf];
    let result: any = await this.commitDB(selectQuery, values);
    let customers: Customer[] = [];
    const customer: Customer = new Customer(
      result[0].customer_name,
      new Email(result[0].customer_email),
      new CPF(result[0].customer_cpf),
      result[0].is_active,
      result[0].id,
    );
    customers.push(customer);
    return customers;
  }

  async updateCustomer(
    id: number,
    name: string,
    email: string,
    cpf: string,
    active: boolean,
  ): Promise<any> {
    const updateQuery = `
                UPDATE customers
                SET customer_name = ?, customer_email = ?, customer_cpf = ?, is_active = ?
                WHERE id = ?
            `;
    const values = [name, email, cpf, active, id];
    const customer: Customer = new Customer(
      name,
      new Email(email),
      new CPF(cpf),
      active,
      id,
    );
    const result: any = await this.commitDB(updateQuery, values);
    if (result?.affectedRows > 0 && customer) {
      return `Row with Id ${id} updated`;
    } else {
      return 'No rows were updated.';
    }
  }

  async deleteCustomer(id: number): Promise<string> {
    const deleteQuery = 'DELETE FROM customers WHERE id = ?';
    const values = [id];
    const result: any = await this.commitDB(deleteQuery, values);
    if (result?.affectedRows > 0) {
      return `Row with Id ${id} deleted`;
    } else {
      return 'No rows were deleted.';
    }
  }

  private async commitDB(query: string, values: any[], id?: number) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        }
        if (id) {
          results = this.getCustomerById(id);
        }
        resolve(results);
      });
    });
  }
}
