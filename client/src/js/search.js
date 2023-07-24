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



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 3500,
		});
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
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		pieChart();
		skillsWayPoint();
	});


}());

// ---------------------------------------- Search Bar ---------------------------------------------------------


// ---------------------------------------- Example Slider ---------------------------------------------------------
function setupCarousel(){
// Get all the testimonial labels and dots labels
const testimonialsLabels = Array.from(document.querySelectorAll('.testimonials label[for^="t-"]'));
const dotsLabels = Array.from(document.querySelectorAll('.dots label[for^="t-"]'));

// Function to apply the initial styles
function applyInitialStyles() {
	testimonialsLabels.forEach((label, index) => {
		if (index === 0) {
			label.style.transform = 'translate3d(0, 0, 0)';
			label.style.zIndex = '4';
		} else {
			label.style.transform = `translate3d(${index * 300}px, 0, -90px) rotateY(${-index * 15}deg)`;
			label.style.zIndex = '1';
		}
	});

	dotsLabels[0].classList.add('active');
}

// Function to handle the checked state
function handleCheckedState() {
	const checkedValue = this.id;

	testimonialsLabels.forEach((label, index) => {
		const offset = index - testimonialsLabels.findIndex(item => item.getAttribute('for') === checkedValue);

		if (offset === 0) {
			label.style.transform = 'translate3d(0, 0, 0)';
			label.style.zIndex = '4';
		} else {
			const translateX = offset > 0 ? `${offset * 300}px` : `${Math.abs(offset) * -300}px`;
			const rotateY = offset > 0 ? `${offset * -15}deg` : `${Math.abs(offset) * 15}deg`;
			label.style.transform = `translate3d(${translateX}, 0, -90px) rotateY(${rotateY})`;
			label.style.zIndex = offset === 1 ? '3' : '1';

			// Set zIndex of the 3rd label to 0 when the first dot is checked
			if (offset === -2 && checkedValue === 't-1') {
				label.style.zIndex = '0';
			}
		}
	});

	dotsLabels.forEach(label => {
		if (label.getAttribute('for') === checkedValue) {
			label.classList.add('active');
		} else {
			label.classList.remove('active');
		}
	});
}

// Attach event listener to each testimonial input
testimonialsLabels.forEach(label => {
	const inputId = label.getAttribute('for');
	const input = document.getElementById(inputId);
	input.addEventListener('change', handleCheckedState);
});

// Apply initial styles on page load
applyInitialStyles();

// Attach event listener to each testimonial input
testimonialsLabels.forEach(label => {
	const inputId = label.getAttribute('for');
	const input = document.getElementById(inputId);
	input.addEventListener('change', handleCheckedState);
});

}
// -------------------------------------Custom Bootstrap ProgressBar-----------------------------------------------

$('.progress .progress-bar').progressbar();  // bootstrap 3

// -------------------------------------Header Nodes---------------------------------------------------------------

/* !
<!--The MIT License(MIT)

Copyright(c) 2023 Pawel(https://codepen.io/pawelqcm/pen/oxPYox)

  Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files(the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. -->
*/


(function () {

	var canvas, ctx, circ, nodes, mouse, SENSITIVITY, SIBLINGS_LIMIT, DENSITY, NODES_QTY, ANCHOR_LENGTH, MOUSE_RADIUS;

	// how close next node must be to activate connection (in px)
	// shorter distance == better connection (line width)
	SENSITIVITY = 100;
	// note that siblings limit is not 'accurate' as the node can actually have more connections than this value that's because the node accepts sibling nodes with no regard to their current connections this is acceptable because potential fix would not result in significant visual difference 
	// more siblings == bigger node
	SIBLINGS_LIMIT = 20;
	// default node margin
	DENSITY = 50;
	// total number of nodes used (incremented after creation)
	NODES_QTY = 0;
	// avoid nodes spreading
	ANCHOR_LENGTH = 20;
	// highlight radius
	MOUSE_RADIUS = 200;

	circ = 2 * Math.PI;
	nodes = [];

	canvas = document.querySelector('canvas');
	resizeWindow();
	mouse = {
		x: canvas.width / 2,
		y: canvas.height / 2
	};
	ctx = canvas.getContext('2d');
	if (!ctx) {
		alert("Ooops! Your browser does not support canvas :'(");
	}

	function Node(x, y) {
		this.anchorX = x;
		this.anchorY = y;
		this.x = Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH);
		this.y = Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH);
		this.vx = Math.random() * 2 - 1;
		this.vy = Math.random() * 2 - 1;
		this.energy = Math.random() * 100;
		this.radius = Math.random();
		this.siblings = [];
		this.brightness = 0;
	}

	Node.prototype.drawNode = function () {
		var color = "rgba(96, 73, 131, " + this.brightness + ")";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2 * this.radius + 2 * this.siblings.length / SIBLINGS_LIMIT, 0, circ);
		ctx.fillStyle = color;
		ctx.fill();
	};

	Node.prototype.drawConnections = function () {
		for (var i = 0; i < this.siblings.length; i++) {
			var color = "rgba(129, 103, 169, " + this.brightness + ")";
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
			ctx.lineWidth = 1 - calcDistance(this, this.siblings[i]) / SENSITIVITY;
			ctx.strokeStyle = color;
			ctx.stroke();
		}
	};

	Node.prototype.moveNode = function () {
		this.energy -= 2;
		if (this.energy < 1) {
			this.energy = Math.random() * 100;
			if (this.x - this.anchorX < -ANCHOR_LENGTH) {
				this.vx = Math.random() * 2;
			} else if (this.x - this.anchorX > ANCHOR_LENGTH) {
				this.vx = Math.random() * -2;
			} else {
				this.vx = Math.random() * 4 - 2;
			}
			if (this.y - this.anchorY < -ANCHOR_LENGTH) {
				this.vy = Math.random() * 2;
			} else if (this.y - this.anchorY > ANCHOR_LENGTH) {
				this.vy = Math.random() * -2;
			} else {
				this.vy = Math.random() * 4 - 2;
			}
		}
		this.x += this.vx * this.energy / 100;
		this.y += this.vy * this.energy / 100;
	};

	function initNodes() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		nodes = [];
		for (var i = DENSITY; i < canvas.width; i += DENSITY) {
			for (var j = DENSITY; j < canvas.height; j += DENSITY) {
				nodes.push(new Node(i, j));
				NODES_QTY++;
			}
		}
	}

	function calcDistance(node1, node2) {
		return Math.sqrt(Math.pow(node1.x - node2.x, 2) + (Math.pow(node1.y - node2.y, 2)));
	}

	function findSiblings() {
		var node1, node2, distance;
		for (var i = 0; i < NODES_QTY; i++) {
			node1 = nodes[i];
			node1.siblings = [];
			for (var j = 0; j < NODES_QTY; j++) {
				node2 = nodes[j];
				if (node1 !== node2) {
					distance = calcDistance(node1, node2);
					if (distance < SENSITIVITY) {
						if (node1.siblings.length < SIBLINGS_LIMIT) {
							node1.siblings.push(node2);
						} else {
							var node_sibling_distance = 0;
							var max_distance = 0;
							var s;
							for (var k = 0; k < SIBLINGS_LIMIT; k++) {
								node_sibling_distance = calcDistance(node1, node1.siblings[k]);
								if (node_sibling_distance > max_distance) {
									max_distance = node_sibling_distance;
									s = k;
								}
							}
							if (distance < max_distance) {
								node1.siblings.splice(s, 1);
								node1.siblings.push(node2);
							}
						}
					}
				}
			}
		}
	}

	function redrawScene() {
		resizeWindow();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		findSiblings();
		var i, node, distance;
		for (i = 0; i < NODES_QTY; i++) {
			node = nodes[i];
			distance = calcDistance({
				x: mouse.x,
				y: mouse.y
			}, node);
			if (distance < MOUSE_RADIUS) {
				node.brightness = 1 - distance / MOUSE_RADIUS;
			} else {
				node.brightness = 0;
			}
		}
		for (i = 0; i < NODES_QTY; i++) {
			node = nodes[i];
			if (node.brightness) {
				node.drawNode();
				node.drawConnections();
			}
			node.moveNode();
		}
		requestAnimationFrame(redrawScene);
	}

	function initHandlers() {
		document.addEventListener('resize', resizeWindow, false);
		canvas.addEventListener('mousemove', mousemoveHandler, false);
	}

	function resizeWindow() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function mousemoveHandler(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	initHandlers();
	initNodes();
	redrawScene();

})();

// ----------------------  -----------------------
