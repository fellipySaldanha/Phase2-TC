import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';

import ProductController from './domain/aggregates/productMaintenance/application/ProductController';
import MySqlProductRepository from './domain/aggregates/productMaintenance/infrastructure/MySqlProductRepository';
import MySQLCustomerRepository from './domain/aggregates/userAccess/gateways/MySQLCustomerRepository';
import OrderQueueController from './domain/aggregates/orderQueue/controllers/OrderQueueController';
import MySqlOrderQueueRepository from './domain/aggregates/orderQueue/gateways/OrderQueueRepository';
import CustomerRoute from './infrastructure/api/customer.route';
import OrderRoute from './infrastructure/api/order.route';
import OrderQueueRoute from './infrastructure/api/orderqueue.route';

dotenv.config();

const server = new ExpressAdapter();

const database = new MySQLCustomerRepository();
const database_product = new MySqlProductRepository();
const databaseOrderQueue = new MySqlOrderQueueRepository();

const customerRoute = new CustomerRoute(server);
const productController = new ProductController(server, database_product);
const orderRoute = new OrderRoute(server);
const orderQueueRoute = new OrderQueueRoute(server);

server.router(CustomerRoute);
server.router(ProductController);
server.router(OrderRoute);
server.router(OrderQueueRoute);

server.listen(3000);
