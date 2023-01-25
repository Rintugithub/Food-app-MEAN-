import { Router } from '@angular/router';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/model/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService:CartService,
    private formBuilder: FormBuilder,
    private orderService:OrderService,
    private router:Router,
    private userService: UserService) {
      const cart = cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }


  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }
  createOrder(){
    if(this.checkoutForm.invalid){
      alert(`please fill the input`);
      return;
    }
    if(!this.order.addressLatLng){
      alert(`please select the location on your map`);
      return;
    }
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment');

      },
      error:(errorResponse)=>{
        alert(errorResponse.error);
      }
    })



  }

}
