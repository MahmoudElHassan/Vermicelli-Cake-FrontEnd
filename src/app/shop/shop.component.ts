import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/_models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/_models/brand';
import { IType } from '../shared/_models/type';
import { ShopParams } from '../shared/_models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;

  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  shopParams = new ShopParams();
  totalCount!: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' }
  ];


  constructor(private shopServices: ShopService) { }

  ngOnInit() {
    this.getProduct();
    this.getBrand();
    this.getType();
  }

  getProduct() {
    this.shopServices.getProducts(this.shopParams).subscribe((response: any) => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      //console.log(this.products)
    }, error => {
      console.log(error)
    });
  }

  getBrand() {
    this.shopServices.getBrand().subscribe((response: any) => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
      //console.log(this.brands)
    }, error => {
      console.log(error)
    });
  }

  getType() {
    this.shopServices.getType().subscribe((response: any) => {
      this.types = [{ id: 0, name: 'All' }, ...response];
      //console.log(this.types)
    }, error => {
      console.log(error)
    });
  }

  onBranbSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProduct();
  }

  onPageChanged(event: any) {
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event.page;
      this.getProduct();
    }
    
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProduct();
  }
}
