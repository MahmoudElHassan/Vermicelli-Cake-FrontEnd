import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/_models/product';
import { BasketService } from '../../basket/basket.service';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ShopParams } from '../../shared/_models/shopParams';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Category } from '../../shared/_models/category';
import { log } from 'console';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  categories!: Category[];
  product?: IProduct[];
  // categoryId?: number;
  shopParams = new ShopParams();
  query!: string | null;

  constructor(private basketServices: BasketService,
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    // private bcService: BreadcrumbService, 
    // private basketService: BasketService
  ) {
    // bcService.set('@productItems', '');
    // console.log();
    // console.log(this.query);

  }
  ngOnInit() {
    this.loadProduct()
  }

  addItemBasket(product: IProduct) {
    this.basketServices.addItemToBasket(product);
  }

  loadProduct() {
    this.query = this.activatedRoute.snapshot.queryParamMap.get('categoryId');
    this.shopService.getCategoryById(this.query).subscribe((res: any) => {
      this.shopParams.categoryId = res.id;
      this.shopService.getProducts(this.shopParams).subscribe((response: any) => {
        this.product = response;
        this.shopParams.categoryId = response.categoryId;
        console.log(response);
      })
      console.log(res);
    })

  }
}
