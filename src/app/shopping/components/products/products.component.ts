import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { ProductService } from 'shared/services/product.service';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductFilterComponent } from './product-filter/product-filter.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

	@ViewChild('productFilter') private productFilterComponent: ProductFilterComponent;

	private cartSubscription: Subscription;

	products: Product[] = [];
	filteredProducts = [];

	shoppingCart$: Observable<ShoppingCart>;



	constructor(
		private productService: ProductService,
		private cartService: ShoppingCartService ) { }


	async ngOnInit() {
		this.shoppingCart$ = await this.cartService.getCart();
		this.populateProducts();
	}


	private populateProducts() {
		this.productService.getAll().subscribe(p => {
			this.filteredProducts = this.products = p;

			setTimeout(() => {
				this.productFilterComponent.applyFilters();
			},50);

		});

	}

	onFilter(filteredProducts) {
		this.filteredProducts = filteredProducts;

		// console.log('filteredProducts from products comp.', this.filteredProducts);
	}


}
