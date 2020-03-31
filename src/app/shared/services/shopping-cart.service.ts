import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { Product } from 'shared/models/product';
import { CartItem } from 'shared/models/cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

 	constructor(private db: AngularFireDatabase) { }

  	async getCart(): Promise<Observable<ShoppingCart>>  {
		const cartRef = await this.getCartRef();

		return cartRef.valueChanges().pipe(
			map(cart => new ShoppingCart(cart.items) )
		); // return a new shoppingCart Observable with items from firebase database
	}

	addToCart(product: Product) {
		this.updateQuantity(product, 1);
	}

	removeFromCart(product: Product) {
		this.updateQuantity(product, -1);
	}

	async clearCart() {
		const cartId = await this.getOrCreateCartId();
		return this.db.object('/shopping-carts/' + cartId + '/items').remove();
	}

	private create() {
		return this.db.list('/shopping-carts').push({
			dateCreated: new Date().getTime()
		});
	}

	private async getCartRef(): Promise<AngularFireObject<any>> {
		const cartId = await this.getOrCreateCartId();
		return this.db.object('/shopping-carts/' + cartId);
	}



	private getItemRef(cartId, productKey) {
		return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
	}

	private getItem(itemRef) {
		if (!itemRef)
			throw new Error("Argument: itemRef is not provided");

		return itemRef.valueChanges();
	}


	private async getOrCreateCartId() {
		const cartId = localStorage.getItem('cartId');

		if (cartId) return cartId;

		const result = await this.create();
		localStorage.setItem('cartId', result.key);

		return result.key;
	}



	private async updateQuantity(product: Product, change) {

		const cartId = await this.getOrCreateCartId();
		const itemRef = this.getItemRef(cartId, product.key);
		const item$: Observable<CartItem> = this.getItem(itemRef);

		item$.pipe( take(1) ).subscribe(item => {

			const quantity: number = (item ? item.quantity : 0) + change;

			if(quantity === 0) itemRef.remove();

			else itemRef.update({
				key: product.key,
				title: product.title,
				imageUrl: product.imageUrl,
				price: product.price,
				quantity
			});

		});

	}


}
