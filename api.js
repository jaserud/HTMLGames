
	function keyDownHandler(e) {
		if(e.key == "Up" || e.key == "ArrowUp") {
			upPressed = true;
		}
		else if(e.key == "Down" || e.key == "ArrowDown") {
			downPressed = true;
		}
	}

	function keyUpHandler(e) {
		if(e.key == "Up" || e.key == "ArrowUp") {
			upPressed = false;
		}
		else if(e.key == "Down" || e.key == "ArrowDown") {
			downPressed = false;
		}
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(0, paddleY , paddleWidth, paddleHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	
	function drawAIPaddle() {
		ctx.beginPath();
		ctx.rect(canvas.width-paddleWidth , aiPaddleY , paddleWidth, paddleHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	
	}
	
	function drawScores(){
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("User Score: " + userScore, 8, 20);
		ctx.fillText("AI Score: " + aiScore, 120, 20);
	}
	
	function reset(){
		x = canvas.width/2;
		y = canvas.height/2;
		dx = -dx;
		dy = -dy;
		paddleY = (canvas.height-paddleHeight)/2;
		aiPaddleY = (canvas.height-paddleHeight)/2;
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		drawPaddle();
		drawAIPaddle();
		drawScores();
		
		if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}
		if(x + dx > canvas.width-ballRadius) {
			if ( y > aiPaddleY && y < aiPaddleY + paddleHeight) {				
				if ((dy > 0 && y < aiPaddleY + paddleHeight / 2) || (dy < 0 && y > aiPaddleY + paddleHeight / 2)){
					dy = -dy;
				}			
				dx = -dx;
			} else {
				userScore = userScore + 1;
				if (userScore < 3) {
					reset();
				} else {
					alert("You win");
					document.location.reload();
					clearInterval(interval); // Needed for Chrome to end game
				}
			}
		}
		else if( x + dx < ballRadius) {
			if ( y > paddleY && y < paddleY + paddleHeight) {				
				if ((dy > 0 && y < paddleY + paddleHeight / 2) || (dy < 0 && y > paddleY + paddleHeight / 2)){
					dy = -dy;
				}			
				dx = -dx;
			} else {	
				aiScore = aiScore + 1;
				if (aiScore < 3) {
					reset();
				} else {
					alert("AI wins");
					document.location.reload();
					clearInterval(interval); // Needed for Chrome to end game
				}
			}
		}
		
		if(dy < 0 && dx > 0 && aiPaddleY > 0) {
			aiPaddleY -= 3;
		} else if (dy > 0 && dx > 0 && aiPaddleY < canvas.height-paddleHeight){
			aiPaddleY += 3;
		}
		
		if(upPressed && paddleY > 0) {
			paddleY -= 7;
		}
		else if(downPressed && paddleY < canvas.height-paddleHeight) {
			paddleY += 7;
		}
		
		x += dx;
		y += dy;
		requestAnimationFrame(draw);
	}