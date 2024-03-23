import { Component, Injectable, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/_models/basket';
import { IUser } from '../../shared/_models/user';
import { AccountService } from '../../account/account.service';

// @Injectable({
//   providedIn: 'root'
// })

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  basket$!: Observable<IBasket>;
  currentUser$!: Observable<IUser | null | undefined>;
  constructor(private basketService: BasketService, private accountService: AccountService) {}
  
  ngOnInit() {
    this.basket$ = this.basketService.basketSource$;
    console.log(this.basket$);
    
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }

}
