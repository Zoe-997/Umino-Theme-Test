var $html = $('html'), $body = $html.find('body'); cms_js = $html.find('#cms_js') ;
var Alothemes = window.Alothemes || {};
Alothemes.ajaxFilters = function () {

  if ($('.js_container_cat').length == 0 || typeof ($.fn.pjax) == 'undefined') return;
  var area_filter_size = '.widget_filter_size',
      area_filter_color = '.widget_filter_color',
      area_filter_brand = '.widget-brand',
      area_filter_sortby = '.js_cat_sortby',
      area_filter = '.js_filter',
      area_filter_container = '.js_container_cat ';


  $(document).pjax(ajaxSelector, '.js_container_cat', {

    fragment: '.js_container_cat',
    timeout: 650,
    scrollTo: false

  });


  $(document).on('pjax:clicked', function (options) {
    /*if ( $(area_filter_size).length != 0 ) {
                      $.pjax.reload(area_filter_size, {                
                         fragment: area_filter_size,
                         timeout: 100,                   
                         async:false
                      })
                    }*/

    if ($(area_filter).length != 0) {
      $.pjax.reload(area_filter, {
        fragment: area_filter,
        timeout: 100,
        async: true
      })
    }
    if ($(".js_paginate_ajax").length != 0) {
      $.pjax.reload(".js_paginate_ajax", {
        fragment: ".js_paginate_ajax",
        timeout: 100,
        async: true
      })
    }
    if ($(area_filter_container).length != 0) {
      $.pjax.reload(area_filter_container, {
        fragment: area_filter_container,
        timeout: 100
      })
    }
    /* if ( $(area_filter_sortby).length != 0 ) {
                       $.pjax.reload(area_filter_sortby, {              
                          fragment: area_filter_sortby,
                          timeout: 100,
                          async:false                      
                       })
                     }
                     */
    /*
                    if ( $(area_filter_brand).length != 0 ) {
                      $.pjax.reload(area_filter_brand, {               
                         fragment: area_filter_brand,
                         timeout: 2000,
                         scrollTo: false,
                         async:false
                      })
                    }

                    */
  });
  $(document).on('pjax:beforeSend', function (xhr, options) { });
  $(document).on('pjax:timeout', function (e) {
    // Prevent default timeout redirection behavior
    e.preventDefault()
  });

  $(document).on('pjax:error', function (xhr, textStatus, error, options) {            
  });

  $(document).on('pjax:start', function (xhr, textStatus, options) {
    $("body").addClass('ajax_loading');
    $.magnificPopup.close();

  });

  $(document).on('pjax:beforeReplace', function (contents, options) {


  });

  $(document).on('pjax:complete', function (xhr, textStatus, options) {

    aloShopify.mobileSidebar();

    $(document).on('click', '.top-sidebar.style2 .layer-filter h5', function (e) {
      var layer = $(this).closest('.layer-navigation').toggleClass('active');
      layer.siblings().removeClass('active');
    });

    body.on('click', function (e) {
      var target = e.target;
      if (!$(target).is('.top-sidebar.style2 .layer-navigation') && !$(target).parents().is('.top-sidebar.style2 .layer-navigation')) {
        $('.top-sidebar.style2 .layer-navigation').removeClass('active');
      }
    });
  });

  $(document).on('pjax:end', function (xhr, textStatus, options) {
    var holder = $('.js_container_cat .js_products_holder'),
        fragment = options.fragment;
    if (holder.hasClass('laber_packery')) {
      //aloShopify.refresh_packery(holder);
    } else if (holder.hasClass('js_isotope')) {
      aloShopify.refresh_masonry(holder);
    }
    if (typeof theme.ProductCurrency != "undefined") {
      theme.ProductCurrency.update();
    }
    var handle_current_collection = $("ul[data-list-categories]").find("[data-current] [data-handle-collection]").attr("data-handle-collection");

    $("div[data-filter-sorting]").attr("data-include", "/collections/" + handle_current_collection + "?view=header-sorting");
    $("div[data-filter-sorting]").addClass("lazyload").on("lazyincluded", function () {

    })
    $("body").removeClass('ajax_loading');


    if ($('.product-collection__reviews').length > 0) {
      SPR.registerCallbacks();
      SPR.initRatingHandler();
      SPR.initDomEls();
      SPR.loadProducts();
      SPR.loadBadges();
    }
    aloShopify.ajaxScroll(false);
    aloShopify.changeView();

    aloShopify.mobileSidebar();

    aloShopify.sticky_Sidebar();

  })
},