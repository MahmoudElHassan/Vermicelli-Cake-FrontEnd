import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/_models/basket';
import { BasketService } from '../../basket/basket.service';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { Order, OrderToCreate } from '../../shared/_models/order';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit{

  basket$!: Observable<IBasket>;
  @Input() appStepper?: CdkStepper;
  @Input() checkoutForm!: FormGroup;
  loading = false;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, 
    private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.basket$ = this.basketService.basketSource$;
  }

  submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order:Order) => {
      this.toastr.success('Order created successfullly');
      this.basketService.deleteLocalBasket();
      const navigationExtras: NavigationExtras = {state: order};
      this.router.navigate(['checkout/success'], navigationExtras);
      this.sendWhatsApp(order);
      console.log(order);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }


  private getOrderToCreate(basket: IBasket): OrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value;
    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }

  sendWhatsApp(order: Order) {
    this.checkoutService.sendWhatsAppMessage(order).subscribe((result: any) => {
      console.log(result);
    })
  }
}
