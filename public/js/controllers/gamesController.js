import 'jquery'
import data from 'js/data.js'
import templates from 'js/templates.js'
import notifier from 'js/notifier.js'
	
export default {
    all: function(sammy) {
		
        Promise.all([data.games.all(), templates.load('games')])
            .then(function([data, template]) {
				console.log('Mimi');
                $('#main').html(template({
                        games: data['result']
                    }
                ));
				console.log(data['result']);			
            });
	
    }
}