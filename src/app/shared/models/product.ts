export class Product {
	key: string;
	title: string;
	price: number;
	category: string;
	imageUrl: string;
	sold: number;

	constructor(init: Partial<Product>) {
		this.sold = 0;

		Object.assign(this, init);
	}
}
