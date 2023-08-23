export interface CreateProductInputDTO {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemType: number;
  itemDescription: string;
  itemImgUrl: string;
}

export interface CreateProductOutputDTO {
  hasError: boolean;
  message?: string;
  result?: CreateProductInputDTO[];
  array_errors?: string[];
}
