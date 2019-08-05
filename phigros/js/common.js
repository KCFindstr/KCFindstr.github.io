$(document).ready(() => {
	// csrf
	let csrf_token = $('meta[name="csrf-token"]').attr('content');
	$.ajaxPrefilter(function(options, originalOptions, jqXHR){
		return jqXHR.setRequestHeader('X-CSRF-Token', csrf_token);
	});
	// moment.js
	$('time').each(function() {
		let data = $(this).attr('data-time');
		let utc = moment.utc(data);
		let local = moment(utc).local();
		let ryear = local.format('Y');
		let rdate = local.format('M.D');
		let ele = $('<span></span>');
		ele.text(rdate);
		$(this).append(ele);
		ele = $('<span></span>');
		ele.text(ryear);
		$(this).append(ele);
	});
	// alert
	$('.notification').each(function() {
		$(this).fadeIn();
		setTimeout(() => {
			$(this).fadeOut();
		}, 5000);
	});
});

// notification
function notify(msg, type) {
	type = type || 'primary';
	let el = `
<div class="notification alert alert-` + type + `">
	` + msg + `
	<button type="button" class="close ml-3" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
`;
	el = $(el);
	$('body').append(el);
	$(el).fadeIn();
	setTimeout(() => {
		$(el).fadeOut(() => {
			$(el).remove();
		});
	}, 5000);
}
