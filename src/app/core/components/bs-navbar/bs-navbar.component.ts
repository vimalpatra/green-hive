import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { Observable } from 'rxjs';

import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})



export class BsNavbarComponent implements OnInit {


  cart$: Observable<ShoppingCart>;
  appUser: AppUser;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();

    this.scripts();
  }

//   searchProduct(query) {
//     this.router.navigate
//   }


  logout() {
  	this.auth.logout();
  }

  private scripts() {

    /*==================================================================
    [ Fixed Header ]*/
    try {
      var headerDesktop = $('.container-menu-desktop');
      var wrapMenu = $('.wrap-menu-desktop');

      if($('.top-bar').length > 0) {
          var posWrapHeader = $('.top-bar').height();
      }
      else {
          var posWrapHeader = 0;
      }


      if($(window).scrollTop() > posWrapHeader) {
          $(headerDesktop).addClass('fix-menu-desktop');
          $(wrapMenu).css('top',0); 
      }  
      else {
          $(headerDesktop).removeClass('fix-menu-desktop');
          $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
      }

      $(window).on('scroll',function(){
          if($(this).scrollTop() > posWrapHeader) {
              $(headerDesktop).addClass('fix-menu-desktop');
              $(wrapMenu).css('top',0); 
          }  
          else {
              $(headerDesktop).removeClass('fix-menu-desktop');
              $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
          } 
      });
    } catch(er) {console.log(er); }
    
    /*==================================================================
    [ Menu mobile ]*/
    try {
      $('.btn-show-menu-mobile').on('click', function(){
          $(this).toggleClass('is-active');
          $('.menu-mobile').slideToggle();
      });

      var arrowMainMenu = $('.arrow-main-menu-m');

      for(var i=0; i<arrowMainMenu.length; i++){
          $(arrowMainMenu[i]).on('click', function(){
              $(this).parent().find('.sub-menu-m').slideToggle();
              $(this).toggleClass('turn-arrow-main-menu-m');
          })
      }

      $(window).on('resize',function(){
          if($(window).width() >= 992){
              if($('.menu-mobile').css('display') === 'block') {
                  $('.menu-mobile').css('display','none');
                  $('.btn-show-menu-mobile').toggleClass('is-active');
              }

              $('.sub-menu-m').each(function(){
                  if($(this).css('display') === 'block') { 
                      $(this).css('display','none');
                      $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                  }
              });

          }
      });
    } catch(er) {console.log(er); }


    /*==================================================================
    [ Show / hide modal search ]*/
    try {
      $('.js-show-modal-search').on('click', function(){
          $('.modal-search-header').addClass('show-modal-search');
          $(this).css('opacity','0');
      });

      $('.js-hide-modal-search').on('click', function(){
          $('.modal-search-header').removeClass('show-modal-search');
          $('.js-show-modal-search').css('opacity','1');
      });

      $('.container-search-header').on('click', function(e){
          e.stopPropagation();
      });
    
    } catch(er) {console.log(er); }


    /*==================================================================
    [ Cart header ]*/
    try {

      $('.wrap-menu-click').each(function() {
          var wrapMenuClick = $(this);

          $(wrapMenuClick).find('.menu-click').on('click', function(e){
              e.stopPropagation();

              if($(this).hasClass('showed')) {
                  $(wrapMenuClick).find('.menu-click').removeClass('show-menu-click showed');
              }
              else {
                  $(wrapMenuClick).find('.menu-click').removeClass('show-menu-click showed');
                  $(this).addClass('show-menu-click showed');
              }
          });

          $(wrapMenuClick).find('.menu-click-child').on('click', function(e){
              e.stopPropagation();
          }); 
      });

      $(window).on('click', () => {
          $('.wrap-menu-click').find('.menu-click').removeClass('show-menu-click showed');
      });

    } catch(er) {console.log(er); }


  }


}
