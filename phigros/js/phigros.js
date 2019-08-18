$(document).ready(() => {
	$('#fullpage').fullpage({
		scrollOverflow: true,
		paddingTop: '50px'
	});
	/* Make sure it gets full height
	 * Some weird things happen on mobile devices when I use 100vh
	 */
	// $('.section-5a').height(window.innerHeight);
});