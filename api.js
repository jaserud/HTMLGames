
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

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		drawPaddle();
		
		if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}
		if(x + dx > canvas.width-ballRadius) {
			alert("you win");
			document.location.reload();
			clearInterval(interval); // Needed for Chrome to end game
		}
		else if( x + dx < ballRadius) {
			alert("AI win");
			document.location.reload();
			clearInterval(interval); // Needed for Chrome to end game		
		}
		// else if(y + dy > canvas.height-ballRadius) {
			// if(x > paddleY && x < paddleY + paddleWidth) {
				// dy = -dy;
			// }
			// else {
				// alert("GAME OVER");
				// document.location.reload();
				// clearInterval(interval); // Needed for Chrome to end game
			// }
		// }
		
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