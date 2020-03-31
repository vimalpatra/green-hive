import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { take, map, finalize } from 'rxjs/operators';

import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

import { Product } from 'shared/models/product';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})


export class ProductFormComponent {

  categories$;
  product = {} as Product;

  imageType: string;
  id: string;

  productImagePath: string;

  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;

  // categories;

  constructor(
	  private categoryService: CategoryService,
	  private productService: ProductService,
	  private router: Router,
	  private route: ActivatedRoute,
	  private storage: AngularFireStorage) {

		// path to upload product images
		this.productImagePath = 'shop/products/';

		// get all categories
		this.categories$ = categoryService.getAll();

		// get id from paramater
		this.id = this.route.snapshot.paramMap.get('id');

		// if there's any particular product id... use the data from that product
		if (this.id) {
			productService.get(this.id).pipe( take(1) ).subscribe(p => {
			this.product = p;
		});

		}

  	//test category service in console
	/*
  	categoryService.getCategories().pipe(
  		map( categories => categories.map( category => ({ key: category.key, val: category.payload.val() })	) )
  	).subscribe(r => console.log(r));*/

  }

  uploadImage($event) {
	const file = $event.target.files[0];

	const filePath = this.productImagePath + file.name;

	const fileRef = this.storage.ref(filePath);
	const uploadTask = this.storage.upload(filePath, file);

	this.uploadProgress$ = uploadTask.percentageChanges();

	// get download URL
	uploadTask.snapshotChanges().pipe(
		finalize(() => {
			fileRef.getDownloadURL()
				.subscribe(downloadUrl => this.product.imageUrl = downloadUrl);
		})
	)
	.subscribe(
		task => console.log('task', task),
		error => {
			console.log(error);
			alert(error.name + ': ' + error.message);
		});

  }


  save(product) {

  	if (this.id) this.productService.update(this.id, this.product);
  	else this.productService.create( new Product(this.product) );

  	this.router.navigate(['/admin/products']);
  }

  delete(){
  	if (!confirm('Are you sure you want to delete the product permanently?')) return;

  	this.productService.delete(this.id);
  	this.router.navigate(['/admin/products']);
  }



/*  seeCategories() {
  	this.categories$.subscribe(categories => {
  		this.categories = JSON.stringify(categories, null, 4);
  		categories.forEach(val => {
	  		console.log(val);
	  	});
  	});
  }*/



}
