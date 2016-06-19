/* Cada vez que se agregue un nuevo componente, debe agregarse aqui tambien el Nombre de este */
var componentMap = {
	'classicInbox'	:'Classic Inbox',
	'activityFeed'	:'Activity Feed',
	'nearby'		:'Nearby',
	'chatInbox'		:'Chat',
	'galleryInbox'	:'Gallery'
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



function fakeMessage (lang) {
	return {
		subject  : faker.lorem.words(),
		text     : faker.lorem.paragraph(),
		image 	 : faker.random.boolean() ? './images/'+getRandomInt(0,20)+'.jpeg' : null,
		date     : faker.date.recent(),
		language : lang || 'en_US'
	};
}

function itemGallery (lang){
	return {
		title 	: faker.lorem.words(),
		image 	: './images/'+getRandomInt(0,20)+'.jpeg',
		language : lang || 'en_US'
	}
}

function chatMessage (lang){
	var tmp = Math.random() > 0.8;
	return {
		response  : faker.random.boolean(),
		imageMsg	: tmp,
		content 	: tmp ? './images/'+getRandomInt(0,20)+'.jpeg' : faker.lorem.sentence(),
		date 			: faker.date.recent(),
		language 	: lang || 'en_US'
	}
}

var messages = [], numMessages = 20, gallery = [], numImages = 20, chats=[], numChats = 20;

/** 
****** DEMO DE Classic Inbox ********
<ul id="listMessages">
	<li class="mdl-list__item mdl-list__item--three-line">
	<span class="mdl-list__item-primary-content">
		<span>Aaron Paul</span>
		<span class="mdl-list__item-text-body">
		Aaron Paul played the role of Jesse in Breaking Bad. He also featured in
		the "Need For Speed" Movie.
		</span>
	</span>
	<span class="mdl-list__item-secondary-content">
		<span class="mdl-list__item-secondary-info">25 min</span>
	</span>
	</li>
</ul>

****** DEMO DE Activity Feed ********
<div id="activities">
	<div class="mdl-card mdl-shadow--8dp">
		<div class="mdl-card__title">
			<h2 class="mdl-card__title-text">title Text Goes Here</h2>
		</div>
		<div class="mdl-card__media">
			<img src="http://www.planwallpaper.com/static/images/i-should-buy-a-boat.jpg">
		</div>
		<div class="mdl-card__supporting-text">
			This text might describe the photo and provide further information, such as where and
			when it was taken.
		</div>
		<div class="mdl-card__actions mdl-card--border">
			<time class="timeago" datetime="Tue Jun 07 2016 13:20:40 GMT-0400 (VET)" title="7/6/2016 12:50:40">6 hours ago</time>
		</div>
	</div>
</div>
****** DEMO DE Nearby ********

****** DEMO DE Chat ********

<ol class="chat">
  <div class="day">Hoy</div>
  <li class="other">
      <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
    <div class="msg">
      <time><i class="material-icons">access_time</i> 20:17</time>
      <p>Hola!</p>
      <p>Te vienes a cenar al centro? <emoji class="pizza"/></p>
    </div>
  </li>
  <li class="self">
    <div class="avatar"></div>
    <div class="msg">
      <time><i class="material-icons">access_time</i> 20:18</time>
      <p>Puff...</p>
      <p>Aún estoy haciendo el contexto de Góngora...</p>
      <p>Mejor otro día</p>
    </div>
  </li>
  <li class="self">
    <div class="avatar"></div>
    <div class="msg">
      <time><i class="material-icons">access_time</i> 20:19</time>
      <img src="http://i.imgur.com/QAROObc.jpg" draggable="false"/>
    </div>
  </li>
</ol>
<input class="textarea" type="text" placeholder="Type here!"/>
<div class="send"><i class="material-icons">send</i></div>

****** DEMO DE Gallery ********

<div id="gallery">
	<div class="card-image mdl-card mdl-shadow--2dp">
	  <div class="mdl-card__title mdl-card--expand"></div>
	  <div class="mdl-card__actions">
	    <span class="card-image__title">Image.jpg</span>
	  </div>
	</div>
</div>

**/

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

	if(evt.data && evt.data.components){
		components = evt.data.components
	}

	if(evt.data && evt.data.compSelected){
		compSelected = evt.data.compSelected
	}else{
		compSelected = null
	}

	channelCtrl.reload();
}


var channelCtrl = {
	init: function(language){
		faker.locale = language || 'en_US';

		//Add Listeners
		if (window.addEventListener) {
			// For standards-compliant web browsers
			window.addEventListener("message", loadData, false);
		} else {
			window.attachEvent("onmessage", loadData);
		}

		$('.mdl-layout__tab-bar-container').scrollLeft()
		

		//Create Chats
		for(var i=0; i < numChats; i++) {
			chats.push(chatMessage(language))
		}

		//Sort Chats by Date
		chats.sort(function(a,b) { 
			return new Date(b.date).getTime() - new Date(a.date).getTime() 
		});

		//Create Gallery Images
		for(var i=0; i < numImages; i++) {
			gallery.push(itemGallery(language))
		}

		//Create a Messages
		for (var i = 0; i < numMessages; i++) {
			messages.push(fakeMessage(language));
		};

		//Sort Messages by Date
		messages.sort(function(a,b) { 
			return new Date(a.date).getTime() - new Date(b.date).getTime() 
		});

		//Call first Tab
		this.classicInbox.init(language);
		this.activityFeed.init(language);
		this.gallery.init(language);
		this.chat.init(language);
	},
	reload: function () {
		if(logoImage){
			$('#logoIcon').attr('src',logoImage)
			$('.avatar > img').attr('src',logoImage)
		}

		if(title){
			$('#title').text(title)
		}

		if(primaryColor && accentColor){
			$('head').append('<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.'+primaryColor+'-'+accentColor+'.min.css">');
		}

		if(components){
			var layout = document.querySelector('.mdl-js-layout');
			var tabbar = document.querySelector('.mdl-layout__tab-bar');

			while (tabbar && tabbar.firstChild) {
			  tabbar.removeChild(tabbar.firstChild);
			}
			if(tabbar && layout){
				window.setTimeout(function(){
					var someID;
					$.each( components, function( key, value ) {
						if(value){
							if(!someID){
								someID = key;
							}
						    var a = document.createElement('a');
						    a.href = '#'+key;
						    a.classList.add('mdl-layout__tab');
						    a.textContent = componentMap[key] || 'Other';
						    tabbar.appendChild(a);

							var tabs = document.querySelectorAll('.mdl-layout__tab');
							var panels = document.querySelectorAll('.mdl-layout__tab-panel');
							for (var i = 0; i < tabs.length; i++) {
								new MaterialLayoutTab(tabs[i], tabs, panels, layout.MaterialLayout);
							}
					    }
					});

					window.setTimeout(function(){
						if(compSelected){
							$('a[href="#'+compSelected+'"] span').click ();
						}else{
							$('a[href="#'+someID+'"] span').click ();
						}
					}, 200)
				}, 200);
			}
		}

	},
	classicInbox:{
		init: function (language) {
			//Show in Classic Inbox
			for (var i = messages.length - 1; i >= 0; i--) {
				var message = messages[i];
				$('#listMessages').append(
					$('<li>').addClass('mdl-list__item mdl-list__item--three-line').append(
						$('<span>').addClass('mdl-list__item-primary-content').append(
							$('<span>').addClass('title').text(message.subject),
							$('<span>').addClass('mdl-list__item-text-body').text(message.text)
						),
						$('<span>').addClass('mdl-list__item-secondary-content').append(
							$('<span>').addClass('mdl-list__item-secondary-info').append('<time class="timeago" datetime="'+new Date(message.date).toISOString()+'">'+new Date(message.date).toLocaleString()+'</time>')
						)
					)
				)
			}
		}
	},
	activityFeed:{
		init: function(language){
			for (var i = messages.length - 1; i >= 0; i--) {
				var message = messages[i];

				if(message.image){
					$('#activities').append(
						$('<div>').addClass('mdl-card mdl-shadow--8dp').append(
							$('<div>').addClass('mdl-card__title').append(
								$('<h3>').addClass('mdl-card__title-text').text(message.subject)
							),
							$('<div>').addClass('mdl-card__media').append(
								$('<img>').attr('src',message.image)
							),
							$('<div>').addClass('mdl-card__supporting-text').text(message.text),
							$('<div>').addClass('mdl-card__actions mdl-card--border').append('<time class="timeago" datetime="'+new Date(message.date).toISOString()+'">'+new Date(message.date).toLocaleString()+'</time>')
						)
					)
				}else{
					$('#activities').append(
						$('<div>').addClass('mdl-card mdl-shadow--8dp').append(
							$('<div>').addClass('mdl-card__title').append(
								$('<h3>').addClass('mdl-card__title-text').text(message.subject)
							),
							$('<div>').addClass('mdl-card__supporting-text').text(message.text),
							$('<div>').addClass('mdl-card__actions mdl-card--border').append('<time class="timeago" datetime="'+new Date(message.date).toISOString()+'">'+new Date(message.date).toLocaleString()+'</time>')
						)
					)
				}

			}
		}
	},
	nearby:{
		init: function(language){

		}
	},
	chat:{
		init: function(language){

			var profileImage = faker.image.avatar();


			var today = new Date();
			var first =false;

			for (var i = chats.length - 1; i >= 0; i--) {
				var chat = chats[i];

				if(!first && chat.date.getDate() == today.getDate() && chat.date.getMonth() == today.getMonth() && chat.date.getFullYear() == today.getFullYear()){
					$('#chats').append('<div class="day">Today</div>')
					first = true;
				}


				if(chat.response){
					$('#chats').append(
						$('<li>').addClass('other').append(
							$('<div>').addClass('avatar').append(
								$('<img>').attr('src',profileImage).attr('draggable','false')
							),
							$('<div>').addClass('msg').append(
								'<time class="timeago" datetime="'+new Date(chat.date).toISOString()+'"><i class="material-icons">access_time</i> '+new Date(chat.date).toLocaleString()+'</time>',
								chat.imageMsg ? '<img src="'+chat.content+'" />' : '<p>'+chat.content+'</p>'
							)
						)
					)
				}else{
					$('#chats').append(
						$('<li>').addClass('self').append(
							$('<div>').addClass('avatar'),
							$('<div>').addClass('msg').append(
								'<time class="timeago" datetime="'+new Date(chat.date).toISOString()+'"><i class="material-icons">access_time</i> '+new Date(chat.date).toLocaleString()+'</time>',
								chat.imageMsg ? '<img src="'+chat.content+'" />' : '<p>'+chat.content+'</p>'
							)
						)
					)
				}
			}

		}
	},
	gallery:{
		init: function(language){

			for (var i = gallery.length - 1; i >= 0; i--) {
				var item = gallery[i];

				$('#gallery').append(
					$('<div>').addClass('mdl-cell mdl-cell--2-col-phone mdl-cell--2-col-tablet mdl-cell--3-col-desktop').append(
						$('<div>').addClass('card-image mdl-card mdl-shadow--2dp').append(
							$('<div>').addClass('mdl-card__media').append(
								$('<img>').attr('src',item.image)
							),
							$('<div>').addClass('mdl-card__actions mdl-card--border').append(
								$('<span>').addClass('card-image__title').text(item.title)
							)
						)
					)
				)

			}


		}
	}
}


channelCtrl.init();