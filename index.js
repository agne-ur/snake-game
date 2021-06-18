const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();
scoreDisplay.textContent = score;
currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApples();
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function endGame() {
  clearInterval(timerId);
  alert(`Great job! Your score is ${score} 🐍`);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return endGame();

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("apple")) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove("apple");
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake");
    //grow our snake array
    currentSnake.push(tail);
    //generate new apple
    generateApples();
    //add one to the score
    score++;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * 0.9;
    timerId = setInterval(move, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));

  squares[appleIndex].classList.add("apple");
}

generateApples();

function control(e) {
  if (e.key === "ArrowRight") {
    direction = 1;
  } else if (e.key === "ArrowUp") {
    direction = -width;
  } else if (e.key === "ArrowLeft") {
    direction = -1;
  } else if (e.key === "ArrowDown") {
    direction = width;
  }
}

document.addEventListener("keyup", control);
startButton.addEventListener("mousedown", startGame);
