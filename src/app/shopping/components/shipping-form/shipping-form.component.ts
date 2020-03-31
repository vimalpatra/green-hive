import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';

import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { ShippingDetails } from 'shared/models/shipping-details';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})


export class ShippingFormComponent implements OnInit, OnDestroy {

	@Input('cart') cart: ShoppingCart;
	shipping: Partial<ShippingDetails> = {};

	authSubscription: Subscription;
	uid: string;



	constructor(
		private router: Router,
		private orderService: OrderService,
		private authService: AuthService
	) { }



	ngOnInit() {
		this.authSubscription = this.authService.user$.subscribe(user => this.uid = user.uid);
	}


	ngOnDestroy() {
		this.authSubscription.unsubscribe();
	}


	async placeOrder() {
		const order = this.createOrder();
		const fireOrder = await this.orderService.placeOrder(order);

		console.log(order);
		// navigate to order success page
		this.router.navigate(['order-success', fireOrder.key]);
	}


	private createOrder() {
		return new Order(this.uid, this.shipping, this.cart);

	}

}
