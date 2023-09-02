export default class Product {
  itemId?: number;
  itemName: string;
  itemPrice: number;
  itemType: number;
  itemDescription: string;
  itemImgUrl: string;

  constructor(
    itemName: string,
    itemPrice: number,
    itemType: number,
    itemDescription: string,
    itemImgUrl: string,
    itemId?: number,
  ) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemType = itemType;
    this.itemDescription = itemDescription;
    this.itemImgUrl = itemImgUrl;
    this.validateProperties();
  }

  validateProperties() {
    let array_errors: string[] = [];
    if (!this.itemName) array_errors.push('Error...itemName is required');
    if (!this.itemPrice) array_errors.push('Error...itemPrice is required');
    if (!this.itemType) array_errors.push('Error...itemType is required');
    if (array_errors.length > 0) throw array_errors;
  }
}
