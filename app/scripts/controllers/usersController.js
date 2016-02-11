// usersController

import 'jquery'
import templates from 'app/scripts/templates.js'
import validator from 'app/scripts/validator.js'
import data from 'app/scripts/data.js'
import notifier from 'app/scripts/notifier.js'

export default {
    loginRegister: function(username, password) {
        templates.load('login-register')
            .then(function(templateHtml) {
                $('#main-content').html(templateHtml);							
            });

        $('#main-content').on('click', '#btn-register', function() {	
            var username = $('#input-username')[0].value,
                password = $('#input-password')[0].value;
				
            validator.lenght(username, 6, 30)
                .then(function(){
                   return data.users.register(username, password)
                })
                .then(function(data) {
                    notifier.success('User registered');
                })
                .catch(function(err) {
                    notifier.error(err);
                });
        });

        $('#main-content').on('click', '#btn-login', function() {		
            var username = $('#input-username')[0].value,
                password = $('#input-password')[0].value;
	
	/* dummy hack by Mimi */
	/* that's because catch function needs a promise */	
			return new Promise(function(resolve, reject) {		
				if (true) {
					resolve('OK');
				} else {
					reject('Login error!');
				}	 
			})			
                .then(function(){
                   return data.users.login(username, password);
                })						
			//	data.users.login(username, password)
	/*dummy hack by Mimi*/			
                .then(function() {
                    notifier.success('User logged in');
                    window.location = window.location.origin;
                })
                .catch(function(err) {			
                    notifier.error(err);
                });
        });
    },
	
    logout: function() {
	/* dummy hack by Mimi */
	/* that's because catch function needs a promise */	
			return new Promise(function(resolve, reject) {		
				if (true) {
					resolve('OK');
				} else {
					reject('Logout error!');
				}	 
			})			
            .then(function(){
                return data.users.logout();
            })			
			//	 data.users.logout()			
	/*dummy hack by Mimi*/	
            .then(function() {
                notifier.success('Logged out');
                window.location = window.location.origin;
            })		
            .catch(function(err) {
                notifier.error(err);
            });
    }
	
}