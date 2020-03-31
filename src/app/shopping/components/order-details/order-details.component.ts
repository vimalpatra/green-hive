import { Component, OnInit, Input } from '@angular/core';

import { Order } from 'shared/models/order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})


export class OrderDetailsComponent implements OnInit {

	@Input("order") order: Order;

	constructor() { }

	ngOnInit() {
	}

}
