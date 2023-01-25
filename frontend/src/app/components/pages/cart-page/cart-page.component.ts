import { CartItem } from './../../../shared/model/Cartitem';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/model/Cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
 cart!:Cart;
  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }
 removeFromCart(CartItem:CartItem){
  this.cartService.removeFromCart(CartItem.food.id);
 }
 changeQuantity(CartItem:CartItem,quantityInString:string){
 const quantity = parseInt(quantityInString);
 this.cartService.changeQuantity(CartItem.food.id,quantity);
 }
}
