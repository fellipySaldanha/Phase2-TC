export interface ListProductInputDTO {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemType: number;
  itemDescription: string;
  itemImgUrl: string;
}

export interface ListProductOutputDTO {
  hasError: boolean;
  message?: string;
  result?: ListProductInputDTO[];
}

export interface QueryParamsDTO {
  itemId: number;
}
