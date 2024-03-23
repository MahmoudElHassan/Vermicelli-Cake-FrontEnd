import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketTotals } from '../../_models/basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$!: Observable<BasketTotals>; 

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.basketTotal$ = this.basketService.basketTotal$;
  }

}
