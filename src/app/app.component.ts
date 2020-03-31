import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';


import * as $ from 'jquery';

declare var swal: any;
declare var PerfectScrollbar: any;

(window as any).jQuery = (window as any).$ = $;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {

  	// subscribe to the user observable as soon as initializing the app to run a function whenever the obeservable receives new data
  	auth.user$.subscribe(user => {
   
  	 	// if a user is not found return
  	 	if (!user) return;

  	 	// save user to db
  	 	this.userService.save(user);

  	 	// go to the return url
  	 	let returnUrl: string = localStorage.getItem('returnUrl');

     if (!returnUrl) return;

     localStorage.removeItem('returnUrl');
  	 	this.router.navigateByUrl(returnUrl);

  	 });

  }


  ngOnInit() {
    this.scripts();
  }

    onActivate(event) {
        window.scroll(0, 0);
        //or document.body.scrollTop = 0;
        //or document.querySelector('body').scrollTo(0,0)

    }


  ngOnDestroy() {
    // this.auth.saveLastRoute();
  }
  

  private scripts() {



    /*[ Back to top ]
    ===========================================================*/
    try {
      var windowH = $(window).height()/2;

      $(window).on('scroll',function(){
          if ($(this).scrollTop() > windowH) {
              $("#myBtn").css('display','flex');
          } else {
              $("#myBtn").css('display','none');
          }
      });

      $('#myBtn').on("click", function(){
          $('html, body').animate({scrollTop: 0}, 300);
      });
    } catch(er) {console.log(er);}


    /*==================================================================
    [ Isotope ]*/
    try {
      var $topeContainer = $('.isotope-grid');
      var $filter = $('.filter-tope-group');

      // filter items on button click
      $filter.each(function () {
          $filter.on('click', 'button', function () {
              var filterValue = $(this).attr('data-filter');
              ($topeContainer as any).isotope({filter: filterValue});
          });
          
      });

      // init Isotope
      $(window).on('load', function () {
          var $grid = $topeContainer.each(function () {
              ($(this) as any).isotope({
                  itemSelector: '.isotope-item',
                  layoutMode: 'masonry',
                  percentPosition: true,
                  animationEngine : 'best-available',
                  masonry: {
                      columnWidth: '.isotope-item'
                  }
              });
          });
      });

      var isotopeButton = $('.filter-tope-group button');

      $(isotopeButton).each(function(){
          $(this).on('click', function(){
              for(var i=0; i<isotopeButton.length; i++) {
                  $(isotopeButton[i]).removeClass('how-active1');
              }

              $(this).addClass('how-active1');


              if($(this).data('filter') === "*") {
                  $('.isotope-grid-gallery .isotope-item .js-gallery').addClass('js-show-gallery');
                  
                  $('.gallery-lb.isotope-grid-gallery').each(function() {
                      ($(this).find('.js-show-gallery') as any).magnificPopup({
                          type: 'image',
                          gallery: {
                              enabled:true
                          },
                          mainClass: 'mfp-fade'
                      });
                  });
              }
              else {
                  $('.isotope-grid-gallery .isotope-item .js-gallery').removeClass('js-show-gallery');
                  $('.isotope-grid-gallery ' + $(this).data('filter') + ' .js-gallery').addClass('js-show-gallery');

                  $('.gallery-lb.isotope-grid-gallery').each(function() {
                      ($(this).find('.js-show-gallery') as any).magnificPopup({
                          type: 'image',
                          gallery: {
                              enabled:true
                          },
                          mainClass: 'mfp-fade'
                      });
                  });
              }
          });
      });
    } catch(er) {console.log(er);}

    /*==================================================================
    [ Sweetalert ]*/
    try {
      $('.js-addwish-b1, .js-addwish1').on('click', function(e){
          e.preventDefault();
      });

      $('.js-addwish-b1').each(function(){
          var nameProduct = $(this).parent().parent().find('.js-name-b1').html();
          $(this).on('click', function(){
              swal(nameProduct, "is added to wishlist !", "success");

              $(this).addClass('js-addedwish-b1');
              $(this).removeClass('js-addwish-b1');
              $(this).off('click');
          });
      });

      $('.js-addcart-b1').each(function(){
          var nameProduct = $(this).parent().parent().find('.js-name-b1').html();
          $(this).on('click', function(e){
              e.preventDefault();
              swal(nameProduct, "is added to cart !", "success");
          });
      });


      /*---------------------------------------------*/
      $('.js-addwish1').each(function(){
          var nameProduct = $(this).parent().find('.js-name1').html();
          $(this).on('click', function(){
              swal(nameProduct, "is added to wishlist !", "success");

              $(this).addClass('js-addedwish1');
              $(this).off('click');
          });
      });

      $('.js-addcart1').each(function(){
          var nameProduct = $(this).parent().parent().find('.js-name1').html();
          $(this).on('click', function(e){
              e.preventDefault();
              swal(nameProduct, "is added to cart !", "success");
          });
      });


    } catch(er) {console.log(er);}

    /*==================================================================
    [ Parallax100 ]*/
    // try {
    //     ($('.parallax100') as any).parallax100();
    // } catch(er) {console.log(er);}


    /*==================================================================
    [ Perfect scrollbar ]*/
    try {
        $('.js-pscroll').each(function(){
            $(this).css('position','relative');
            $(this).css('overflow','hidden');
            var ps = new PerfectScrollbar(this, {
                wheelSpeed: 1,
                scrollingThreshold: 1000,
                wheelPropagation: false,
            });

            $(window).on('resize', function(){
                ps.update();
            })
        });
    } catch(er) {console.log(er);}


    /*==================================================================
    [ JS height ]*/

    try {
      $(window).on('resize', function(){
          $('.js-height').each(function(){
              $(this).css('height',$(this).find('.js-height-child').height());
          });
      });

      $(window).on('load', function(){
          $('.js-height').each(function(){
              $(this).css('height',$(this).find('.js-height-child').height());
          });
      });
    } catch(er) {console.log(er);}

    // /*==================================================================
		// [ Noui ]*/
    // try {
    //   var filterBar = document.getElementById('filter-bar');
    //   var fromValue = Number($('#value-lower').html());
    //   var toValue = Number($('#value-upper').html());

    //   noUiSlider.create(filterBar, {
    //     start: [ fromValue, toValue ],
    //     connect: true,
    //     range: {
    //       'min': fromValue,
    //       'max': toValue
    //     }
    //   });

    //   var skipValues = [
    //   document.getElementById('value-lower'),
    //   document.getElementById('value-upper')
    //   ];

    //   (filterBar as any).noUiSlider.on('update', function( values, handle ) {
    //     (skipValues[handle] as any).innerHTML = Math.round(values[handle]) ;
    //   });
    // } catch(er) {console.log(er);}

    /*==================================================================
    [ Select2 ]*/
    try {
      $(".js-select2").each(function(){
          ($(this) as any).select2({
              minimumResultsForSearch: 20,
              dropdownParent: $(this).next('.dropDownSelect2')
          });
      });
    } catch(er) {console.log(er);}
    
    
    /*==================================================================
    [ Show grid / list ]*/
    try {
      $('.js-show-grid').on('click', function(){
          $(this).addClass('menu-active');
          $('.js-show-list').removeClass('menu-active');
    
          $('.shop-grid').fadeIn();
          $('.shop-list').hide();
      });
    
      $('.js-show-list').on('click', function(){
          $(this).addClass('menu-active');
          $('.js-show-grid').removeClass('menu-active');
    
          $('.shop-list').fadeIn();
          $('.shop-grid').hide();
      });
    } catch(er) {console.log(er);}
    
    /*==================================================================
    [ +/- num product ]*/
    try {
      $('.btn-num-product-down').on('click', function(){
          var numProduct = Number($(this).next().val());
          if(numProduct > 0) $(this).next().val(numProduct - 1);
      });
    
      $('.btn-num-product-up').on('click', function(){
          var numProduct = Number($(this).prev().val());
          $(this).prev().val(numProduct + 1);
      });
    } catch(er) {console.log(er);}
      
    /*==================================================================
    [ Rating ]*/
    try {
      $('.wrap-rating').each(function(){
          var item = $(this).find('.item-rating');
          var rated = -1;
          var input = $(this).find('input');
          $(input).val(0);
    
          $(item).on('mouseenter', function(){
              var index = item.index(this);
              var i = 0;
              for(i=0; i<=index; i++) {
                  $(item[i]).removeClass('fa-star-o');
                  $(item[i]).addClass('fa-star');
              }
    
              for(var j=i; j<item.length; j++) {
                  $(item[j]).addClass('fa-star-o');
                  $(item[j]).removeClass('fa-star');
              }
          });
    
          $(item).on('click', function(){
              var index = item.index(this);
              rated = index;
              $(input).val(index+1);
          });
    
          $(this).on('mouseleave', function(){
              var i = 0;
              for(i=0; i<=rated; i++) {
                  $(item[i]).removeClass('fa-star-o');
                  $(item[i]).addClass('fa-star');
              }
    
              for(var j=i; j<item.length; j++) {
                  $(item[j]).addClass('fa-star-o');
                  $(item[j]).removeClass('fa-star');
              }
          });
      });
    } catch(er) {console.log(er);}
      
    /*==================================================================
    [ Show/hide panel1 ]*/
    try {
      $('.js-toggle-panel1').on('click', function(){
          $(this).parent().parent().find('.js-panel1').slideToggle();
      });
    } catch(er) {console.log(er);}
    
    
    /*==================================================================
    [ Chose pay ]*/
    try {
      $("#radio1").on('change', function(){
          if ($(this).is(":checked")) {
              $('.content-payment').slideDown(300);
              $('.content-paypal').slideUp(300);
          }
      });
    
      $("#radio2").on('change', function(){
          if ($(this).is(":checked")) {
              $('.content-payment').slideUp(300);
              $('.content-paypal').slideDown(300);
          }
      });
    } catch(er) {console.log(er);}
      
    /*==================================================================
    [ Show/hide Reply cmt ]*/
    try {
      $('.js-show-reply-cmt').on('click', function(e){
          e.preventDefault();
          $(this).parent().parent().parent().find('.js-reply-cmt').show();
          $(this).addClass('how-active2');
      });
    
      $('.js-hide-reply-cmt').on('click', function(e){
          e.preventDefault();
          $(this).parent().parent().hide();
          $(this).parent().parent().parent().find('.js-show-reply-cmt').removeClass('how-active2');
      });
    } catch(er) {console.log(er);}



  } // scripts method


}
