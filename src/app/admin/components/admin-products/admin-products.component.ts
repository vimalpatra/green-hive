import { Component, OnInit, OnDestroy } from '@angular/core';
// import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})


export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  productSub: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {

  	this.productSub = productService.getAll().subscribe(p => {
  		this.products = p;
  		this.intializeTable(p);
  	});

  }



  ngOnDestroy() {
  	this.productSub.unsubscribe();
  }



  private intializeTable(products: Product[]) {
  		// init table resource instance to use ng 5 data table and pass it the products array 
  		this.tableResource = new DataTableResource(products);

  		// run a method with parameters to query and filter the displayed table
  		this.tableResource.query({
  			offset: 0
  		})
  		// save the items when it returns the promise
  		.then(items => {
  			this.items = items;
  		});

  		// when we receive the data to be displayed after querying, count it and save it..
  		this.tableResource.count()
  		// save the itemCount when it returns the promise
  		.then(count => this.itemCount = count);
  }

  reloadItems(params) {
  		// return if we have not yet got the data from backend
  		if (!this.tableResource) return;

  		// query the table resource again with new params and filter the displayed table
  		this.tableResource.query(params)
  		//when the method returns the promise
  		.then(items => this.items = items);
  }


  filter(query: string) {
  	let filteredProducts = !(query) ? this.products :
  		this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  	this.intializeTable(filteredProducts);


  }



}

