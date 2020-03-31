import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Order } from 'shared/models/order';

import { OrderService } from 'shared/services/order.service';



@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

	order$: Observable<Order>;


	constructor(
		private orderService: OrderService,
		private route: ActivatedRoute
	) { }



	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');

		this.order$ = this.orderService.getOrder(id);
	}



}
