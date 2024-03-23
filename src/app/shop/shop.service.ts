import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/_models/pagination';
import { IBrand } from '../shared/_models/brand';
import { IType } from '../shared/_models/type';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/_models/shopParams';
import { IProduct } from '../shared/_models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId',shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }

    params = params.append('sort',shopParams.sort);
    params = params.append('pageIndex',shopParams.pageNumber.toString());
    params = params.append('pageSize',shopParams.pageSize.toString());


    return this.http.get<Pagination>(this.baseUrl + 'Products/GetAllProduct' , {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'Products/GetProductById/' + id)
  }

  getBrand(){
    return this.http.get<IBrand>(this.baseUrl + 'ProductBrand/GetAllBrand');
  }

  getType(){
    return this.http.get<IType>(this.baseUrl + 'ProductType/GetAllType');
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
}
