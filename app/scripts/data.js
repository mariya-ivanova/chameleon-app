Parse.initialize("jIN95PJ1g1esCKU32Dx7DxFfk9uO6YNSKCJgwAFp", "6kdX58OaWbiZmpxqDOkb5E3jsRG7DiGWFcu3PyJv");

export default {
    users: {
        login: function(username, password) {
		//	username = 'mimito';
		//	password = '123456';
            return Parse.User.logIn(username, password);
        },
        logout: function() {
			Parse.User.logOut( ); 
        //    return Parse.User.logOut();
        },
        register: function(username, password) {
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);

            return user.signUp();
        },
        current: function() {
            return new Promise(function(resolve, reject) {
                var user = Parse.User.current();
                resolve(user? user.get('username') : undefined);
            });
        },
    }
}