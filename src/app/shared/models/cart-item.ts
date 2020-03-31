export class CartItem {

	title: String;
	imageUrl: String;
	price: number;
	quantity: number;

	constructor(init?: Partial<CartItem>) {
		Object.assign(this, init);
	}

	get totalPrice() {
		return this.price * this.quantity;
	}

}
