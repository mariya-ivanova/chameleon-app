//import 'sammy'
import Sammy from 'sammy'
import 'jquery'
import data from 'js/data.js' 
import templates from 'js/templates.js' 
import usersController from 'js/controllers/usersController.js'
//import gamesController from 'js/controllers/gamesController.js'
import snakeController from 'js/controllers/snakeController.js'
import homeController from 'js/controllers/homeController.js'
import blogController from 'js/controllers/blogController.js'
import blogPostController from 'js/controllers/blogPostController.js'

var containerId = '#main';
var sammyApp = Sammy(containerId, function() {
    this.get('#/', function() {
        this.redirect('#/home');
    });

    this.get('#/home', homeController.all);		
    this.get('#/blog', blogController.all);
    this.get('#/blogPost', blogPostController.all);	
    this.get('#/register', usersController.register);
    this.get('#/login', usersController.login);
    this.get('#/logout', usersController.logout);
    this.get('#/snake', snakeController.all);	
    this.get('#/games', gamesController.all);	
		
    Promise.all([data.users.current(), templates.load('main-navbar')])
        .then(function(results) {
			var template = results[1],			
                html = template(results[0]);
	//			$('#wrapper header').append(html);
				$('#wrapper header').html(html);	
        });
	
    templates.load('footer')
		.then(function(template) {					
			$('#wrapper').append(template);		
		});		
	
});

sammyApp.run('#/');
