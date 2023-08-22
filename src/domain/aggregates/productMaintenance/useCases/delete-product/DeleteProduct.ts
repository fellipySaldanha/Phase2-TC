import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import IProductRepository from '../../core/ports/IProductRepository';
import {
  DeleteProductInputDTO,
  DeleteProductOutputDTO,
} from './DeleteProductDTO';

export default class DeleteProduct implements UseCaseInterface {
  private readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(input: DeleteProductInputDTO): Promise<DeleteProductOutputDTO> {
    try {
      if (!input.itemId) {
        return {
          hasError: true,
          message: JSON.stringify('Missing ItemId...'),
        };
      }

      const result = await this.repository.deleteProduct(input.itemId);
      let output: DeleteProductOutputDTO = {
        hasError: false,
        message: 'Product deleted successfully',
      };

      return output;
    } catch (error: any) {
      const output: DeleteProductOutputDTO = {
        hasError: true,
        message: 'Failed to delete product',
      };
      return output;
    }
  }
}
