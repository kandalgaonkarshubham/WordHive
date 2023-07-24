;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};




	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut(1500);
	};

	
	$(function(){
		contentWayPoint();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
	});


}());

// ---------------------------------------- Features ---------------------------------------------------------


  function toggleExpand(n, link) {
  	var featureCopy = document.querySelector('.feature-copy' + n);
  	var featureP = document.getElementById('feature' + n);

  	featureCopy.classList.toggle('expanded');

  	if (featureCopy.classList.contains('expanded')) {
  		featureP.style.webkitLineClamp = 'unset';
  	} else {
  		featureP.style.webkitLineClamp = '5';
  	}

  	if (link) {
  		link.style.display = 'none';
  	}

  	document.addEventListener('click', function (event) {
  		var featureCopy = document.querySelector('.feature-copy' + n);

  		if (!featureCopy.contains(event.target)) {
  			featureCopy.classList.remove('expanded');
  			var featureP = document.getElementById('feature' + n);
  			featureP.style.webkitLineClamp = '5';

  			if (link) {
  				link.style.display = 'block';
  			}
  		}
  	});
  }