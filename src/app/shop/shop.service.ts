import { HttpClient, HttpParams } from '@angular/common/http';
// import { Pagination } from '../shared/_models/pagination';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/_models/shopParams';
import { IProduct } from '../shared/_models/product';
import { environment } from '../../environments/environment';
import { Category } from '../shared/_models/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.categoryId !== 0){
      params = params.append('categoryId',shopParams.categoryId.toString());
    }

    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }

    params = params.append('sort',shopParams.sort);

    return this.http.get(this.baseUrl + 'Products/GetAllProduct' , {observe: 'response', params})
    .pipe(
      map(response => {
        // console.log(response.body);
        return response.body;
      })
    );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'Products/GetProductById/' + id)
  }

  getCategory(){
    return this.http.get<Category>(this.baseUrl + 'Category/GetAllCategory');
  }

  getCategoryById(id:string|null) {
    return this.http.get<Category>(this.baseUrl + 'Category/GetCategoryById/' + id)
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
}
