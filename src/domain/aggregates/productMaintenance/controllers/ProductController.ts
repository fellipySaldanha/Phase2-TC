import MySqlProductRepository from '../gateways/MySqlProductRepository';
import CreateProduct from '../useCases/create-product/CreateProduct';
import {
  CreateProductInputDTO,
  CreateProductOutputDTO,
} from '../useCases/create-product/CreateProductDTO';
import DeleteProduct from '../useCases/delete-product/DeleteProduct';
import {
  DeleteProductInputDTO,
  DeleteProductOutputDTO,
} from '../useCases/delete-product/DeleteProductDTO';
import ListProduct from '../useCases/list-products/ListProducts';
import {
  ListProductOutputDTO,
  QueryParamsDTO,
} from '../useCases/list-products/ListProductsDTO';
import UpdateProduct from '../useCases/update-product/UpdateProduct';
import {
  UpdateProductInputDTO,
  UpdateProductOutputDTO,
} from '../useCases/update-product/UpdateProductDTO';
import ListProductByCategory from '../useCases/list-product-category/ListProductByCategory';
import {
  ListProdCategoryOutputDTO,
  QueryParamsCategoryDTO,
} from '../useCases/list-product-category/ListProductByCategoryDTO';

export default class ProductController {
  static async createProduct(body: string): Promise<any> {
    const createUseCase: CreateProduct = new CreateProduct(
      new MySqlProductRepository(),
    );
    const input: CreateProductInputDTO =
      body as unknown as CreateProductInputDTO;
    const output: CreateProductOutputDTO = await createUseCase.execute(input);
    return output;
  }

  static async updateProduct(
    body: string,
    id: number,
  ): Promise<UpdateProductOutputDTO> {
    const updateUseCase = new UpdateProduct(new MySqlProductRepository());
    let input: UpdateProductInputDTO = body as unknown as UpdateProductInputDTO;
    input.itemId = id;
    const output: UpdateProductOutputDTO = await updateUseCase.execute(input);
    return output;
  }

  static async deleteProduct(id: number): Promise<UpdateProductOutputDTO> {
    const updateUseCase = new DeleteProduct(new MySqlProductRepository());
    let input: DeleteProductInputDTO = { itemId: id };
    const output: DeleteProductOutputDTO = await updateUseCase.execute(input);
    return output;
  }

  static async getProducts(IdItem: number): Promise<any> {
    const listUseCase: ListProduct = new ListProduct(
      new MySqlProductRepository(),
    );
    let input: QueryParamsDTO = {
      itemId: IdItem,
    };
    const output: ListProductOutputDTO = await listUseCase.execute(input);
    return output;
  }

  static async getProductsByCategory(categoryId: number): Promise<any> {
    const listUseCase: ListProductByCategory = new ListProductByCategory(
      new MySqlProductRepository(),
    );
    let input: QueryParamsCategoryDTO = {
      itemType: categoryId,
    };
    const output: ListProdCategoryOutputDTO = await listUseCase.execute(input);
    return output;
  }
}
