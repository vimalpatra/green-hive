import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})

export class ProductQuantityComponent {

	@Input('product') product: Product;
	@Input('cart') cart: ShoppingCart;
	@Input('design') design: string;

	constructor(private cartService: ShoppingCartService) {

	}

	addToCart() {
		this.cartService.addToCart(this.product);
	}

	removeFromCart() {
		this.cartService.removeFromCart(this.product);
	}



}
