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
      const errors: string[] = this.validateRequest(input);
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
        array_errors: error,
      };
      return output;
    }
  }

  private validateRequest(input: CreateProductInputDTO): string[] {
    let errors: string[] = [];
    if (Object.keys(input).length === 0) {
      //return response.status(400).json({ error: 'Missing body.' });
      errors.push('Missing body.');
      return errors;
    }

    return errors;
  }
}
