// blogPostController

import 'jquery'
import data from 'js/data.js'
import templates from 'js/templates.js'
import notifier from 'js/notifier.js'


export default {
   all: function() {

        Promise.all([data.users.current(), templates.load('blog-post')])
            .then(function([data, template]) {			
				var temp = template(data);					
				$('#main').html(temp);	
									
        });			
    }
}