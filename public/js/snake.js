import 'jquery'

import data from 'js/data.js' 
import templates from 'js/templates.js' 

export default {
    all: function(username) {
		
		var canvas = document.getElementById('canvas-area'),
//		var canvas = $('#canvas-area'),
		ctx = canvas.getContext('2d'),
//		result = document.getElementById('results'),
		result = $('#results'),
//		startOver = document.getElementById('start'),
		startOver = $('#start'),		
    	x = 50,
    	y = 50,
    	w = 20,
    	h = 20,
    	j = 10,
    	finalResult = 0,
    	speed = 1,
    	applesCount = false,
		directions = {
						'up': -1,
						'down': 1,
						'left': -1,
						'right': 1
					},
		currentDirection = 'right',
		snakeHead = new SnakeHead(x, y, w, h),
		headX = [],
		headY = [],
		appleX = 0,
		appleY = 0,	
		div = $('#scores'),
		eatSelf = false;
		
        div.id = 'scores';				
		ctx.strokeStyle = 'gray';
		ctx.fillStyle = '#80ee00';
		ctx.lineWidth = 2;		
        ctx.fillRect(snakeHead.x, snakeHead.y, w, h);
        ctx.strokeRect(snakeHead.x, snakeHead.y, w, h);					
        window.addEventListener('keydown', controls);		
		
		play();

		function play(){
			$('#start').hide();
			$('#scores').hide();
			result.html('');
			
			var headCenterX,
				headCenterY,
				appleCenterX,
				appleCenterY,
				distance;

			ctx.strokeStyle = '#f80';
			ctx.fillStyle = '#80ee00';
			ctx.lineWidth = 2;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillRect(snakeHead.x, snakeHead.y, w, h);
			ctx.strokeRect(snakeHead.x, snakeHead.y, w, h);
			extendSnake(j);

			if (applesCount === false){
				appleX = Math.random()*(canvas.width - w - 10);
				appleY = Math.random()*(canvas.height - h - 10);				
				drawApple(appleX, appleY, 20, 20);				
				applesCount = true;
			}

			if (applesCount) {
				drawApple(appleX, appleY, 20, 20);				
			}

			if (!currentDirection){
				currentDirection = 'right';
			}
		
			switchDirection (currentDirection);	
			
			headCenterX = snakeHead.x + w/2;
			headCenterY = snakeHead.y + h/2;
			appleCenterX = appleX + w/2;
			appleCenterY = appleY + h/2;			
			distance = Math.sqrt(Math.pow((headCenterX - appleCenterX), 2) + Math.pow((headCenterY - appleCenterY), 2));

			if (distance < Math.sqrt(w*w+h*h)){
				j += 5;
				applesCount = false;
				finalResult += 10;
			}

			speed = Math.floor(finalResult/100) + 2;
			headX.push(snakeHead.x);
			headY.push(snakeHead.y);				
			
//        eatSelfCheck();

			// GAME OVER
			if ((snakeHead.x + w) >= canvas.width || (snakeHead.x <= 0) || eatSelf 
				|| (snakeHead.y + h) >= canvas.height || (snakeHead.y <= 0)) {
					
					data.games.recordScore(finalResult);						
					$('#start').show();				
					ctx.clearRect(0, 0, canvas.width, canvas.height);		

					Promise.all([data.games.all(), templates.load('games')])
						.then(function([data, template]) {									
							var pointsData = data['result'];
						//	console.log(data);								
							pointsData.sort(function (x, y) {
								return y.points - x.points;
							});		
								
							pointsData = pointsData.slice(0, 5);								
							
							$('#scores').html(template({
									games: pointsData
								}
							));
							
							$('#scores').show();							
										
						});
					
					return result.html('GAME OVER<br />' + finalResult + ' points');
			}
			
		//	speed = Math.floor(finalResult/100) + 2;	
			result.html(finalResult + ' points');	
			
			requestAnimationFrame(play);
		}

		function extendSnake(j){
			var i;
			for(i = j; i > 0; i -= 1){
				ctx.fillRect(headX[headX.length-i], headY[headY.length-i], w, h);
			}
		}

		function eatSelfCheck(){
			var k;
			for(k = 0; k < j; k += 1){
				if (snakeHead.x === headX[headX.length-k] && snakeHead.y === headY[headY.length-k]){
					eatSelf = true;
				}
			}
		}
	
		function switchDirection (currentDirection) {	
			switch(currentDirection){
					case 'left': snakeHead.x += directions['left']*speed; break;
					case 'right': snakeHead.x += directions['right']*speed; break;
					case 'up': snakeHead.y += directions['up']*speed; break;
					case 'down': snakeHead.y += directions['down']*speed; break;
			}
		}

		function controls(evt) {
			switch (evt.keyCode) {
				case 27:
					alert('Game paused, press Enter or OK to resume');
					break;
				case 37:
					currentDirection = 'left';
					break;
				case 39:
					currentDirection = 'right';
					break;
				case 38:
					currentDirection = 'up';
					break;
				case 40:
					currentDirection = 'down';
					break;
			}
		}

		function SnakeHead(x, y, w, h) {
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;
		}

		function drawApple(x, y, w, h) {
			ctx.save();
			ctx.strokeStyle = '#80ee00';
			ctx.fillStyle = '#f20';
			ctx.fillRect(x, y, w, h);
			ctx.strokeRect(x, y, w, h);
			ctx.restore();
		}
	
	}
}	