// blogPostController

import 'jquery';
import 'jqueryCycle';
//import 'bootstrap'
import templates from 'app/scripts/templates.js';
import validator from 'app/scripts/validator.js';
import data from 'app/scripts/data.js';
import notifier from 'app/scripts/notifier.js';

export default {
   all: function() {

        Promise.all([data.users.current(), templates.load('blog-post')])
            .then(function([data, template]) {			
				var temp = template(data);					
				$('#main-content').html(temp);	
									
        });			
    }
}