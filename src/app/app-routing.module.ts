import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './core/components/about/about.component';
import { ContactComponent } from './core/components/contact/contact.component';
// import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';



const routes: Routes = [
		  {path: '', redirectTo: 'shop', pathMatch: 'full' },
		  {path: 'home', redirectTo: 'shop', pathMatch: 'full' },
		  {path: 'about', component: AboutComponent },
		  {path: 'contact', component: ContactComponent },
      {path: 'login', component: LoginComponent },
      {path: '**', component: NotFoundComponent }

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
