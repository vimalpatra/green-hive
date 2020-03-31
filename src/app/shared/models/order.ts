export class Order {
	datePlaced: number;
	items: any[];
	key: string;

	constructor(public uid, public shippingDetails, shoppingCart) {

		this.datePlaced = new Date().getTime();

		this.items = shoppingCart.items.map(item => {
			return {
				product: {
					title: item.title,
					imageUrl: item.imageUrl,
					price: item.price
				},
				quantity: item.quantity,
				totalPrice: item.totalPrice
			};
		});

	}

}