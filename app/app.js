//import 'sammy'
import Sammy from 'sammy'
import 'jquery'
import 'jqueryCycle'
//import 'bootstrap'
import Handlebars from 'handlebars'
import data from 'app/scripts/data.js'
import templates from 'app/scripts/templates.js'
import notifier from 'app/scripts/notifier.js'
import usersController from 'app/scripts/controllers/usersController.js' 
import homeController from 'app/scripts/controllers/homeController.js' 
import snakeController from 'app/scripts/controllers/snakeController.js' 
import blogController from 'app/scripts/controllers/blogController.js' 

var containerId = '#main-content',
    $container = $(containerId);

var sammyApp = Sammy(containerId, function() {
    this.get('#/', function() {
        this.redirect('#/home')
    });

    this.get('#', function() {
        this.redirect('#/home')
    });	
	
	this.get('#/home', homeController.all);
    this.get('#/loginRegister', usersController.loginRegister);	
/*    this.get('#/register', usersController.register); */
/*    this.get('#/login', usersController.login); */
    this.get('#/logout', usersController.logout);	
	this.get('#/snake', snakeController.all);	
	this.get('#/blog', blogController.all);	
	
    Promise.all([data.users.current(), templates.load('main-navbar')])
        .then(function(results) {
			var template = results[1],			
                html = template(results[0]);
				$('#wrapper header').append(html);
        });

    templates.load('footer')
		.then(function(template) {					
			$('#wrapper').append(template);		
		});		
	
});

sammyApp.run('#/');