var logoImage,cardImage,title,primaryColor,accentColor;

function loadData (evt) {
	if (evt.data && evt.data.url_card) {
		cardImage = evt.data.url_card
	}else if(evt.data && evt.data.b64_card){
		cardImage = evt.data.b64_card
	}else if(evt.data && evt.data.url_logo){
		logoImage = evt.data.b64_logo
	}else if(evt.data && evt.data.b64_logo){
		logoImage = evt.data.url_logo
	}else if(evt.data && evt.data.title){
		title = evt.data.title
	}else if(evt.data && evt.data.primary_color){
		primaryColor = evt.data.primary_color
	}else if(evt.data && evt.data.accent_color){
		accentColor = evt.data.accent_color
	}

	channelsCtrl.reload();
}

var channelsCtrl = {
	init: function(){
		if (window.addEventListener) {
			// For standards-compliant web browsers
			window.addEventListener("message", loadData, false);
		} else {
			window.attachEvent("onmessage", loadData);
		}
	},
	reload: function () {
		if(cardImage){
			$('#new_logo_card.mdl-card-wide > .mdl-card__title').css("background-image", "url("+cardImage+")")
		}

		if(logoImage){

		}

		if(title){
			$('#new_logo_card.mdl-card-wide .mdl-card__title-text').text(title)
		}

		if(primaryColor && accentColor){
			$('head').append('<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.'+primaryColor+'-'+accentColor+'.min.css">');
		}
	}
}

channelsCtrl.init();


/*
Colores permitidos:


red
pink
purple
deep_purple
indigo
blue
light_blue
cyan
teal
green
light_green
lime
yellow
amber
orange
deep_orange
brown
grey
blue_grey
*/