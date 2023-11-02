const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
    dx: 5,
    dy: 5,
};

let bounceCount = 0;

function drawBallWithPattern() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    patternCanvas.width = 20;
    patternCanvas.height = 20;

    patternCtx.fillStyle = 'white';
    patternCtx.fillRect(0, 0, 20, 20);
    
    patternCtx.fillStyle = 'black';
    patternCtx.beginPath();
    patternCtx.moveTo(10, 0);
    for (let i = 1; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        const x = 10 + 10 * Math.sin(angle);
        const y = 10 - 10 * Math.cos(angle);
        patternCtx.lineTo(x, y);
    }
    patternCtx.closePath();
    patternCtx.fill();
    

    const ballPattern = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillStyle = ballPattern;

    ctx.fill();
    ctx.closePath();
}

function moveBallTo(x, y) {
    ball.x = x;
    ball.y = y;
}

function handleMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    moveBallTo(mouseX, mouseY);
    bounceCount++;
}

function resetGame() {
    bounceCount = 0;
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
        bounceCount++;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        bounceCount++;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBallWithPattern();

    ctx.font = '20px Arial';
    ctx.fillStyle = 'lightgray'; 
    ctx.fillText('Bounce Count: ' + bounceCount, 10, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', handleMouseClick);
resetButton.addEventListener('click', resetGame);

gameLoop();
