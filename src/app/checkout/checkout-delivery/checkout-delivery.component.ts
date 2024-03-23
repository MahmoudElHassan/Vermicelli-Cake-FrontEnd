import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from '../../shared/_models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { error } from 'console';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm!: FormGroup;
  deliveryMethods!: DeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((dm: DeliveryMethod[]) => {
      this.deliveryMethods = dm
    },error => {
      console.log(error);
      
    })
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
