const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector(".reset");
let turn = "X";
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];

boxes.forEach((box) => {
  box.addEventListener("click", handleTurn);
});

function handleTurn() {
  if (!isBoxEmpty(this)) return;

  this.innerText = turn;
  this.disabled = true;

  if (checkWin()) {
    announceWinner(turn);
    return;
  }

  if (checkTie()) {
    displayMessage("It's a tie!");
    setTimeout(() => {
      resetGame();
      clearMessage();
    }, 2000);
    return;
  }

  toggleTurn();
}

function isBoxEmpty(box) {
  return box.innerText === "";
}

function toggleTurn() {
  turn = turn === "X" ? "O" : "X";
}

function checkWin() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return Array.from(boxes).every((box) => box.innerText !== "");
}

function announceWinner(winner) {
  displayMessage(`${winner} wins!`);
  setTimeout(() => {
    resetGame();
    clearMessage();
  }, 2000);
}

function displayMessage(message) {
  const messageArea = document.querySelector(".message");
  messageArea.innerHTML = message;
}

function clearMessage() {
  const messageArea = document.querySelector(".message");
  messageArea.innerHTML = "";
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turn = "X";
  clearMessage();
}

resetButton.addEventListener("click", resetGame);
