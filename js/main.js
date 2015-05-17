jQuery(document).ready(function($){

	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	

	//on mobile - open/close primary navigation clicking/tapping the menu icon
	$('.cd-primary-nav').on('click', function(event){
		if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
	});

	if (!isMobile){
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if ( scrollTop <= 100) { 
		    $('.cd-header').css("opacity", "1");
		  } else if (scrollTop >= 100 && scrollTop <= $('#content').offset().top - 90){
		  	$('.cd-header').css("opacity", "0");
		  }
		  if ( scrollTop >= $('#content').offset().top - 90 ) { 
		    $('.cd-header').css("position", "fixed");
		    $('.cd-header').css("opacity", "1");
		    $('.cd-header').css("background-color", "#21272c");
		  }else if (scrollTop <= $('#content').offset().top - 200){
		  	$('.cd-header').css("position", "absolute");
		  	$('.cd-header').css("background-color", "transparent");
		  }
		});
	}

	//upload videos if not on mobile
	uploadVideo($('.cd-hero-slider'));

	// start the video because it is the first slide
	checkVideo($('.cd-hero-slider').find('.selected'), $('.cd-hero-slider'), 0);

	// autoplay
	var autoplay = setInterval(function(){
		if ($('.cd-hero-slider .selected').index() > 0){
			prevSlide($('.cd-hero-slider'), $('.cd-slider-nav'), 0);
			updateNavigationMarker(0);
		}else{
			nextSlide($('.cd-hero-slider'), $('.cd-slider-nav'), $('.cd-hero-slider .selected').index() + 1);
			updateNavigationMarker($('.cd-hero-slider .selected').index() + 1);
		}
	}, 6000);

	$('body').on('click', function(event){
		clearInterval(autoplay);
	});

	//change visible slide
	$('.cd-slider-nav li').on('click', function(event){
		event.preventDefault();
		var selectedItem = $(this);
		if(!selectedItem.hasClass('selected')) {
			// if it's not already selected
			var selectedPosition = selectedItem.index(),
				activePosition = $('.cd-hero-slider .selected').index();
			if( activePosition < selectedPosition) {
				nextSlide($('.cd-hero-slider'), $('.cd-slider-nav'), selectedPosition);
			} else {
				prevSlide($('.cd-hero-slider'), $('.cd-slider-nav'), selectedPosition);
			}

			updateNavigationMarker(selectedPosition+1);
		}
	});

	function nextSlide(container, pagination, n){
		var visibleSlide = container.find('.selected'),
			navigationDot = pagination.find('.selected');
		
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});
		
		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
		navigationDot.removeClass('selected')
		pagination.find('li').eq(n).addClass('selected');

		checkVideo(visibleSlide, container, n);
	}

	function prevSlide(container, pagination, n){
		var visibleSlide = container.find('.selected'),
			navigationDot = pagination.find('.selected');
		
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
		navigationDot.removeClass('selected');
		pagination.find('li').eq(n).addClass('selected');

		checkVideo(visibleSlide, container, n);
	}

	function uploadVideo(container) {
		container.find('.cd-bg-video-wrapper').each(function(){
			var videoWrapper = $(this);
			if( videoWrapper.is(':visible') ) {
				// if visible - we are not on a mobile device 
				var	videoUrl = videoWrapper.data('video'),
					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');
				video.appendTo(videoWrapper);
			}
		});
	}

	function checkVideo(hiddenSlide, container, n) {
		//check if a video outside the viewport is playing - if yes, pause it
		if( hiddenSlide.find('video').length > 0 ) hiddenSlide.find('video').get(0).pause();

		//check if the select slide contains a video element - if yes, play the video
		if( container.children('li').eq(n).find('video').length > 0 ) container.children('li').eq(n).find('video').get(0).play();
	}

	function updateNavigationMarker(n) {
		$('.cd-marker').removeClassPrefix('item').addClass('item-'+n);
	}

	$.fn.removeClassPrefix = function(prefix) {
		//remove all classes starting with 'prefix'
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};

	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 90
        }, 1000);
        return false;
      }
    }
  });
});