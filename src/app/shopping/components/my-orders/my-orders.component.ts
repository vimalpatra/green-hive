import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { Order } from 'shared/models/order';

import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';


@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})


export class MyOrdersComponent implements OnInit {
	orders$;
	authSubscription;
	uid;

	constructor(
		private orderService: OrderService,
		private route: ActivatedRoute,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.authSubscription = this.authService.user$.pipe(
			switchMap(user => {
				this.uid = user.uid;

				this.orders$ = this.orderService.getOrdersByUser(this.uid);

				return this.orders$;
			})

		).subscribe(orders => console.log('orders', orders) );

		

		
	}


}
