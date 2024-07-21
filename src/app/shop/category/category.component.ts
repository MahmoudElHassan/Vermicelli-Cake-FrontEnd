import { Component, Input, Output } from '@angular/core';
import { Category } from '../../shared/_models/category';
import { Route, Router } from '@angular/router';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/_models/product';
import { ShopParams } from '../../shared/_models/shopParams';
import { send } from 'node:process';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() categories!: Category;
  // categoryId!: number;
  // products!: IProduct[];
  shopParams = new ShopParams();

  constructor(
    // private shopServices: ShopService, 
    private router: Router) { }

  // getProduct() {
  //   this.shopServices.getProducts(this.shopParams).subscribe((response: any) => {
  //     this.products = response;
  //     this.shopParams.categoryId = response.categoryId;
  //     this.categoryId = response.categoryId;
  //     console.log(this.products);

  //     // this.shopParams.sort = response.sort;
  //     //this.totalCount = response.count;
  //     console.log(this.products)
  //   }, error => {
  //     console.log(error)
  //   });
  // }

  onSearch(Id: number) {
    // this.shopParams.categoryId = categoryId;
    this.router.navigate(['shop',this.categories.name], {queryParams: {categoryId: Id}});
    // this.getProduct();
  }
}
