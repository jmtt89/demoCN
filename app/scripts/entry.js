const VERSION = '0.1.0';
console.info(VERSION);

$('main').hide()
jQuery(document).ready(function() {
	$('main').show()
	jQuery.timeago.settings.cutoff = 1000*60*60*24*2;
	jQuery.timeago.settings.strings.hours = "%d hours";
	$("time.timeago").timeago();
});
