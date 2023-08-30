import { OrderItemEntity } from './OrderItemEntity';

export class OrderEntity {
  customer_id?: number;
  order_items?: OrderItemEntity[];
  order_id?: number;
  order_date?: Date;
  order_total?: number;
  customer_name?: string;
  order_status?: string;

  constructor(
    customer_id?: number,
    order_items?: OrderItemEntity[],
    order_id?: number,
    order_date?: Date,
    order_total?: number,
    customer_name?: string,
    order_status?: string,
  ) {
    this.order_id = order_id;
    this.order_date = order_date;
    this.order_total = order_total;
    this.order_items = order_items;
    this.customer_id = customer_id;
    this.customer_name = customer_name;
    this.order_status = order_status;
  }

  /**
   * totalOrderPrice - calculates the total order price
 : number  */
  public totalOrderPrice(): number {
    let price: number = 0.0;
    
    if (this.order_items != undefined){
      for (let i = 0; i < this.order_items.length; i++){
        price = price + ( Number(this.order_items[i].price) * Number(this.order_items[i].order_item_qtd) );
      }
    } else{
    }
    
    return price;
  }
}
