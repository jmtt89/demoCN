var elements = [
	{label:'Email ', type:'email', value:'username@mail.com'},
	{label:'Password ', type:'password', value:'demoPassword'},
	{label:'Phone Number ', type:'tel', value:'+581427894163'},
]

function makeFormElement (label,type,id,value){
	return $('<div>').addClass('mdl-textfield mdl-js-textfield mdl-textfield--floating-label').append(
		$('<input>').addClass('mdl-textfield__input').attr('type',type).attr('id',id).attr('value',value),
		$('<label>').addClass('mdl-textfield__label').attr('for',id).text(label)
	)
}

var logoImage,cardImage,title,primaryColor,accentColor,compSelected,components = [];

function loadData (evt) {
	if (evt.data && evt.data.url_card) {
		cardImage = evt.data.url_card
	}else if(evt.data && evt.data.b64_card){
		cardImage = evt.data.b64_card
	}

	if(evt.data && evt.data.url_logo){
		logoImage = evt.data.url_logo
	}else if(evt.data && evt.data.b64_logo){
		logoImage = evt.data.b64_logo
	}

	if(evt.data && evt.data.title){
		title = evt.data.title
	}

	if(evt.data && evt.data.primary_color){
		primaryColor = evt.data.primary_color
	}

	if(evt.data && evt.data.accent_color){
		accentColor = evt.data.accent_color
	}

	if(evt.data && evt.data.elements){
		elements = evt.data.elements;
	}

	registerCtrl.reload();
}

var registerCtrl = {
	init: function(){

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			$('#profileEditor').append(makeFormElement(element.label, element.type, 'profileEditor-'+i, element.value));
		};
		componentHandler.upgradeElements($('.mdl-textfield').get());

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

		if(elements){
			$('#profileEditor').empty();
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				$('#profileEditor').append(makeFormElement(element.label, element.type, 'profileEditor-'+i, element.value));
			};
			componentHandler.upgradeElements($('.mdl-textfield').get());
		}
	}
}

registerCtrl.init();