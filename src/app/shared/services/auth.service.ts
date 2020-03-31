import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from "rxjs";

import { Router, ActivatedRoute} from '@angular/router';

import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';



@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user$: Observable<firebase.User>;

  private provider = new firebase.auth.GoogleAuthProvider();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  	this.user$ = afAuth.authState;

    // this.user$.subscribe(user => console.log(user));
    // console.log(afAuth.authState);
  }


  login() {
    this.saveLastRoute();

    // sign in with redirect using auth's sign in method
    this.afAuth.auth.signInWithRedirect(this.provider);
  }


  logout() {   
    // sign in with redirect using auth's sign out method
  	this.afAuth.auth.signOut();
  
    // navigate to the login page after logout
    this.router.navigate(['/login']);
  }

  saveLastRoute() {
    // set return url to the 'redirecting url'
    let returnUrl: string = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    //save it to local storage
    localStorage.setItem('returnUrl', returnUrl);
  }


  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
        switchMap((user) => {
          return user ? this.userService.get(user.uid).valueChanges() : of(null);
         })

      );
  }

}
