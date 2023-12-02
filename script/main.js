document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  document.body.appendChild(canvas);

  const mazeImage = new Image();
  mazeImage.src = "maze_level-1.png";

  const dragonImages = {
    up: new Image(),
    down: new Image(),
    left: new Image(),
    right: new Image(),
  };
  mazeImage.src = "img/maze_level-1.png";
  mazeImage.width = 600;
  mazeImage.height = 600;
  dragonImages.up.src = "./img/dragon_walksStr.gif";
  dragonImages.down.src = "./img/dragon_walksStr.gif";
  dragonImages.left.src = "./img/dragon_walksL.gif";
  dragonImages.right.src = "./img/dragon_walksR.gif";

  const dragon = {
    x: 50,
    y: 50,
    direction: "up",
    speed: 5,
  };

  const teleport = {
    x: 400,
    y: 400,
  };

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(mazeImage, 0, 0, canvas.width, canvas.height);

    // Draw dragon
    context.drawImage(
      dragonImages[dragon.direction],
      dragon.x,
      dragon.y,
      50,
      50
    );

    // Draw teleport
    context.fillStyle = "blue";
    context.fillRect(teleport.x, teleport.y, 30, 30);
  }

  function update() {
    // Update dragon's position based on the direction
    if (dragon.direction === "up") {
      dragon.y -= dragon.speed;
    } else if (dragon.direction === "down") {
      dragon.y += dragon.speed;
    } else if (dragon.direction === "left") {
      dragon.x -= dragon.speed;
    } else if (dragon.direction === "right") {
      dragon.x += dragon.speed;
    }

    // Check for collision with teleport
    if (
      dragon.x < teleport.x + 30 &&
      dragon.x + 50 > teleport.x &&
      dragon.y < teleport.y + 30 &&
      dragon.y + 50 > teleport.y
    ) {
      alert("Congratulations! You've reached the teleport. Level completed!");
      resetGame();
    }

    // Check for collision with maze boundaries
    if (dragon.x < 0) dragon.x = 0;
    if (dragon.x > canvas.width - 50) dragon.x = canvas.width - 50;
    if (dragon.y < 0) dragon.y = 0;
    if (dragon.y > canvas.height - 50) dragon.y = canvas.height - 50;

    draw();
  }

  function resetGame() {
    dragon.x = 50;
    dragon.y = 50;
    dragon.direction = "up";
  }

  // Handle keyboard input
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      dragon.direction = "up";
    } else if (event.key === "ArrowDown") {
      dragon.direction = "down";
    } else if (event.key === "ArrowLeft") {
      dragon.direction = "left";
    } else if (event.key === "ArrowRight") {
      dragon.direction = "right";
    }
  });

  // Start the game loop
  function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
  }

  // Start the game when the page is loaded
  mazeImage.onload = function () {
    canvas.width = mazeImage.width;
    canvas.height = mazeImage.height;
    gameLoop();
  };
});
