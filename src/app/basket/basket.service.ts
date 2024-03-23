import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, BasketTotals, IBasket, IBasketItem } from '../shared/_models/basket';
import { IProduct } from '../shared/_models/product';
import { DeliveryMethod } from '../shared/_models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null!);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals>(null!);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
    // const basket = this.getCurrentBasketValue();
    // if (basket) {
    //   basket.shippingPrice = deliveryMethod.price;
    //   basket.deliveryMethodId = deliveryMethod.id;
    //   this.setBasket(basket);
    // }
  };

  getBasket(id:string){
    return this.http.get<IBasket>(this.baseUrl + 'Basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
        //console.log(this.getCuurrentBasketValue())
      })
    ) 
  };

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'Basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
      //console.log(response);
    },error => {
      console.log(error);
    })
  }

  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'Basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket() {
    this.basketSource.next(null!);
    this.basketTotalSource.next(null!);
    localStorage.removeItem('basket_id');
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemTOBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.log(basket);
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  dencrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(s => s.id === item.id)) {
      basket.items = basket.items.filter(x => x.id !== item.id)
      if (basket.items.length > 0) {
        this.setBasket(basket);
      }else {
        this.deleteBasket(basket);
      }
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    //console.log(items);
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else {
      items[index].quantity += quantity; 
    }
    return items;
  }
  
  private createBasket(): Basket  {
    const basket = new Basket();
    try{
      localStorage.setItem('basket_id', basket.id);
    }catch (error) {
      console.log(error)
    }
    return basket;
  }

  private mapProductItemTOBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureURL,
      quantity,
      brand: item.productBrand,
      type: item.productType,
      isDelete: item.isDelete
    };
  }

  
}


