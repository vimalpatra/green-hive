import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: 'shop', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]}

];



@NgModule({
declarations: [],
imports: [
CommonModule,
RouterModule.forChild(routes)
],
exports: [RouterModule]
})

export class ShopRoutingModule { }
