import mysql, { OkPacket } from 'mysql';
import * as dotenv from 'dotenv';

// Interfaces
import { PaymentGatewayInterface } from '../interfaces/gateways/PaymentGatewayInterface';

export class MySQLPaymentRepository implements PaymentGatewayInterface {
  private connection: mysql.Connection;

  constructor() {
    dotenv.config();
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.connection.connect();
  }
  beginTransaction(): void {
    this.connection.beginTransaction();
  }
  commit(): void {
    this.connection.commit();
  }
  rollback(): void {
    this.connection.rollback();
  }

  async getPaymentStatus(orderId?: number): Promise<any> {
    const values = [orderId];
    let myQuery = `
    SELECT
        spe.status_payment AS status_payment,
        spe.id AS order_id
    FROM
        order_payment op
    JOIN
        status_payment_enum spe ON op.status_payment_enum_id = spe.id
    `;

    if (orderId) {
      myQuery =
        myQuery +
        `  WHERE
        op.order_id = ?;`;
    }

    return await this.commitDB(myQuery, values);
  }

  private async commitDB(query: string, values: any[]): Promise<OkPacket> {
    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }
}
