export interface UpdateProductInputDTO {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemType: number;
  itemDescription: string;
  itemImgUrl: string;
}
export interface UpdateProductOutputDTO {
  hasError: boolean;
  message?: string;
  array_errors?: string[];
}
