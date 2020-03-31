import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot ) {

  	return this.auth.user$
  		.pipe(
	  		map(user => {

		  		if (user) { return true; }

          // otherwise set the query paramaters returnUrl as this url and redirect to a new page
		  		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } } );
		  		return false;
		  	})
  		);

  }


}
