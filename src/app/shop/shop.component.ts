import { IProduct } from '../shared/_models/product';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/_models/shopParams';
import { Category } from '../shared/_models/category';
// import { Flavor } from '../shared/_models/flavor';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;

  products!: IProduct[];
  categories!: Category[];
  // flavors!: Flavor[];
  shopParams = new ShopParams();
  // totalCount!: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' }
  ];


  constructor(private shopServices: ShopService) { }

  ngOnInit() {
    // this.getProduct();
    this.getCategory();
    // this.getFlavor();
  }

  // getProduct() {
  //   this.shopServices.getProducts(this.shopParams).subscribe((response: any) => {
  //     this.products = response;
  //     // this.shopParams.search = response.search;
  //     // this.shopParams.sort = response.sort;
  //     //this.totalCount = response.count;
  //     console.log(this.products)
  //   }, error => {
  //     console.log(error)
  //   });
  // }

  getCategory() {
    this.shopServices.getCategory().subscribe((response: any) => {
      // this.categories = [{ id: 0, name: 'All' }, ...response];
        this.categories = response;
    }, error => {
      console.log(error)
    });
  }

  // getFlavor() {
  //   this.shopServices.getFlavor().subscribe((response: any) => {
  //     this.flavors = [{ id: 0, name: 'All' }, ...response];
  //     //console.log(this.types)
  //   }, error => {
  //     console.log(error)
  //   });
  // }

  // onCategorySelected(categoryId: number) {
  //   this.shopParams.categoryId = categoryId;
  //   // this.shopParams.pageNumber = 1;
  //   this.getProduct();
  // }

  // onFlavorSelected(flavorId: number) {
  //   this.shopParams.flavorId = flavorId;
  //   this.shopParams.pageNumber = 1;
  //   this.getProduct();
  // }

  // onSortSelected(sort: string) {
  //   this.shopParams.sort = sort;
  //   this.getProduct();
  // }

  // onPageChanged(event: any) {
  //   if(this.shopParams.pageNumber != event){
  //     this.shopParams.pageNumber = event.page;
  //     this.getProduct();
  //   }
    
  }

  // onSearch() {
  //   this.shopParams.search = this.searchTerm.nativeElement.value;
  //   this.shopParams.pageNumber = 1;
  //   this.getProduct();
  // }

  // onReset() {
  //   this.searchTerm.nativeElement.value = '';
  //   this.shopParams = new ShopParams();
  //   this.getProduct();
  // }

