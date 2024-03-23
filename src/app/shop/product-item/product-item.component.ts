import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/_models/product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
  
  @Input() product!: IProduct;

  constructor(private basketServices: BasketService) {}

  ngOnInit() {
  }

  addItemBasket() {
    this.basketServices.addItemToBasket(this.product);
  }

}
