import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, OnDestroy {

    private revapi: any;

  constructor() { }

  ngOnInit() {

    // this.scripts();
  }

  ngOnDestroy() {
    // this.revapi.revkill();
  }

  private scripts() {

    /*==================================================================
        [ Slick4 ]*/
    $('.wrap-slick4').each(function(){
        var wrapSlick4 = $(this);
        var slick4 = $(this).find('.slick4');


        var showDot = false;
        if($(wrapSlick4).find('.wrap-dot-slick4').length > 0) {
            showDot = true;
        }

        var showArrow = false;
        if($(wrapSlick4).find('.wrap-arrow-slick4').length > 0) {
            showArrow = true;
        }

        ($(wrapSlick4).find('.slick4') as any).slick({
            pauseOnFocus: false,
            pauseOnHover: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            fade: false,
            infinite: false,
            autoplay: false,
            autoplaySpeed: 6000,
            arrows: showArrow,
            appendArrows: $(wrapSlick4).find('.wrap-arrow-slick4'),
            prevArrow: $(wrapSlick4).find('.prev-slick4'),
            nextArrow: $(wrapSlick4).find('.next-slick4'),
            dots: showDot,
            appendDots: $(wrapSlick4).find('.wrap-dot-slick4'),
            dotsClass:'dots-slick4',
            customPaging: function(slick, index) {
                return '<div></div>';
            },
            responsive: [
                {
                    breakpoint: 1900,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                }
            ]

        });

    });

    /*==================================================================
    [ Revo2 ]*/
    // let screenH2 = 0;
    // let offsetArrow2 = 0;
    // if ($(window).width() >= 992) {
    //     screenH2 = $(window).height() - 123;
    //     offsetArrow2 = 100;
    // } else {
    //     screenH2 = $(window).height() - 70;
    //     offsetArrow2 = 20;
    // }

    // if ($(window).height() < 768 && $(window).width() >= 992) {
    //     screenH2 = $(window).height() - 90;
    // }

    // this.revapi = (jQuery('#rev_slider_2') as any).show().revolution({

    //     responsiveLevels: [1900, 992, 768, 576],
    //     gridwidth: [1900, 992, 768, 576],
    //     minHeight: screenH2,
    //     delay: 7000,

    //     sliderLayout: 'fullwidth',
    //     spinner: 'spinner2',

    //     navigation: {

    //         keyboardNavigation: 'on',
    //         keyboard_direction: 'horizontal',
    //         onHoverStop: 'off',

    //         touch: {

    //             touchenabled: 'on',
    //             swipe_threshold: 75,
    //             swipe_min_touches: 1,
    //             swipe_direction: 'horizontal',
    //             drag_block_vertical: true

    //         },

    //         arrows: {
    //             enable: false,
    //             style: 'gyges',
    //             hide_onmobile: true,
    //             hide_onleave: true,
    //             left: {
    //                 container: 'slider',
    //                 h_align: 'left',
    //                 v_align: 'center',
    //                 h_offset: offsetArrow2,
    //                 v_offset: 0
    //             },

    //             right: {
    //                 container: 'slider',
    //                 h_align: 'right',
    //                 v_align: 'center',
    //                 h_offset: offsetArrow2,
    //                 v_offset: 0
    //             }
    //         },

    //         bullets: {
    //             enable: true,
    //             style: 'persephone',
    //             tmp: '<div class="tp-bullet-inner"></div>',
    //             hide_onleave: false,
    //             h_align: 'center',
    //             v_align: 'bottom',
    //             h_offset: 0,
    //             v_offset: 40,
    //             space: 12
    //         }
    //     }
    // });

  }

}
