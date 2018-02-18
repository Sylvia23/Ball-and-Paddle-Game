// <!-- Sylvia Mittal
// IIT Mandi
// JavaScript Game - Ball and Paddle -->
var ball, paddle, brick, cw, ch, totalBricks;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
cw = canvas.width;
ch = canvas.height;
ball = {
	x:400,
	y:400,
	r:20,
	vx:1,
	vy:-1
}
ball.x = cw/2;
//ball.y = ch - paddle.h - ball.r;
brick = {
	x:10,
	y:10,
	w:100,
	h:15,
	gapBtwn:35,
	gapTop:80,
	gapLR:40,
	row:2,
	col:4
}
brick.w = (cw - (2*(brick.gapLR)) - (brick.col-1)*(brick.gapBtwn))/(brick.col); 
totalBricks = brick.row * brick.col;
paddle = {
	x:390,
	y:493,
	w:200,
	h:10
}
paddle.x = cw/2 - (paddle.w)/2;
paddle.y = ch - paddle.h;
ball.y = ch - paddle.h - ball.r;

document.addEventListener('keydown', function(e) {
	console.log(e.keyCode);
	//LEFT KEY
	if (e.keyCode == 37 && paddle.x>0) {
		paddle.x = paddle.x-3;
	}
	//RIGHT KEY
	else if (e.keyCode == 39 && paddle.x<cw-paddle.w) {
		paddle.x = paddle.x+3;
	}
})

	function drawball() {
	ctx.beginPath();
	ctx.fillStyle = 'red';
	//console.log(ball.x);
	ctx.arc (ball.x, ball.y, ball.r, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
}
//drawball();

function drawpaddle() {
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.rect (paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fill();
	ctx.closePath();
}
//drawpaddle();

function drawbrick() {
	ctx.beginPath();
	ctx.fillStyle = 'purple';
	ctx.rect (brick.x, brick.y, brick.w, brick.h);
	ctx.fill();
	ctx.closePath();	
}
//drawbrick();

var bricks = []
function drawbricks() {
	for (var r = 0; r < brick.row; r++) {
		bricks[r] = [];
		for (var c = 0; c < brick.col; c++) {
			bricks[r][c] = {x: 10, y: 10, w : brick.w, h : brick.h};
			bricks[r][c].x = (brick.gapLR + (c)*(brick.gapBtwn+brick.w));
			bricks[r][c].y = brick.gapTop + (r)*(brick.gapBtwn+brick.h);
			ctx.beginPath();
			ctx.fillStyle = 'grey';
			ctx.rect (bricks[r][c].x, bricks[r][c].y, brick.w, brick.h);
			ctx.fill();
			ctx.closePath();
		}
	}
}
//drawbricks();
//console.log(bricks);

function collisionDetection() {
	//LEFT/RIGHT wALLS AND bALL
	if (ball.x > cw - ball.r || ball.x < ball.r) {
		ball.vx = -ball.vx;
	} 
	else if (ball.y  < ball.r) {
		ball.vy = -ball.vy;
	}
	else if (ball.y > ch - ball.r) {
		//PADDLE AND bALL
		if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
			ball.vy = -ball.vy;
		}
		else {
			alert ("Game Over ! You are out.")
		}
	}
	ball.x = ball.x + ball.vx;
	ball.y = ball.y + ball.vy;
}

function initGame() {
	ctx.clearRect(0,0,cw,ch);
	//drawball();
	drawpaddle();
	drawbricks();
	drawball();
	collisionDetection();
	console.log('running');
}
//initGame();
	setInterval(initGame, 10);