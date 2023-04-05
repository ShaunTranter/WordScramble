// Define an array of words to scramble
let store = ["javascript", "html", "css", "react", "angular", "vue"];
let words = store;

// Set the time limit (in seconds) and the initial score
const timeLimit = 10;
let score = 0;
let currentWord;

// Initialize the timer and the score counter
let timeLeft = timeLimit;
document.getElementById("timer").innerHTML = `Time left: ${timeLeft}s`;
document.getElementById("score").innerHTML = `Score: ${score}`;

// Define a function to start the game
function startGame() {
  // Select a random word from the array
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];

  // Scramble the selected word
  let scrambledWord = currentWord.split("").sort(() => 0.5 - Math.random()).join("");

  // Display the scrambled word on the page
  document.getElementById("scrambled-word").innerHTML = scrambledWord;

  // Reset the guess input and result message
  document.getElementById("guess").value = "";
  document.getElementById("result").innerHTML = "";

  // Update the number of words left to guess
  document.getElementById("words-left").innerHTML = `Words left to guess: ${words.length}`;
}

// Define an interval to update the timer every second
let timerInterval;
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerHTML = `Time left: ${timeLeft}s`;

    // End the game if the time runs out
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("result").innerHTML = `Game over! Your final score is ${score}.`;
      document.getElementById("submit").disabled = true;
      document.getElementById("reset").disabled = false;
    }
  }, 1000);
}

// Handle the start button click
document.getElementById("start").addEventListener("click", () => {
  startGame();
  startTimer();
  document.getElementById("start").disabled = true;
  document.getElementById("submit").disabled = false;

  document.getElementById("scrambled-word").style.display = "block";
});

// Handle the reset button click
document.getElementById("reset").addEventListener("click", () => {
  words = store;
  timeLeft = timeLimit;
  score = 0;
  startGame();
  document.getElementById("timer").innerHTML = `Time left: ${timeLeft}s`;
  document.getElementById("score").innerHTML = `Score: ${score}`;
  document.getElementById("words-left").innerHTML = `Words left to guess: ${words.length}`;
  document.getElementById("submit").disabled = false;
  document.getElementById("start").disabled = false;
  document.getElementById("reset").disabled = true;
  document.getElementById("result").innerHTML = "";
  clearInterval(timerInterval);

  document.getElementById("scrambled-word").style.display = "none";
});

// Check the user's guess when the submit button is clicked
document.getElementById("submit").addEventListener("click", () => {
  const guess = document.getElementById("guess").value.toLowerCase();
  const currentIndex = words.indexOf(currentWord);

  if (guess === currentWord) {
    // Increment the score and update the score display
    score++;
    document.getElementById("score").innerHTML = `Score: ${score}`;

    // Remove the guessed word from the array
    words.splice(currentIndex, 1);

    // Start a new game if there are still words left in the array
    if (words.length > 0) {
      startGame();
    } else {
      // End the game if all words have been guessed
      timeLeft = 1;
    }}else {
        document.getElementById("result").innerHTML = "Sorry, that's not correct. Please try again.";
      }
    
      // Update the number of words left to guess
      document.getElementById("words-left").innerHTML = `Words left to guess: ${words.length}`;
    });
