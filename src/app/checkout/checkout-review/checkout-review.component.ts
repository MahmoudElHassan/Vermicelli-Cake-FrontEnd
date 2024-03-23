import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/_models/basket';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit{

  basket$!: Observable<IBasket>;

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.basket$ = this.basketService.basketSource$;
  }
}
