$(document).ready(() => {
	// init controller
	let controller = new ScrollMagic.Controller({
		addIndicators: true
	});

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-y',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-y', 1, {left: '-24vw', opacity: 1})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-y',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-y-1-text', 1, {transform: 'rotate(15deg) translateY(0)', opacity: 1})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-n',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-n', 1, {right: '-16vw', opacity: 1})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-y-2',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-y-2', 1, {opacity: 1, scale: 1})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-n',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-n', 1, {right: '-16vw', opacity: 1})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-n',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-n', 1, {right: '-16vw', opacity: 1})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-n-1',
			triggerHook: 'onEnter'
		})
		.setTween('#sm-n-1-text', 1, {transform: 'rotate(-15deg) translateY(0)', opacity: 1})
		.addTo(controller);

	let timeline = new TimelineMax()
		.from('#sm-n-l', 1, {transform: 'translate(-80vw, 20.7vw)', opacity: 1}, 0)
		.from('#sm-n-r', 1, {transform: 'translate(60vw, -15.53vw)', opacity: 1}, 0)
		.from('#sm-n-text', 1, {opacity: 0}, 0.5)
		.from('#sm-n-lr-text', 1, {opacity: 0}, 0.5);
	new ScrollMagic.Scene({
			triggerElement: '#sm-trigger-lr',
			triggerHook: 'onEnter'
		})
		.setTween(timeline)
		.addTo(controller);
});