import { Request, Response } from "express";
import { OrderQueueController } from "../../domain/aggregates/order/controllers/OrderController";
import { ListOrderOutputDTO } from "../../domain/aggregates/order/usecases/listOrder/ListOrderDTO";

import HttpServer from "../../application/ports/HttpServer";
import { GetOrderQueueOutputDTO } from "../../domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueueDTO";


export default class OrderQueueRoute {
	private readonly httpServer: HttpServer;

	constructor(httpServer: HttpServer) {
		this.httpServer = httpServer;
		this.routes();
	}

	async routes() {
        this.getOrderQueue();
        this.moveNext();
    }

    getOrderQueue(){
        this.httpServer.register(
            'get',
            '/orderqueue',
            async (req: Request, resp: Response) => {
                try{
                    const output: GetOrderQueueOutputDTO = await OrderQueueController.getOrderQueue(req.query.id);
                    return resp.status(200).json(output.result);
                } catch (error){
                    return resp.status(400).json({ error });
                }
                
            },
        );
    }

    moveNext(){
        this.httpServer.register(
            'patch',
            '/orderqueue',
            async (req: Request, resp: Response) => {
                try{
                    if ( ! req.query.id ) {
                        return resp.status(400).json({ Error: 'Missing parameters. Please provide id' });
                    }
                    const output: GetOrderQueueOutputDTO = await OrderQueueController.moveNext(req.query.id);
                    return resp.status(200).json(output.result);
                } catch (error){
                    return resp.status(400).json({ error });
                }
            },
        );
    }
}
