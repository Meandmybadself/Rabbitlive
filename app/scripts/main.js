function toggleRabbits() {
	var mc = $('.main-content');
	if (mc.hasClass('showingRabbits')) {
		$('.main-content').removeClass('showingRabbits');
	} else {
		$('.main-content').addClass('showingRabbits');
	}
}

$(function() {

	$(window).load(function() {

		// TweenMax.set('.rabbit-text', {drawSVG:0});

		// var rTextTL = new TimelineLite();
		// rTextTL.set('#rabbit-text-logo', {opacity:1});
		// rTextTL.set('.rabbit-text', {opacity:1, drawSVG:0});
		// rTextTL.to('#rabbit-text-0', .3, {drawSVG:"100%", delay:.2});
		// rTextTL.to('#rabbit-text-1', 2, {drawSVG:"100%"});
		// rTextTL.to('#rabbit-text-2', .3, {drawSVG:"100%"});

		// TweenMax.to('#logo-text-item-0', .4, {width:'100px', delay:2.5});
		// TweenMax.to('#logo-text-item-1', .4, {width:'100px', delay:2.5});
		// TweenMax.to('#logo-text-item-2', .4, {width:'100px', delay:2.5});

	});


	$('.meet-button').click(toggleRabbits);
});

