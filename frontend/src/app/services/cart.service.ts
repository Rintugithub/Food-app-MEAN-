import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/model/Cart';
import { CartItem } from '../shared/model/Cartitem';
// import { CartItem } from '../shared/model/Cartitem';
import { Food } from '../shared/model/food';


@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart:Cart= this.getCartFromLocalStroage();
private cartsubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }
  addToCart(food:Food):void{
 let Cartitem = this.cart.items
 .find(item=> item.food.id === food.id)
 if(Cartitem)
 return;
 this.cart.items.push(new CartItem(food));
 this.setCartToLocalstorage();
  }
  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items
    .filter(item => item.food.id != foodId);
    this.setCartToLocalstorage();

  }
  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items
    .find(item=> item.food.id === foodId)
    if(!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalstorage();

  }
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalstorage();

  }
  getCartObservable():Observable<Cart>{
    return this.cartsubject.asObservable();
  }
  getCart(): Cart{
    return this.cartsubject.value;
  }
  private setCartToLocalstorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum,currentItem)=> prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
    .reduce((prevSum,currentItem)=> prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart',cartJson);
    this.cartsubject.next(this.cart);
  }
  private getCartFromLocalStroage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : new Cart();
  }
}
