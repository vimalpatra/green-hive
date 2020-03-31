import { Injectable } from '@angular/core';

import { AuthService } from 'shared/services/auth.service';

import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppUser } from 'shared/models/app-user';


@Injectable({
  providedIn: 'root'
})


export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {

  	return this.auth.appUser$.pipe(
  		map( appUser => {

  			if (appUser.isAdmin) {
				  return true;
  			}

  			// console.log('sorry you are not an admin');
  			// this.router.navigate(['/products'], { queryParams: { returnUrl: state.url } } );
  			// return false;

  		})
  	);


  }

}
