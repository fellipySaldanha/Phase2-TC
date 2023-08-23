import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';

import MySqlProductRepository from './domain/aggregates/productMaintenance/gateways/MySqlProductRepository';
import MySQLCustomerRepository from './domain/aggregates/userAccess/gateways/MySQLCustomerRepository';
import OrderQueueController from './domain/aggregates/orderQueue/application/OrderQueueController';
import MySqlOrderQueueRepository from './domain/aggregates/orderQueue/infrastructure/MySqlOrderQueueRepository';
import CustomerRoute from './infrastructure/api/customer.route';
import OrderRoute from './infrastructure/api/order.route';
import ProductRoute from './infrastructure/api/product.route';
import { PaymentRoute } from './infrastructure/api/payment.route';

dotenv.config();

const server = new ExpressAdapter();

const database = new MySQLCustomerRepository();
const database_product = new MySqlProductRepository();
const databaseOrderQueue = new MySqlOrderQueueRepository();

const customerRoute = new CustomerRoute(server);
const productRoute = new ProductRoute(server);
const orderRoute = new OrderRoute(server);
const orderQueueController = new OrderQueueController(
  server,
  databaseOrderQueue,
);
const paymentRoute = new PaymentRoute(server);

server.router(CustomerRoute);
server.router(ProductRoute);
server.router(OrderQueueController);
server.router(PaymentRoute);

server.listen(3000);
