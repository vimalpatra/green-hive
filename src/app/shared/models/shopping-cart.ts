import { CartItem } from './cart-item';
import { Product } from './product';

export class ShoppingCart {
	items: CartItem[] = [];

	constructor(private itemsMap: { [key: string]: CartItem }) {

		this.itemsMap = itemsMap || {};

		// tslint:disable-next-line: forin
		for (const productId in itemsMap) {
			const item = itemsMap[productId];

			// we get the item from firebase with key property
			this.items.push( new CartItem({ ...item }) );
		}

	}

	getQuantity(product: Product) {
		const item = this.itemsMap[product.key];
		return item ? item.quantity : 0;
	}

	get totalPrice() {
		let total = 0;

		for (var i = 0; i < this.items.length; ++i) {
			total += this.items[i].totalPrice;
		}

		return total;
	}

	get totalItemsCount() {
		let count = 0;

		for (const productId in this.itemsMap) {
			count += this.itemsMap[productId].quantity;
		}

		return count;
	}
}
