var activeModal;

function toggleRabbits() {
	var mc = $('.main-content');
	if (mc.hasClass('showingRabbits')) {
		$('.main-content').removeClass('showingRabbits');
	} else {
		$('.main-content').addClass('showingRabbits');
	}
}

function onMethodButtonClicked(e) {
	e.preventDefault();
	if (activeModal == 'method-modal') {
		hideActiveModal();
		return;
	}

	showModal('method-modal');
}

function onLiveIntelClicked(e) {
	e.preventDefault();
	if (activeModal == 'live-modal') {
		hideActiveModal();
		return;
	}
	showModal('live-modal');
}

function showModal(id) {
	if (activeModal) {
		hideActiveModal();
	}
	switch(id) {
		case 'live-modal':
			$('#live-intel-button').addClass('active');
		break;
		case 'method-modal':
			$('.method-button .button').addClass('active');
		break;
	}
	$('.' + id).addClass('active');
	activeModal = id;
}

function onMeetButtonBlur() {
	TweenMax.to($(this).find('.rabbit-logo-path'), 1, {drawSVG:"0 100%", repeat:0, yoyo:false, overwrite:1});
}

function hideActiveModal() {
	$('.' + activeModal).removeClass('active');
	switch(activeModal) {
		case 'live-modal':
			$('#live-intel-button').removeClass('active');
		break;
		case 'method-modal':
			$('.method-button .button').removeClass('active');
		break;
	}
	activeModal = null;
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

		//TweenMax.from('.properties dt', 3, {opacity:0});


		TweenMax.staggerTo('.properties dt', 1, {opacity:1}, 1);
		TweenMax.staggerTo('.properties dd.details', .5, {css:{'opacity':1}, ease:Quad.easeOut}, 1);

		TweenMax.set('.icon-path', {drawSVG:"0%, 0%"});
		var stpTL = new TimelineMax();
		stpTL.repeat(-1);
		stpTL.staggerTo('.icon-path', 2, {drawSVG:"0% 50%", ease:Quad.easeIn, delay:0}, 1);
		stpTL.to('.icon-path', 2, {drawSVG:"50% 50%", ease:Quad.easeOut, delay:0});

		TweenMax.from($('.rabbit-logo-path'), 2, {drawSVG:"0% 0%", ease:Quad.eastOut});
	});


	/** Button event handlers **/
	$('.properties dl').on('mouseover', function() {
		TweenMax.to($(this).find('.icon-path'), .5, {css:{'stroke':'#34CCB0'}});
	});

	$('.properties dl').on('mouseout', function() {
		TweenMax.to($(this).find('.icon-path'), .5, {css:{'stroke':'#ffffff'}});
	});

	$('.meet-button').on('mouseover', function() {
		if ($(window).width() > 768) {
			TweenMax.staggerTo($(this).find('.rabbit-logo-path'), 1, {drawSVG:"0%", yoyo:true, repeat:-1, ease:Quad.easeInOut}, .1);
		}
	});

	$('.meet-button').on('mouseout mouseleave', onMeetButtonBlur);
	$('.page-modal .close-btn').on('click', hideActiveModal);
	$('.method-button .button').on('click', onMethodButtonClicked);
	$('#live-intel-button').on('click', onLiveIntelClicked);
	$('.meet-button').click(toggleRabbits);
});

