import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
  	return this.db.list('/categories', ref => ref.orderByChild('number'))
    .snapshotChanges().pipe(
 	
  		map( categories => categories.map( category => this.mapSnapshotToCategory(category) ) )
 	
  	);

  }


  mapSnapshotToCategory(category){
  	const value = category.payload.val();
	
	let data = { 
		key: category.key, 
		name: value.name
	};

	return data;

  }

}
