import { loadGame, gameVariables, gameVariablesPic } from "./gamePatterns.js";

loadGame();

let counter = 0;
async function shuffle() {
  return new Promise((resolve) => {
    counter++;
    if (counter < 20) {
      setTimeout(shuffle, 100 + 10 * counter);
      shuffleCards(counter);
    } else {
      counter = 0;
    }
    setTimeout(() => {
      resolve(document.querySelector(".active").children[0].alt);
    }, 4000);
  });
}

function shuffleCards(sec) {
  const cardGroup = document.getElementById("slider").children;
  let randomCard = getRandomInt(0, 3);
  let activeCard = document.querySelector("div.active");
  let lastCard = document.querySelector("div.last");

  if (activeCard === cardGroup[randomCard]) {
    while (activeCard === cardGroup[randomCard]) {
      randomCard = getRandomInt(0, 3);
    }
  }
  if (lastCard) {
    lastCard.classList.remove("last");
  }
  activeCard.classList.add("last");
  activeCard.classList.remove("active");
  cardGroup[randomCard].style = `animation: slide ${
    0.3 + 0.01 * sec
  }s forwards`;
  activeCard.style = `animation: slideOut ${0.3 + 0.01 * sec}s forwards`;
  cardGroup[randomCard].classList.add("active");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const btns = document.querySelectorAll(".btn-player");
btns.forEach((choice) => choice.addEventListener("click", handlePlayerClick));

export async function handlePlayerClick() {
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.classList.remove("win");
  const chosenBtn = document.querySelector(".btn-success");
  chosenBtn ? chosenBtn.classList.remove("btn-success") : "";
  btns.forEach((btn) => {
    btn.setAttribute("disabled", "");
  });
  const playerChoice = this.id;
  this.classList.add("btn-success");
  const computerChoice = await shuffle();
  const result = await resultsCalculation(playerChoice, computerChoice);
  handleResultCardChange(computerChoice, this, result);
  resultAssemble(result);
  btns.forEach((btn) => {
    btn.removeAttribute("disabled", "");
  });
}

function handleResultCardChange(computerChoice, playerCard, option) {
  const computerChoiceCard = document.querySelector(".active").children[0];
  const computerCardIndex = gameVariables.indexOf(computerChoice);
  const playerCardIndex = gameVariables.indexOf(playerCard.id);

  if (option === 1) {
    playerCard.children[0].setAttribute(
      "src",
      gameVariablesPic[playerCardIndex].wrong
    );
    setTimeout(() => {
      playerCard.children[0].setAttribute(
        "src",
        gameVariablesPic[playerCardIndex].pic
      );
    }, 1000);
  } else if (option === 2) {
    computerChoiceCard.setAttribute(
      "src",
      gameVariablesPic[computerCardIndex].wrong
    );
    setTimeout(() => {
      computerChoiceCard.setAttribute(
        "src",
        gameVariablesPic[computerCardIndex].pic
      );
    }, 1000);
  }
}

function resultsCalculation(player1, player2) {
  if (player1 === player2) {
    return "tie";
  }
  const player1Index = gameVariables.indexOf(player1);
  const player2Index = gameVariables.indexOf(player2);
  if (player1Index === gameVariables.length - 1 && player2Index === 0) {
    return 1;
  } else if (player2Index === gameVariables.length - 1 && player1Index === 0) {
    return 2;
  }

  if (player1Index > player2Index) {
    return 2;
  } else {
    return 1;
  }
}

function resultAssemble(result) {
  const playerScore = document.getElementById("p-score");
  const computerScore = document.getElementById("cpu-score");
  const resultMessage = document.getElementById("resultMessage");

  if (result === 1) {
    computerScore.innerHTML++;
    resultMessage.innerText = "Computer Win!";
    resultMessage.classList.add("win");
  } else if (result === 2) {
    playerScore.innerHTML++;
    resultMessage.innerText = "Player win!";
    resultMessage.classList.add("win");
  } else {
    resultMessage.innerText = "Tie!";
  }
}

const resetBtn = document.getElementById("resetGame");
resetBtn.addEventListener("click", resetGame);
export function resetGame() {
  location.reload();
}
