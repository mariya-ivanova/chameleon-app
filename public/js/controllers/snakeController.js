// snakeController

import 'jquery'
import 'jqueryCycle'

import data from 'js/data.js' 
import templates from 'js/templates.js' 
import snake from 'js/snake.js'
//import usersController from 'js/controllers/usersController.js'

export default {
    all: function(sammy) {

        Promise.all([data.users.current(), templates.load('snake')])
            .then(function([data, template]) {			
				var temp = template(data);					
				$('#main').html(temp);	
					
			    $('#main').on('click', '#start', function() {	
					snake.all(data);
				});							
        });			
    }
}