import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {

	cart$;

	constructor(private shoppingCartService: ShoppingCartService) { }

	async ngOnInit() {
		this.cart$ = await this.shoppingCartService.getCart();
	}

	clearCart() {
		const save = this.shoppingCartService.clearCart();

		console.log('click', save);
	}


}
