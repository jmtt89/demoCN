function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var channelsCtrl = {
	init: function(){
		var logoImage = getParameterByName('url_logo') || getParameterByName('b64_logo')
		var cardImage = getParameterByName('url_card') || getParameterByName('b64_card')
		var title = getParameterByName('title')
		var primaryColor = getParameterByName('primary_color') || 'purple'
		var accentColor = getParameterByName('accent_color') || 'pink'

		if(cardImage){
			$('#new_logo_card.mdl-card-wide > .mdl-card__title').css("background-image", "url("+cardImage+")")
		}

		if(logoImage){

		}

		if(title){
			$('#new_logo_card.mdl-card-wide .mdl-card__title-text').text(title)
		}

		$('head').append('<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.'+primaryColor+'-'+accentColor+'.min.css">');
	}
}

channelsCtrl.init();

/*
Colores permitidos:


red
pink
purple
deep-purple
indigo
blue
light-blue
cyan
teal
green
light-green
lime
yellow
amber
orange
deep-orange
brown
grey
blue-grey
*/