import ExpressAdapter from "./application/adapters/ExpressAdapter";
import * as dotenv from "dotenv";

import ProductController from "./domain/aggregates/productMaintenance/application/ProductController";
import MySqlProductRepository from "./domain/aggregates/productMaintenance/infrastructure/MySqlProductRepository";
import MySQLCustomerRepository from "./domain/aggregates/userAccess/infrastructure/MySQLCustomerRepository";
import OrderQueueController from "./domain/aggregates/orderQueue/application/OrderQueueController";
import MySqlOrderQueueRepository from "./domain/aggregates/orderQueue/infrastructure/MySqlOrderQueueRepository";
import MercadoPago from "./domain/aggregates/payment/entities/MercadoPago";
import PaymentService from "./domain/aggregates/payment/services/PaymentService";
import CustomerRoute from "./infrastructure/api/customer.route";
import OrderRoute from "./infrastructure/api/order.route";

dotenv.config();

const server = new ExpressAdapter();

const database = new MySQLCustomerRepository();
const database_product = new MySqlProductRepository();
const databaseOrderQueue = new MySqlOrderQueueRepository();
const orderService = new PaymentService(new MercadoPago());

const customerRoute = new CustomerRoute(server);
const productController = new ProductController(server, database_product);
const orderRoute = new OrderRoute(server);
const orderQueueController = new OrderQueueController(
	server,
	databaseOrderQueue
);

server.router(CustomerRoute);
server.router(ProductController);
server.router(OrderQueueController);

server.listen(3000);
