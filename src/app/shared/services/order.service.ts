import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';

import { ShoppingCartService } from './shopping-cart.service';

import { Order } from 'shared/models/order';


@Injectable({
  providedIn: 'root'
})

export class OrderService {

	constructor(
		private db: AngularFireDatabase,
		private shoppingCartService: ShoppingCartService
	) { }

	async placeOrder(order) {
		const result = await this.db.list('/orders').push(order);

		this.shoppingCartService.clearCart(); // clear the cart

		return result;
	}

	getOrder(id): Observable<Order> {

		return this.db.object('/orders/' + id).snapshotChanges()
			.pipe( map(order => this.mapToOrder(order) ) );

	}

	getOrders() {
		return this.db.list('/orders').snapshotChanges()
			.pipe(
				map(orders => orders.map(order => this.mapToOrder(order) ) )
			);
	}



	getOrdersByUser(uid) {

		return this.db.list('/orders', ref => {

			return ref.orderByChild('uid').equalTo(uid);

		}).snapshotChanges()

		.pipe(
			map(orders => orders.map(order => this.mapToOrder(order) ) )
		);

	}


	private mapToOrder(order) {

		const val = order.payload.val() as any;
		const datePlaced: number = val.datePlaced;
		const items: any[] = val.items;
		const shippingDetails: any = val.shippingDetails;
		const uid: string = val.uid;


		const newOrder = {
			key: order.key, datePlaced, items, uid, shippingDetails
		};

		return newOrder;

	}

}
