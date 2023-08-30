import mysql, { OkPacket } from 'mysql';
import * as dotenv from 'dotenv';
import { OrderGatewayInterface } from '../interfaces/gateways/OrderGatewayInterface';
import MySqlOrderQueueRepository from '../../orderQueue/gateways/OrderQueueRepository';
import { IOrderItem } from '../interfaces/IOrderItem';

export class MySQLOrderRepository implements OrderGatewayInterface {
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

  async getOrders(orderId?: number): Promise<any> {
    const values = [orderId];
    var myQuery = `
            SELECT
                O.id, O.order_date, O.order_total, O.customer_id,
                CUS.customer_name,
                SQE.status_queue AS order_status,
                JSON_ARRAYAGG(
                  JSON_OBJECT(
                    'item', I.item_name,
                    'qty', OI.order_item_qtd,
                    'price', I.item_price
                  )
                ) AS order_items
            FROM orders O
            LEFT OUTER JOIN customers CUS ON O.customer_id = CUS.id
            LEFT OUTER JOIN order_queue OQ ON OQ.order_id = O.id
            LEFT OUTER JOIN status_queue_enum SQE ON SQE.id = OQ.status_queue_enum_id
            LEFT OUTER JOIN order_item OI ON OI.order_id = O.id 
            LEFT OUTER JOIN itens I ON I.id = OI.item_id`;
    if (orderId) {
      myQuery = myQuery + ` WHERE O.id = ?`;
    }
    myQuery =
      myQuery +
      ` 
            GROUP BY O.id, order_status`;

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

  async newOrder(customerId: number, total: number): Promise<number> {
    try {
      const insertQuery =
        'INSERT INTO orders (order_date, order_total, customer_id) VALUES (NOW(), ?, ?)';
      const values = [total, customerId];
      const result = await this.commitDB(insertQuery, values);

      return result.insertId;
    } catch (err) {
      const msg = "Error inserting a new Order";
      console.log(msg, err);
      throw new Error(msg);
    }
  }

  async insertOrderItems(orderItems: IOrderItem[]): Promise<void> {
    try {
      const insertItemsQuery =
        'INSERT INTO order_item (order_id, item_id, order_item_qtd) VALUES ?';
      const formattedItems = orderItems.map((item) => [
        item.order_id,
        item.item_id,
        item.order_item_qtd,
      ]);
      await this.commitDB(insertItemsQuery, [formattedItems]);
    } catch (err) {
      const msg = "Error inserting Order Items";
      console.log(msg, err);
      throw new Error(msg);
    }
  }

  async addOrderQueue(orderId: number): Promise<number | null> {
    try {
      let orderQueueRepository = new MySqlOrderQueueRepository(this.connection);
      await orderQueueRepository.add(orderId);
      const result = await orderQueueRepository.getOrderQueue(orderId);
      return Number(result);
    } catch (err) {
      const msg = "Error adding a new order into the order queue"
      console.log(msg, err);
      throw new Error(msg);
    }
  }

  async getItemPrices(items: number[]): Promise<any> {
    try {
      const query = 'SELECT id, item_price from itens WHERE id IN (?) ORDER BY ID';
      return await this.commitDB(query, [items]);
    } catch (err) {
      const msg = "Error getting Order Items prices";
      console.log(msg, err);
      throw new Error(msg);
    }
  }

}
