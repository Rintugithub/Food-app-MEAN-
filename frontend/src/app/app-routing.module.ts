import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path:'tag/:tag',component:HomeComponent},
  {path:'food/:id',component:FoodPageComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'checkout',component:CheckoutPageComponent, canActivate:[AuthGuard]},
  {path:'payment',component:PaymentComponent, canActivate:[AuthGuard]},
  {path:'track/:orderId',component:OrderTrackPageComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
