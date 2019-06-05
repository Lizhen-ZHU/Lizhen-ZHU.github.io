//
//
// Duet JS
//
//



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Plugins

// @codekit-prepend "/plugins/history.js"
// @codekit-prepend "/plugins/imagesloaded.js"
// @codekit-prepend "/plugins/masonry.js"
// @codekit-prepend "/plugins/debounce.js"
// @codekit-prepend "/plugins/fluidbox.js"
// @codekit-prepend "/plugins/owl.js"
// @codekit-prepend "/plugins/waypoints.js"



(function ($) {
	'use strict';



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Navigation

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;
	var History = window.History;

	// State change event
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();
		// console.log(state);

		// Loading state
		$('body').addClass('loading');

		// Load the page
		$('.page-loader').load( state.hash + ' .page__content', function() {

			// Scroll to top
			$( 'body, html' ).animate({
				scrollTop: 0
			}, 300);

			// Find transition time
			var transitionTime = 400;

			// Get new body classes
			var bodyClasses = $('.page-loader').find('#body-classes').attr('class');

			// After current content fades out
			setTimeout( function() {

				// Remove old content
				$('.page .page__content').remove();

				// Append new content
				$('.page-loader .page__content').appendTo('.page');

				// Set page URL
				$('body').attr('data-page-url', window.location.pathname);

				// Update navTarget
				navTarget = $('body').attr('data-page-url');

				// Set page title
				docTitle = $('.page__content').attr('data-page-title');
				document.title = docTitle;

				// Set new body classes
				$('body').removeClass().addClass(bodyClasses);

				// Run page functions
				pageFunctions();

			}, transitionTime);

		});

	});


	// On clicking a link

	$(document).on('click', 'a', function (event){

    if ($(this).hasClass('follow')) {
      return;
    }

    // Don't follow link
    event.preventDefault();

		// Get the link target
		var thisTarget = $(this).attr('href');

		// If link is external
		if ( thisTarget.indexOf('http') >= 0 ) {

			// Go to the external link
			window.open(thisTarget, '_blank');

		}

		// If we don't want to use ajax
		else if ( $(this).hasClass('js-no-ajax') ) {

			// Use the given link
			window.location = thisTarget;
		}

		// if it's a contact modal
		else if ( $(this).hasClass('js-contact') ) {

			// Open contact modal
			$('.modal--contact').addClass('modal--on');
		}

		else if ( $(this).hasClass('js-signup') ) {
			// Open signup modal
			$('.modal--signup').addClass('modal--on');
		}

		// If link is handled by some JS action – e.g. fluidbox
		else if ( $(this).is('.gallery__item__link') ) {
			
			// Let JS handle it
		}

		// If link is handled by some JS action – e.g. LightGallery
		else if ( $(this).is('.illustrations__link') ) {
			
			// Let JS handle it
    }


		// If link is internal
		else {

      // If it's footer, override target to UIs for UI project page.
      if ( $(this).is('.footer__title') ) {
        if (location.pathname.indexOf("ui") >= 0){
          thisTarget = "/ui"
        }
      }

			// Change navTarget
			navTarget = thisTarget;
			
			// Switch the URL via History
			History.pushState(null, docTitle, thisTarget);
		}

	});



	// Modals

	$(document).on('click', '.js-contact', function (event){
		event.preventDefault();
		$('.modal--contact').addClass('modal--on');
	});

	$(document).on('click', '.js-signup', function (event){
		event.preventDefault();
		$('.modal--signup').addClass('modal--on');
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

    // Wait until first image has loaded
    console.log($('.page__content').find('img:first'));

		$('.page__content').find('img:first').imagesLoaded( function() {

			// Show the content
      $('body').removeClass('loading');

			// Hide the menu
      $('body').removeClass('menu--open');

      // Until Document Ready
      $(document).ready(function(){

        // Portfolio grid layout
        var $portfolioGrid = $(".portfolio-wrap");
        var $portfolioGridItems = $('.portfolio-wrap .portfolio-item')
        $portfolioGridItems.hide();
        $portfolioGrid.masonry({
          itemSelector: '.portfolio-item',
          hiddenStyle: {
            transform: 'translateY(100px)',
            opacity: 0
          },
          visibleStyle: {
            transform: 'translateY(0px)',
            opacity: 1
          }
        });
        $portfolioGrid.imagesLoaded().progress( function() {
          $portfolioGrid.masonry();
          $portfolioGridItems.show();
        });

        // Illustration grid layout
        var $illustrationGrid = $(".illustration-wrap");
        var $illustrationGridItems = $('.illustration-wrap .illustration-item')
          $illustrationGrid.masonry({
            itemSelector: '.illustration-item',
            percentPosition: true,
            horizontalOrder: true,
          });
        $illustrationGrid.imagesLoaded().progress( function() {
          $illustrationGrid.masonry();
          $illustrationGridItems.show();
        });
        // $illustrationGrid.imagesLoaded( function() {
        //   $illustrationGrid.masonry({
        //     itemSelector: '.illustration-item',
        //     percentPosition: true,
        //     horizontalOrder: true,
        //   });
        // });

        // Blog grid layout
        $('.blog-wrap').imagesLoaded( function() {
          $('.blog-wrap').masonry({
            itemSelector: '.blog-post',
            // transitionDuration: 0
          });
        });
      })
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Active links

		// Switch active link states
		$('.active-link').removeClass('active-link');

		$('a[href="' + navTarget + '"]').addClass('active-link');



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

		// Destroy all existing waypoints
		Waypoint.destroyAll();

		// Set up count for galleries to give them unique IDs
		var galleryCount = 0;

		// If there's a gallery
		$('.gallery').each( function() {

			// Get gallery element
			var $this = $(this);

			// Add ID via count
			galleryCount++;
			var thisId = 'gallery-' + galleryCount;
			$this.attr('id', thisId);

			// Gallery columns
			var galleryCols = $this.attr('data-columns');

			// Set up gallery container
			$this.append('<div class="gallery__wrap"></div>');

			// Add images to container
			$this.children('img').each( function() {
				$(this).appendTo('#' + thisId + ' .gallery__wrap');
			});

			// Wrap images
			$this.find('.gallery__wrap img').each( function() {
				var imageSrc = $(this).attr('src');
				$(this).wrapAll('<div class="gallery__item item"><a href="' + imageSrc + '" class="gallery__item__link"></div></div>').appendTo();
			});

			// Wait for images to load
			$this.imagesLoaded( function() {

				// If it's a single column gallery
				if ( galleryCols === '1' ) {

					// Add carousel class to gallery
					$this.addClass('gallery--carousel');

					// Add owl styles to gallery wrap
					$this.children('.gallery__wrap').addClass('owl-carousel');

          // Use carousel
          $this.children('.gallery__wrap').owlCarousel({
            responsive:{
              0:{
                  items:1
              },
              600:{
                  items:3
              },
            },
						loop: true,
						mouseDrag: true,
						touchDrag: true,
            pullDrag: false,
            dots: true,
            lazyLoad:true,
            autoplay: false,
						autoplayTimeout: 5000,
						animateOut: 'fadeOut'
          }).on('click', '.owl-stage', function (e) {
            console.log('next')
            $(this).trigger('next.owl');
            e.preventDefault();
        });

					// When scrolling over the bottom
					var waypoint1 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {

								// console.log('pause');
							
								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}

							if ( direction === 'up') {

								// console.log('play');
								
								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}
						},
						offset: '-100%'
					});

					// When scrolling over the top
					var waypoint2 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {

								// console.log('play');
								
								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}

							if ( direction === 'up') {

								// console.log('pause');
							
								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}
						},
						offset: '100%'
					});

				}

				else {

					$this.addClass('gallery--grid');

					// Use masonry layout
					$this.children('.gallery__wrap').masonry({
						itemSelector: '.gallery__item',
						transitionDuration: 0
					});
							
          if ($this.hasClass('full')){
					  // Init lightGallery
            $this.lightGallery({
              selector: '.gallery__item__link',
              download: false,
              thumbnail: false,
            })
          } else {
					  // Init fluidbox
            $this.find('.gallery__item__link').fluidbox({
              loader: true
            });
          }

				}

				// Show gallery once initialized
				$this.addClass('gallery--on');
			});

		});


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Gallery
    
    $(document).ready(function() {
      $("#illustrations").lightGallery({
        selector: '.illustrations__link',
        download: false,
        thumbnail: false,
      }); 
    });

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Images

		$('.single p > img').each( function() {
			var thisP = $(this).parent('p');
			$(this).insertAfter(thisP);
			$(this).wrapAll('<div class="image-wrap"></div>');
			thisP.remove();
		});


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Videos

		// For each iframe
		$('.single iframe').each( function() {

			// If it's YouTube or Vimeo
			if ( $(this).attr('src').indexOf('youtube') >= 0 || $(this).attr('src').indexOf('vimeo') >= 0 ) {

				var width = $(this).attr('width');
				var height = $(this).attr('height');
				var ratio = (height/width)*100;

				// Wrap in video container
				$(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');
			}

		});

	}

  // Run functions on ready/load
	pageFunctions();


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu

	$(document).on('click', '.js-menu-toggle', function (){

		// If already open
		if ( $('body').hasClass('menu--open') ) {
			$('body').removeClass('menu--open');
		}

		// If not open
		else {
			$('body').addClass('menu--open');
		}
	});

	$(document).on('click', '.menu__list__item__link', function (){

		// If menu is open when you click a link on mobile
		if ( $('.menu').hasClass('menu--open') ) {
			$('.menu').removeClass('menu--open');
		}
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Contact Form

	// Override the submit event
	$(document).on('submit', '#contact-form', function (e) {

		// Clear previous classes
		$('.contact-form__item--error').removeClass('contact-form__item--error');

		// Get form elements
		var emailField = $('.contact-form__input[name="email"]');
		var nameField = $('.contact-form__input[name="name"]');
		var messageField = $('.contact-form__textarea[name="message"]');
		var gotchaField = $('.contact-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate message
		if ( messageField.val() === '' ) {
			messageField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// If all fields are filled, except gotcha
		if ( emailField.val() !== '' && nameField.val() !== '' && messageField.val() !== '' && gotchaField.val().length === 0 ) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});	
	
	
	
}(jQuery));