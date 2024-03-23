import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/_models/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, 
    private bcServices: BreadcrumbService, private basketService: BasketService){
    bcServices.set('@productDetails', '');
  }

  ngOnInit() { 
    this.loadProduct(); 
  }

  addItemTOBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity)
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  loadProduct(){
    let id = +this.activatedRoute.snapshot.params['id'];
    this.shopService.getProduct(id).subscribe(product => {
      this.product = product;
      this.bcServices.set('@productDetails', product.name)
      // console.log(product);
    }, error => {
      console.log(error);
    }
    )
  }

}
function Params(error: any): void {
  throw new Error('Function not implemented.');
}

