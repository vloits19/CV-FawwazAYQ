// Game variables
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreElement = document.getElementById('score');

// Game state
let gameRunning = false;
let score = 0;
let frames = 0;

// Bird properties
const bird = {
    x: 50,
    y: canvas.height / 2 - 10,
    width: 34,
    height: 24,
    gravity: 0.25,
    velocity: 0,
    jump: -5,

    draw: function() {
        // Draw bird as a simple rectangle with a beak and eye
        ctx.fillStyle = '#FFD700'; // Yellow body
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw beak
        ctx.fillStyle = '#FF8C00'; // Orange beak
        ctx.fillRect(this.x + 34, this.y + 10, 10, 5);
        
        // Draw eye
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 25, this.y + 8, 3, 3);
    },

    update: function() {
        if (gameRunning) {
            // Apply gravity
            this.velocity += this.gravity;
            this.y += this.velocity;

            // Floor collision
            if (this.y + this.height >= canvas.height - ground.height) {
                this.y = canvas.height - ground.height - this.height;
                gameOver();
            }

            // Ceiling collision
            if (this.y <= 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }
    },

    flap: function() {
        this.velocity = this.jump;
    },

    reset: function() {
        this.y = canvas.height / 2 - 10;
        this.velocity = 0;
    }
};

// Pipes
const pipes = {
    position: [],
    gap: 150,
    maxYPos: -150,
    dx: 2,

    draw: function() {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            
            // Top pipe
            ctx.fillStyle = '#00A000'; // Green
            ctx.fillRect(p.x, p.y, p.width, p.height);

            // Bottom pipe
            ctx.fillStyle = '#00A000'; // Green
            ctx.fillRect(p.x, p.y + p.height + this.gap, p.width, canvas.height);
            
            // Pipe caps
            ctx.fillStyle = '#008000'; // Darker green
            ctx.fillRect(p.x - 3, p.y + p.height - 15, p.width + 6, 15);
            ctx.fillRect(p.x - 3, p.y + p.height + this.gap, p.width + 6, 15);
        }
    },

    update: function() {
        if (gameRunning) {
            if (frames % 100 === 0) {
                this.position.push({
                    x: canvas.width,
                    y: this.maxYPos * (Math.random() + 1),
                    width: 60,
                    height: 300
                });
            }

            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];

                // Move pipe to the left
                p.x -= this.dx;

                // If pipe is off screen, remove it and add score
                if (p.x + p.width <= 0) {
                    this.position.shift();
                    score++;
                    scoreElement.innerHTML = score;
                }

                // Collision detection
                const birdRight = bird.x + bird.width;
                const pipeLeft = p.x;
                const pipeRight = p.x + p.width;
                const birdBottom = bird.y + bird.height;
                
                // Check if bird is within the pipe's x range
                if (birdRight > pipeLeft && bird.x < pipeRight) {
                    // Check if bird hits top or bottom pipe
                    if (bird.y < p.height || birdBottom > p.height + this.gap) {
                        gameOver();
                    }
                    
                    // Check if bird passed the pipe
                    else if (bird.x === pipeLeft) {
                        score++;
                        scoreElement.innerHTML = score;
                    }
                }
            }
        }
    },

    reset: function() {
        this.position = [];
    }
};

// Ground
const ground = {
    height: 80,
    draw: function() {
        ctx.fillStyle = '#DEB887'; // Tan color
        ctx.fillRect(0, canvas.height - this.height, canvas.width, this.height);
        
        // Draw grass on top
        ctx.fillStyle = '#7CFC00'; // Lawn green
        ctx.fillRect(0, canvas.height - this.height, canvas.width, 15);
    }
};

// Background elements
const background = {
    draw: function() {
        // Draw sky
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw clouds
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(100, 80, 20, 0, Math.PI * 2);
        ctx.arc(130, 80, 25, 0, Math.PI * 2);
        ctx.arc(160, 80, 20, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(300, 120, 20, 0, Math.PI * 2);
        ctx.arc(330, 120, 25, 0, Math.PI * 2);
        ctx.arc(360, 120, 20, 0, Math.PI * 2);
        ctx.fill();
    }
};

// Draw everything
function draw() {
    background.draw();
    pipes.draw();
    ground.draw();
    bird.draw();
}

// Update game state
function update() {
    bird.update();
    pipes.update();
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    update();
    draw();
    
    frames++;
    
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Start game
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gameLoop();
    }
}

// Game over
function gameOver() {
    gameRunning = false;
    alert(`Game Over! Your score: ${score}`);
}

// Reset game
function resetGame() {
    gameRunning = false;
    score = 0;
    frames = 0;
    scoreElement.innerHTML = score;
    bird.reset();
    pipes.reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(); // Draw the initial state
}

// Event listeners
startBtn.addEventListener('click', function() {
    if (!gameRunning) {
        startGame();
    }
});

resetBtn.addEventListener('click', resetGame);

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (gameRunning) {
            bird.flap();
        } else {
            startGame();
        }
    }
});

canvas.addEventListener('click', function() {
    if (gameRunning) {
        bird.flap();
    } else {
        startGame();
    }
});

// Initialize the game
draw();