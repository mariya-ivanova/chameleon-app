import 'jquery'
import data from 'js/data.js'
import templates from 'js/templates.js'
import notifier from 'js/notifier.js'

export default {
    all: function(sammy) {
	
        Promise.all([data.users.current(), templates.load('snake')])
            .then(function([data, template]) {
					var temp = template(data);
					
			//	$('#main').append(temp);
				$('#main').html(temp);				
			/*	
                $('#main').html(template({
                    //    scores: data['result']
					scores: data
                    }
                ));
			*/
            });
			
	/*		
	Promise.all([data.users.current(), templates.load('snake')])
		.then(function(results) {

			var template = results[1],
				html = template(results[0]);
				console.log(html);
			$('#main').append(html);			
		});				
	*/
    }
}