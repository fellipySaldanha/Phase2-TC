import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import IProductRepository from '../../core/ports/IProductRepository';
import {
  CreateProductInputDTO,
  CreateProductOutputDTO,
} from './CreateProductDTO';

export default class CreateProduct implements UseCaseInterface {
  private readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(input: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    try {
      const errors: string[] = this.validateFields(input);
      if (errors?.length > 0) {
        return {
          hasError: true,
          message: JSON.stringify(errors),
        };
      }

      const result = await this.repository.createProduct(
        input.itemType,
        input.itemName,
        input.itemPrice,
        input.itemDescription,
        input.itemImgUrl,
      );
      let output: CreateProductOutputDTO = {
        hasError: false,
        message: 'Product created successfully',
        result: result,
      };

      return output;
    } catch (error: any) {
      const output: CreateProductOutputDTO = {
        hasError: true,
        message: 'Failed to create product',
      };
      return output;
    }
  }

  private validateFields(input: CreateProductInputDTO): string[] {
    let errors: string[] = [];
    if (Object.keys(input).length === 0) {
      //return response.status(400).json({ error: 'Missing body.' });
      errors.push('Missing body.');
      return errors;
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
