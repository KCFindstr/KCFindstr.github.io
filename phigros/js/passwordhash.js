
// Run md5 hashing on password
$(document).ready(() => {
	$('form').each(function(index) {
		let password = $(this).find('[name=password]');
		let username = $(this).find('[name=username]');
		if (username.length > 0 && password.length > 0) {
			$(this).submit(function (event) {
				let password = $(this).find('[name=password]')[0];
				let username = $(this).find('[name=username]')[0];
				let val = $(password).val();
				if (val.length == 0)
					return;
				val = $(username).val() + '/' + val;
				val = md5(val);
				$(password).val(val);
			});
		}
	});
});
