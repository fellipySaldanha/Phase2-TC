import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';

import MySqlProductRepository from './domain/aggregates/productMaintenance/gateways/MySqlProductRepository';
import MySQLCustomerRepository from './domain/aggregates/userAccess/gateways/MySQLCustomerRepository';
import MySqlOrderQueueRepository from './domain/aggregates/orderQueue/gateways/OrderQueueRepository';
import CustomerRoute from './infrastructure/api/customer.route';
import OrderRoute from './infrastructure/api/order.route';
import OrderQueueRoute from './infrastructure/api/orderqueue.route';
import ProductRoute from './infrastructure/api/product.route';
import { PaymentRoute } from './infrastructure/api/payment.route';
import { WebhookRoute } from './infrastructure/api/webhook.route';

dotenv.config();
const server = new ExpressAdapter();

const database = new MySQLCustomerRepository();
const database_product = new MySqlProductRepository();
const databaseOrderQueue = new MySqlOrderQueueRepository();

const customerRoute = new CustomerRoute(server);
const productRoute = new ProductRoute(server);
const orderRoute = new OrderRoute(server);
const orderQueueRoute = new OrderQueueRoute(server);
const paymentRoute = new PaymentRoute(server);
const webhookRoute = new WebhookRoute(server);

server.router(CustomerRoute);
server.router(OrderRoute);
server.router(OrderQueueRoute);
server.router(ProductRoute);
server.router(PaymentRoute);
server.router(WebhookRoute);

server.listen(3000);
