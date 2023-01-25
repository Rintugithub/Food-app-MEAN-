import { CartService } from './../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from './../../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
   food!:Food;
  constructor( actvatedRoute:ActivatedRoute,foodService:FoodService,
   private  cartService:CartService, private router:Router) {
    actvatedRoute.params.subscribe((params)=>{
      if(params.id)
       foodService.getFoodById(params.id).subscribe((serverFood)=>{
        this.food = serverFood;
       });
    })
   }

  ngOnInit(): void {
  }
  addToCart(){
   this.cartService.addToCart(this.food);
   this.router.navigateByUrl('/cart-page');
  }

}
