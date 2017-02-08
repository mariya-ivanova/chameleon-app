import 'jquery'
import cookie from 'js/cookie.js'

function encode(password) {
	return CryptoJS.SHA1(password).toString();		
}

var cookieName = 'sessionKey';
function setSessionKey(sessionKey) {
    cookie.set(cookieName, sessionKey, 10);
}

function getSessionKey() {
    return cookie.get(cookieName);
}

function removeSessionKey() {
    cookie.remove(cookieName);
}

const AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key'; //from Don4o;

export default {
    users: {
        register: function(username, password) {
            var authcode = encode(username + password);					
			var data = {
                    username: username,
                    passHash: authcode 
                };		
            return $.ajax({
                url: 'api/users/',
                type: 'post',
				contentType: 'application/json',
				data: JSON.stringify(data)
            })
        },
        login: function(username, password) {
            var authcode = encode(username + password);		
	
			var data = {
                    username: username,	
                    passHash: authcode 		
                };
				
            var headers: {
                    'X-SessionKey': getSessionKey;
                }	
			// added by mimi
			
            return $.ajax({
                url: 'api/auth/',
                type: 'put',
				headers: headers, //added by mimi				
				contentType: 'application/json',
				data: JSON.stringify(data)
            })
            .then(function(data) {
				setSessionKey(data.result.username);
				localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, data.result.authKey);	//from Don4o			
                return data.result.username;
            });

        },
        logout: function() {
		/*
            return $.ajax({
                url: 'api/users/',
                type: 'put',
				contentType: 'application/json',
                headers: {
                    'X-SessionKey': getSessionKey()
                }
            })
            .then(function() {
                return removeSessionKey();
            })
			*/
			
			/* mimi */
			var promise = new Promise(function(resolve, reject) {
				removeSessionKey(); 
				localStorage.removeItem(AUTH_KEY_LOCAL_STORAGE_KEY); //from Don4o
			  resolve();
			});
			return promise;
			/* mimi */
        },
        current: function() {
			var sessionKey = getSessionKey();
			return sessionKey;
        }
    },
	
	games: {
        all: function() {
            return $.ajax({
                url: 'api/games/',
                type: 'get',
				contentType: 'application/json',
            });
        },
        id: function() {
            return $.ajax({
                url: 'api/games/:id',
                type: 'get',
				contentType: 'application/json',
            });
        },
    //    recordScore: function(userId, points) {		
        recordScore: function(points) {	
			var userId = localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY);	//from Don4o			
			var userName = getSessionKey() || 'anonimous';	
			var data = {	
                    userName: userName,
                    points: points 
                };	
			var headers = { 'x-auth-key': userId }; // added by mimi		
		//	console.log(headers);
            return $.ajax({
                url: 'api/games/',
                type: 'post',
				contentType: 'application/json',
				headers: headers, //added by mimi
				data: JSON.stringify(data)
            })
        },		
	}

}