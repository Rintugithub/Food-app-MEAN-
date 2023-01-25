import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:User;
 cartQuantity=0;
  constructor(cartService:CartService,private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;

    })
  }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logOut();
  }
  get isAuth(){
    return this.user.token;
  }

}
