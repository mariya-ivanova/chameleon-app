// homeController

import 'jquery'
import 'jqueryCycle'
//import 'bootstrap'

import data from 'js/data.js' 
import templates from 'js/templates.js' 
//import usersController from 'js/controllers/usersController.js'
//import gamesController from 'js/controllers/gamesController.js'
//import snakeController from 'js/controllers/snakeController.js'

//import validator from 'app/scripts/validator.js'
//import notifier from 'app/scripts/notifier.js'
/*
var containerId = '#main',
    $container = $(containerId);
*/
var $container = $('#main');	

export default {
   all: function() {

		templates.load('home')
            .then(function(template) {	
		//		$('#main-content').html(template);	
				$container.html(template);
            });
	
		$('#main').on('click', ['#multi-media a#left-multi-media', '#multi-media a#right-multi-media'], function() {
			$('#multi-media #media-slides').cycle({
					fx: 'fade',
		//			slideResize: true,
					containerResize: true,
		//			width: '90%',
		//			height: '100%',
		//			fit: 1,
					timeout: 0,
					speed: 500,
					cleartypeNoBg: true,
					prev:   'a#left-multi-media',
					next:   'a#right-multi-media'
				});		
		});
	
	
	/*
		$container.load("#multi-media", function() {		
			var media = $('#multi-media #media-slides');
			console.log(media);

			var left = $('#multi-media #left-multi-media');
			console.log(left);	
			var right = $('#multi-media #right-multi-media');
			console.log(right);	
		

			$('#multi-media #media-slides').cycle({
					fx: 'fade',
		//			slideResize: true,
					containerResize: true,
		//			width: '90%',
		//			height: '100%',
		//			fit: 1,
					timeout: 0,
					speed: 500,
					cleartypeNoBg: true,
					prev:   'a#left-multi-media',
					next:   'a#right-multi-media'
			});		

		});
	*/
	
	}
}