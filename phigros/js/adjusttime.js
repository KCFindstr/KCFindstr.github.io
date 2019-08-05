// Adjust Time zone
$(document).ready(() => {
	$('form').each(function(index) {
		let timezone = $(this).find('[type=datetime-local]');
		let form = $(this);
		if (timezone.length > 0) {
			$(this).submit(function(event) {
				timezone.each(function() {
					let date = $(this).val().trim();
					if (date.length == 0)
						return;
					date = new Date(date);
					$(this).remove();
					form.append($('<input type="hidden" name="available" value="' + date.toISOString() + '"/>'))
				});
			});
		}
	});
});
