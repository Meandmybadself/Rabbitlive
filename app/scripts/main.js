var activeModal;

/** Handles opening / closing of Meet Rabbits section in lg mode. **/
function toggleRabbits() {
	var mc = $('.main-content');
	if (mc.hasClass('showingRabbits')) {
		$('.main-content').removeClass('showingRabbits');
	} else {
		$('.main-content').addClass('showingRabbits');
		//Also, tell the rabbit to stop animating.
		onMeetButtonBlur();
	}
}

/** Handles click of LIVE Method button. **/
function onMethodButtonClicked(e) {
	e.preventDefault();
	if (activeModal == 'method-modal') {
		hideActiveModal();
		return;
	}

	showModal('method-modal');
}

/** Handles click of 'Live Intelligence' text **/
function onLiveIntelClicked(e) {
	e.preventDefault();
	if (activeModal == 'live-modal') {
		hideActiveModal();
		return;
	}
	showModal('live-modal');
}

/** Closes Meet Rabbits in lg mode. **/
function onRabbitCloseButtonClicked(e) {
	e.preventDefault();
	$('.main-content').removeClass('showingRabbits');
}

/** Shows left-side modals **/
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

/** Called when the Meet the Rabbits button is moused-out. Returns the SVG to its initial state. **/
function onMeetButtonBlur() {
	TweenMax.to($(this).find('.rabbit-logo-path'), 1, {drawSVG:"0 100%", repeat:0, yoyo:false, overwrite:1});
}

/** Hides the active side modal & dependencies. **/
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


/** onReady handler. **/
$(function() {

	$(window).load(function() {

		//Set the progress of .rabbit-text paths to 0.
		TweenMax.set('.rabbit-text', {drawSVG:0});
		//Bring its opacity to 1.
		TweenMax.set('.logo-text', {opacity:1});

		//Animation for the top left text logo.
		var rTextTL = new TimelineLite();
		rTextTL.set('#rabbit-text-logo', {opacity:1});
		rTextTL.set('.rabbit-text', {opacity:1, drawSVG:0});
		rTextTL.to('#rabbit-text-0', .3, {drawSVG:"100%", delay:.2});
		rTextTL.to('#rabbit-text-1', 2, {drawSVG:"100%"});
		rTextTL.to('#rabbit-text-2', .3, {drawSVG:"100%"});

		//Three text items in top left text logo.
		TweenMax.to('#logo-text-item-0, #logo-text-item-1, #logo-text-item-2', .4, {width:'145px', delay:2.5});

		TweenMax.to('.properties dt, .properties dd.details, .meet-text', 1, {opacity:1, delay:1.5, ease:Quad.easeOut}, 1);
		TweenMax.to('.main .contact, .method-button', 1, {opacity:1, delay:2, paddingTop:0, ease:Quad.easeOut}, 1);

		TweenMax.to('.explain', 1, {opacity:1, delay:1.5});

		//Restore property icon opacity.
		TweenMax.set('dd.img', {opacity:1});
		//Reset property icon paths to 0%;
		TweenMax.set('.icon-path', {drawSVG:"0%, 0%"});

		TweenMax.from($('.rabbit-logo-path'), 2, {drawSVG:"0% 0%", delay:.5, ease:Quad.eastOut});
		TweenMax.to($('.meet-logo'), 2, {opacity:1, delay:.5, ease:Quad.eastOut});
		TweenMax.from($('circle'), 2, {opacity:0, delay:.5, ease:Quad.eastOut});

		setTimeout(function(){
			var stpTL = new TimelineMax();
			stpTL.repeat(-1);
			stpTL.staggerTo('.icon-path', 1, {drawSVG:"0% 50%", ease:Quad.easeIn}, 1);
			stpTL.to('.icon-path', 2, {drawSVG:"50% 50%", ease:Quad.easeOut});
		}, 1500);


		TweenMax.staggerTo($('h1 p'), 1, {opacity:1, delay:.2}, .9);
	});


	/** Button event handlers **/
	$('.properties dl').on('mouseover', function() {
		TweenMax.to($(this).find('.icon-path'), .5, {css:{'stroke':'#34CCB0'}});
	});

	$('.properties dl').on('mouseout', function() {
		TweenMax.to($(this).find('.icon-path'), .5, {css:{'stroke':'#ffffff'}});
	});

	$('.meet-button').on('mouseover', function() {
		//Only do this is the screen is in large media query mode.
		if ($(window).width() > 768) {
			TweenMax.staggerTo($(this).find('.rabbit-logo-path'), 1, {drawSVG:"0%", yoyo:true, repeat:-1, ease:Quad.easeInOut}, .1);
		}
	});

	$('.meet-button').on('mouseout mouseleave', onMeetButtonBlur);
	$('.page-modal .close-btn').on('click', hideActiveModal);
	$('.method-button .button').on('click', onMethodButtonClicked);
	$('.rabbits .close-btn').on('click', onRabbitCloseButtonClicked);
	$('#live-intel-button').on('click', onLiveIntelClicked);
	$('.meet-button').click(toggleRabbits);
});