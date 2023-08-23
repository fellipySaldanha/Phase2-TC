import HttpServer from '../../application/ports/HttpServer';
import { Request, Response } from 'express';
import { CreateProductOutputDTO } from '../../domain/aggregates/productMaintenance/useCases/create-product/CreateProductDTO';
import { UpdateProductOutputDTO } from '../../domain/aggregates/productMaintenance/useCases/update-product/UpdateProductDTO';
import ProductController from '../../domain/aggregates/productMaintenance/controllers/ProductController';
import { DeleteProductOutputDTO } from '../../domain/aggregates/productMaintenance/useCases/delete-product/DeleteProductDTO';
import { ListProductOutputDTO } from '../../domain/aggregates/productMaintenance/useCases/list-products/ListProductsDTO';

export default class ProductRoute {
  private readonly httpServer: HttpServer;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.routes();
  }

  async routes() {
    this.getProducts();
    this.getProductsByCategory();
    this.createProduct();
    this.deleteProduct();
    this.updateProduct();
  }
  createProduct() {
    this.httpServer.register(
      'post',
      '/product',
      async (req: Request, resp: Response) => {
        try {
          const output: CreateProductOutputDTO =
            await ProductController.createProduct(req.body);
          return resp.status(200).json(output);
        } catch (error) {
          return resp.status(400).json({ Error: error });
        }
      },
    );
  }
  updateProduct() {
    this.httpServer.register(
      'patch',
      '/product',
      async (req: Request, resp: Response) => {
        try {
          const output: UpdateProductOutputDTO =
            await ProductController.updateProduct(
              req.body,
              Number(req.query.id),
            );
          if (output.hasError) {
            return resp.status(400).json(output);
          } else {
            return resp.status(200).json(output);
          }
        } catch (error) {}
      },
    );
  }

  deleteProduct() {
    this.httpServer.register(
      'delete',
      '/product',
      async (req: Request, resp: Response) => {
        try {
          const output: DeleteProductOutputDTO =
            await ProductController.deleteProduct(Number(req.query.id));
          if (output.hasError) {
            return resp.status(400).json(output);
          } else {
            return resp.status(200).json(output);
          }
        } catch (error) {}
      },
    );
  }

  getProducts() {
    this.httpServer.register(
      'get',
      '/product',
      async (req: Request, resp: Response) => {
        const id = req.query.id ? Number(req.query.id) : 0;
        const output: ListProductOutputDTO =
          await ProductController.getProducts(id);
        if (output.hasError) {
          return resp.status(400).json(output);
        } else {
          return resp.status(200).json(output.result);
        }
      },
    );
  }

  getProductsByCategory() {
    this.httpServer.register(
      'get',
      '/product/findbycategory',
      async (req: Request, resp: Response) => {
        const id = req.query.category ? Number(req.query.category) : 0;
        const output: ListProductOutputDTO =
          await ProductController.getProductsByCategory(id);
        if (output.hasError) {
          return resp.status(400).json(output);
        } else {
          return resp.status(200).json(output.result);
        }
      },
    );
  }
}
