// homeController

import 'jquery'
import 'jqueryCycle'
//import 'bootstrap'
import templates from 'app/scripts/templates.js'
import validator from 'app/scripts/validator.js'
import data from 'app/scripts/data.js'
import notifier from 'app/scripts/notifier.js'

export default {
   all: function() {

		templates.load('home')
            .then(function(template) {	
				$('#main-content').html(template);		
            });
			
    $('#main-content').on('click', ['#multi-media a#left-multi-media', '#multi-media a#right-multi-media'], function() {
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
	

	$('#main-content #multi-media #media-slides').ready(function() {	
//		alert('Welcome');	// do not touch!!!
		
			$('#multi-media #media-slides').cycle({
					fx: 'fade',
	//				slideResize: true,
	//				containerResize: true,								
					fit: 1,		
					width: '90%',						
					timeout: 0,
					speed: 500,
					cleartypeNoBg: true,
					prev:   'a#left-multi-media',
					next:   'a#right-multi-media'
				});		  
	
	});
	
	}
}