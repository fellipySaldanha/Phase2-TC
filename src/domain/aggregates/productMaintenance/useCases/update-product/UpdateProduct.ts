import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import IProductRepository from '../../core/ports/IProductRepository';
import {
  UpdateProductInputDTO,
  UpdateProductOutputDTO,
} from './UpdateProductDTO';

export default class UpdateProduct implements UseCaseInterface {
  private readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO> {
    try {
      const errors: string[] = this.validateRequest(input);
      if (errors?.length > 0) {
        return {
          hasError: true,
          message: JSON.stringify(errors),
        };
      }

      const result = await this.repository.updateProduct(
        input.itemId,
        input.itemName,
        input.itemPrice,
        input.itemType,
        input.itemDescription,
        input.itemImgUrl,
      );
      let output: UpdateProductOutputDTO = {
        hasError: false,
        message: 'Product changed successfully',
      };

      return output;
    } catch (error: any) {
      const output: UpdateProductOutputDTO = {
        hasError: true,
        message: 'Failed to update product',
        array_errors: error,
      };
      return output;
    }
  }

  private validateRequest(input: UpdateProductInputDTO): string[] {
    let errors: string[] = [];
    if (Object.keys(input).length === 0) {
      errors.push('Missing body.');
      return errors;
    }
    if (!input.itemId) {
      errors.push('Missing value: itemId.');
    }

    return errors;
  }
}
