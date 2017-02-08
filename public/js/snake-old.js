var canvas = document.getElementById("canvas-area"),
		ctx = canvas.getContext("2d"),
		result = document.getElementById("results"),
		startOver = document.getElementById("start"),
    	x = 50,
    	y = 50,
    	w = 20,
    	h = 20,
    	j = 10,
    	finalResult = 0,
    	speed = 1,
    	applesCount = false,
		directions = {
						"up": -1,
						"down": 1,
						"left": -1,
						"right": 1
					},
		currentDirection,
		snakeHead = new SnakeHead(x, y, w, h),
		headX = [],
		headY = [],
		appleX = [],
		appleY = [],
		list = $('<ul>'),	
		div = $('<div>'),
		eatSelf = false;
		
        div.id = 'list';		
		ctx.strokeStyle = "#f80";
		ctx.fillStyle = "#80ee00";
		ctx.lineWidth = 2;		
        ctx.fillRect(snakeHead.x, snakeHead.y, w, h);
        ctx.strokeRect(snakeHead.x, snakeHead.y, w, h);			
		
	function play(){
		$('#start').hide();
		$('#list').hide();
		
		var headCenterX,
			headCenterY,
			appleCenterX,
			appleCenterY,
			distance;

		ctx.strokeStyle = "#f80";
		ctx.fillStyle = "#80ee00";
		ctx.lineWidth = 2;
   		ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(snakeHead.x, snakeHead.y, w, h);
        ctx.strokeRect(snakeHead.x, snakeHead.y, w, h);
		extendSnake(j);
	//	extendSnake(20);

        if (applesCount === false){
        	appleX.pop();
        	appleY.pop();
			appleX.push(Math.random()*(canvas.width - w - 10));
			appleY.push(Math.random()*(canvas.height - h - 10));
        	drawApple(appleX[0], appleY[0], 20, 20);
        //	applesCount = 1;
			applesCount = true;
        }

		if (applesCount) {
//        if (applesCount === 1) {
        	drawApple(appleX[0], appleY[0], 20, 20);
        }

        if (!currentDirection){
        	currentDirection = 'right';
        }
	
		switchDirection (currentDirection);	
		
		headCenterX = snakeHead.x + w/2;
		headCenterY = snakeHead.y + h/2;
		appleCenterX = appleX[0] + w/2;
		appleCenterY = appleY[0] + h/2;
		distance = Math.sqrt(Math.pow((headCenterX - appleCenterX), 2) + Math.pow((headCenterY - appleCenterY), 2));

//        if (distance < Math.sqrt(2)*(w/2+h/2)){
        if (distance < Math.sqrt(w*w+h*h)){
        	j += 5;
        	applesCount = false;
        	finalResult += 10;
        }

//        eatSelfCheck();

        // GAME OVER CONDITIONS AND ACTIONS
        if ((snakeHead.x + w) >= canvas.width || (snakeHead.x <= 0) || eatSelf 
			|| (snakeHead.y + h) >= canvas.height || (snakeHead.y <= 0)) {
				addToLocalStorage(finalResult);
				$('#start').show();
				displayHighscores();
				return result.innerHTML += "<br />GAME OVER";
        }
        
        speed = Math.floor(finalResult/100) + 2;

        headX.push(snakeHead.x);
        headY.push(snakeHead.y);

        result.innerHTML = finalResult + " points";
		
		requestAnimationFrame(play);
	}

//	play();

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
		ctx.strokeStyle = "#80ee00";
		ctx.fillStyle = "#f20";
		ctx.fillRect(x, y, w, h);
		ctx.strokeRect(x, y, w, h);
		ctx.restore();
	}
	
	function addToLocalStorage(finalResult) {
	    var score = finalResult,
	    	name = prompt('Please enter your name');

	    localStorage.setItem(!!name ? name : '[anonymous]', score);
	}

    function displayHighscores() {

        var highScores = sortHighscores(),
			scoresList = generateList(highScores, list);		

    //    div.style.cssText = "position: absolute; top: 150px; left: 635px";
		div.append(scoresList);
	//	div.innerHTML = scoresList;	
		$('#snake').append(div);
		div.show();	
		
    }

    function sortHighscores() {
        var highScores = [],
        item;

		for (item in localStorage) {
            if(!isNaN(localStorage[item])){
            	highScores.push({ name: item, score: localStorage[item]*1});	
            }
        }

        highScores.sort(function (x, y) {
            return y.score - x.score;
        });

        return highScores;
    }

    function generateList(items, list) {		
		listItem = '';
		list.empty();
	
        if (items.length > 5) {
        	topFive = items.splice(0, 5);
        } 
		else {
        	topFive = items;
        }

        for (i = 0, len = topFive.length; i < len; i += 1) {
			listItem = $('<li>');
			var itemText = topFive[i].name + ' ' + topFive[i].score;
			listItem.append(itemText);
			list.append(listItem);					
        }		
	//	console.log(list);		
		return list;
	}		

    function docReady(){
        window.addEventListener('keydown', controls);
    	x = 50;
    	y = 50;
    	w = 20;
    	h = 20;
    	j = 10;
    	finalResult = 0;
    	speed = 1;
    	applesCount = false;
		snakeHead = new SnakeHead(x, y, w, h);
		currentDirection = 'right';		
		headX = [];
		headY = [];
		appleX = [];
		appleY = [];
		eatSelf = false;		
		play();
    }