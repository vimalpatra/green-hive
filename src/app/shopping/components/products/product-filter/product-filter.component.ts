import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})

export class ProductFilterComponent implements OnInit {

	@Input('products') products: Product[];
	@Output('filter') filter = new EventEmitter();

	searchValue = "";
	sortValue = "";

	categories$;
	filteredProducts: Product[] = [];
	categorizedProducts: Product[] = [];
	category: string;


	constructor(
		private categoryService: CategoryService,
		private route: ActivatedRoute
	) { }


	ngOnInit() {
		// get all categories
		this.categories$ = this.categoryService.getAll();

		// this.scripts();

		this.route.queryParamMap.subscribe(params => {
			this.category = params.get('category');

			this.applyFilters();
		});
	}


	applyFilters() {

		// check category
		this.filterCategory();

		// check for query
		this.search(this.searchValue);

		// sort with value
		this.sort(this.sortValue);

		// raise change event
		this.filter.emit(this.filteredProducts);

	}


	private filterCategory() {
		this.categorizedProducts = this.filteredProducts = this.category ?
				this.products.filter(product => product.category === this.category) : this.products;

	}

	private search(query: string) {
		this.filteredProducts = !(query) ? this.categorizedProducts :
			this.categorizedProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

	}

	private sort(sort: string) {
		if (!sort) return;

		switch (sort) {
			case "name_a":
				this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
				break;

			case "name_d":
				this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title)).reverse();
				break;

			case "price_a":
				this.filteredProducts.sort((a, b) => a.price.toString().localeCompare(b.price.toString()));
				break;

			case "price_d":
				this.filteredProducts.sort((a, b) => a.price.toString().localeCompare(b.price.toString())).reverse();
				break;

		}


	}


	selectSort(sort: string) {
		this.sort(sort);
		// raise change event
		this.filter.emit(this.filteredProducts);
	}

	inputSearch(query: string) {
		this.search(query);
		// raise change event
		this.filter.emit(this.filteredProducts);
	}


}
