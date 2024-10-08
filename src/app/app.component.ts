import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'e-commerce';

  constructor(private basketService: BasketService, private accountService: AccountService) {}
  
  ngOnInit() {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    // if (basketId) this.basketService.getBasket(basketId);
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        // console.log('initial list')
      }, 
      error => {
        console.log(error)
      });
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
  // loadCurrentUser() {
  //   const token = localStorage.getItem('token');
  //   // this.accountService.loadCurrentUser(token).subscribe();
  //   if (token) {
  //     this.accountService.loadCurrentUser(token).subscribe(() => {
  //       console.log('loaded user')
  //     }, 
  //     error => {
  //       console.log(error)
  //     });
  //   }
  // }
}
