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
var headerProfile = {
	enable 	: false,
	image 	: false,
	align	: 'center',
	color 	: 'white'
}

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

	if(evt.data && evt.data.headerProfile.enable){
		headerProfile.enable = evt.data.headerProfile.enable;
	}else{
		headerProfile.enable = false;
	}

	if(evt.data && evt.data.headerProfile.image){
		headerProfile.image = evt.data.headerProfile.image;
	}else{
		headerProfile.image = false;
	}

	if(evt.data && evt.data.headerProfile.align){
		headerProfile.align = evt.data.headerProfile.align;
	}

	if(evt.data && evt.data.headerProfile.color){
		headerProfile.color = evt.data.headerProfile.color;
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
			$('#cardBG').attr("src", cardImage)
		}

		if(logoImage){
			$('#logoIcon').attr("src", logoImage)
		}

		if(title){
			$('#title').text(title)
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

		if(headerProfile.enable){
			$('#headerStyle_1').show();
		}else{
			$('#headerStyle_1').hide();
		}

		if(headerProfile.image){
			$('.profileImage').show();
			$('.extraInfo').removeClass('noImage');
		}else{
			$('.profileImage').hide();
			$('.extraInfo').addClass('noImage');
		}

		if(headerProfile.align){
			$('.profileHeader').removeClass('left center right');
			$('.profileHeader').addClass(headerProfile.align);
		}

		if(headerProfile.color){
			$('.extraInfo').removeClass('black white');
			$('.extraInfo').addClass(headerProfile.color);
		}


	}
}

registerCtrl.init();