let markdownEditors = {};

$(document).ready(() => {
	// bind markdown editors
	$('.markdown-edit').each(function(index) {
		let id = $(this).attr('id');
		markdownEditors[id] = new SimpleMDE({
			spellChecker: false,
			element: this,
			styleSelectedText: false,
		});
		$(this).submit(function(event) {
			console.log($(this));
			event.preventDefault();
		})
	});
});
