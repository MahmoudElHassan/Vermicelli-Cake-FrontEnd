import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductItemComponent } from './product-item/product-item.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  // { path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}} },
  {
    path: ':category', component: ProductItemComponent
    // , data: {breadcrumb: {alias: 'productItems'}} 
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
