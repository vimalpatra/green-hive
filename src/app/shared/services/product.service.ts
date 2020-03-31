import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { map, tap } from 'rxjs/operators';

import { Product } from 'shared/models/product';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
  	this.db.list('/products').push(product);
  }

  getAll() {
  	return this.db.list('/products').snapshotChanges().pipe(
        map(products => {
          return products.map(this.mapSnapshotToProduct);
        })
      );
  }

  get(id) {
  	return this.db.object('/products/' + id).snapshotChanges().pipe(
          map(this.mapSnapshotToProduct)
        );
  }

  update(id, product) {
  	this.db.object('/products/' + id).update(product);
  }

  delete(id) {
  	this.db.object('/products/' + id).remove();
  }


  private mapSnapshotToProduct(p) {

      const val = <any>p.payload.val();

      let product: Product = {
        key: p.key,
        title: val.title,
        price: val.price,
        category: val.category,
        imageUrl: val.imageUrl,
        sold: val.sold
      };
   
      return product;

  }


}

