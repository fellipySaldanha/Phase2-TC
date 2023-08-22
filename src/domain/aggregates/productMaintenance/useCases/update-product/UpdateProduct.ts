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
      const errors: string[] = this.validateFields(input);
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
    } catch {
      const output: UpdateProductOutputDTO = {
        hasError: true,
        message: 'Failed to update product',
      };
      return output;
    }
  }

  private validateFields(input: UpdateProductInputDTO): string[] {
    let errors: string[] = [];
    if (Object.keys(input).length === 0) {
      errors.push('Missing body.');
      return errors;
    } else if (!input.itemId) {
      errors.push('Missing value: itemId.');
    } else if (!input.itemName) {
      errors.push('Missing value: itemName.');
    } else if (!input.itemPrice) {
      errors.push('Missing value: itemPrice.');
    } else if (!input.itemType) {
      errors.push('Missing value: itemType.');
    }

    return errors;
  }
}
