import 'jquery'
import 'jqueryCycle'
import Handlebars from 'handlebars'

export default {
    load: function(name) {
        var url = 'app/scripts/templates/' + name + '.handlebars';

        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                success: function(data) {
                    resolve(Handlebars.compile(data));				
                },
                error: function(err) {
                    reject(err);				
                }
            })
        });
    }
}