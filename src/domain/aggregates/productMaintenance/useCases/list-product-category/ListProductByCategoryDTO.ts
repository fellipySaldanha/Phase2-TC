export interface ListProductStructDTO {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemType: number;
  itemDescription: string;
  itemImgUrl: string;
}

export interface ListProdCategoryOutputDTO {
  hasError: boolean;
  message?: string;
  result?: ListProductStructDTO[];
}

export interface QueryParamsCategoryDTO {
  itemType: number;
}
