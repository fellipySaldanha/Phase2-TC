import mysql, { OkPacket } from 'mysql';
import * as dotenv from 'dotenv';

// Interfaces
import { PaymentGatewayInterface } from '../interfaces/gateways/PaymentGatewayInterface';
import { OrderPaymentEntity } from '../core/entities/OrderPaymentEntity';

export class MySQLPaymentRepository implements PaymentGatewayInterface {
  private connection: mysql.Connection;

  constructor() {
    dotenv.config();
    console.log('Start of PaymentRepository constructor');
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
        order_id,
        status_payment,
        last_update
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

  async createPayment(
    orderId: number,
    paymentMethod: number,
  ): Promise<OrderPaymentEntity> {
    let payment: OrderPaymentEntity = OrderPaymentEntity.buildPayment(
      orderId,
      paymentMethod,
    );
    const values = [
      payment.order_id,
      payment.payment_method,
      payment.last_update,
      payment.status,
    ];
    const insertQuery =
      'INSERT INTO order_payment (order_id, payment_method_enum_id, last_update, status_payment_enum_id) VALUES (?, ?, ?, ?)';
    //status_payment_enum_id
    const result: any = await this.commitDB(insertQuery, values);
    if (Object.keys(result).length !== 0) {
      payment.payment_id = result.insertId;
    }
    return payment;
  }

  async confirmPayment(orderId: number, paymentStatus: number) {
    const values = [1, new Date(), 1];
    const query =
      'UPDATE order_payment SET status_payment_enum_id=?, last_update=? WHERE id=?';
    const result = await this.commitDB(query, values);
    return result;
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
