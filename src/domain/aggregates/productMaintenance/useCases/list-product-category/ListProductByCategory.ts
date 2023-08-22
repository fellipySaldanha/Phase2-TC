import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import IProductRepository from '../../core/ports/IProductRepository';
import {
  ListProdCategoryOutputDTO,
  QueryParamsCategoryDTO,
} from './ListProductByCategoryDTO';

export default class ListProductByCategory implements UseCaseInterface {
  private readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(
    input: QueryParamsCategoryDTO,
  ): Promise<ListProdCategoryOutputDTO> {
    let result;
    try {
      if (input.itemType && input.itemType != 0) {
        result = await this.repository.getProductByCategory(
          Number(input.itemType),
        );
      } else {
        result = await this.repository.getProducts();
      }

      let output: ListProdCategoryOutputDTO = {
        hasError: false,
        message: 'Search finished successfully',
        result: result,
      };
      return output;
    } catch {
      const output: ListProdCategoryOutputDTO = {
        hasError: true,
        message: 'Failed to search product',
      };
      return output;
    }
  }
}
