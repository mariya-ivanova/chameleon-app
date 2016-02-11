// snakeController

import 'jquery'
import 'jqueryCycle'
import templates from 'app/scripts/templates.js'
import validator from 'app/scripts/validator.js'
import data from 'app/scripts/data.js'
import notifier from 'app/scripts/notifier.js'
import snake from 'app/scripts/snake.js'

export default {
    all: function(sammy) {

        Promise.all([data.users.current(), templates.load('snake')])
            .then(function([data, template]) {			
				var temp = template(data);					
				$('#main-content').html(temp);	
					
			    $('#main-content').on('click', '#start', function() {	
					snake.all(data);
				});							
        });			
    }
}