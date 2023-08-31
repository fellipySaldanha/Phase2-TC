import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import IProductRepository from '../../core/ports/IProductRepository';
import { ListProductOutputDTO, QueryParamsDTO } from './ListProductsDTO';

export default class ListProduct implements UseCaseInterface {
  private readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(input: QueryParamsDTO): Promise<ListProductOutputDTO> {
    let result;
    try {
      if (input.itemId && input.itemId != 0) {
        result = await this.repository.getProductById(Number(input.itemId));
      } else {
        result = await this.repository.getProducts();
      }

      let output: ListProductOutputDTO = {
        hasError: false,
        message: 'Search finished successfully',
        result: result,
      };
      return output;
    } catch {
      const output: ListProductOutputDTO = {
        hasError: true,
        message: 'Failed to search product',
      };
      return output;
    }
  }
}
