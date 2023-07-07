const main = document.getElementById("main");

export const gameVariables = ["rock", "paper", "scissors"];
export const gameVariablesPic = [
  { name: "rock", pic: "./src/pic/rock.png" , wrong: "./src/pic/rock_block.png"},
  { name: "paper", pic: "./src/pic/paper.png" ,wrong: "./src/pic/paper_block.png"},
  { name: "scissors", pic: "./src/pic/scissor.png" ,wrong: "./src/pic/scissor_block.png"},
];

function div(id, classList, innerText) {
  const newDiv = document.createElement("div");
  //   newDiv.id = id;
  newDiv.classList = classList;
  // if (innerText){
  //     newDiv.innerText = innerText
  // }
  id ? (newDiv.id = id) : null;
  innerText ? (newDiv.innerText = innerText) : "";

  return newDiv;
}

function span(innerText, classList, id) {
  const newSpan = document.createElement("span");
  newSpan.innerText = innerText;
  newSpan.classList = classList;
  id ? (newSpan.id = id) : null;

  return newSpan;
}

export function loadGame() {
  const gamePattern = new div(
    "gamePattern",
    "container row justify-content-center mx-auto"
  );
  const welcomeText = new span(
    "Welcome to Rock, Paper, Scissors Game!",
    "text-center py-3 fs-1"
  );
  const scoreTable = new div(
    "ScoreTable",
    "row mx-auto justify-content-center"
  );

  const scoreTableResult = new span(" ", "text-center fs-2 mb-3", "txtResult");
  const scorePlayerDiv = new div(
    "playerScore",
    "col-sm-3 col-md-2 col-4 px-2 p-1 mx-2 border border-secondary rounded-pill  fs-5",
    "Player: "
  );
  const playerScore = new span("", "score fs-5 ps-4 text-center", "p-score");
  playerScore.innerText = 0;
  const scoreComputerDiv = new div(
    "computerScore",
    "col-sm-3 col-md-2 col-4 px-2 p-1 mx-2 border border-secondary rounded-pill fs-5",
    "Computer: "
  );
  const computerScore = new span(
    "",
    "score fs-5 ps-4 text-center",
    "cpu-score"
  );
  computerScore.innerText = 0;

  gamePattern.appendChild(welcomeText);
  gamePattern.appendChild(scoreTable).appendChild(scoreTableResult);
  scoreTable.appendChild(scorePlayerDiv).appendChild(playerScore);
  scoreTable.appendChild(scoreComputerDiv).appendChild(computerScore);

  main.append(gamePattern);

  computerGamePattern();
  resultGamePattern();
  playerGamePattern();
  resetGamePattern();
}

function computerGamePattern() {
  const computerPattern = new div(
    "computerPattern",
    "text-center mt-3 ",
    "Computer play:"
  );

  const computerChoice = new div(
    "computerChoice",
    "col rounded my-4 mx-auto border border-secondary cpuChoice"
  );

  const pcChoiceCarousel = new div("pcChoiceCarousel", "carousel slide");
  const innerSliderItems = new div("slider", "carousel-inner");

  for (let key of gameVariablesPic) {
    const card = new div(null, "carousel-item");
    card.innerHTML = `<img src="${key.pic}" class="d-block w-100 slide" alt="${key.name}">`;
    if (!innerSliderItems.hasChildNodes()) {
      card.classList.add("active");
      card.style = `animation: slide 0.5s forwards`;
    }
    innerSliderItems.appendChild(card);
  }

  pcChoiceCarousel.appendChild(innerSliderItems);
  computerChoice.appendChild(pcChoiceCarousel);
  computerPattern.appendChild(computerChoice);
  main.appendChild(computerPattern);
}

function playerGamePattern() {
  const playerPattern = new div(
    "playerPattern",
    "text-center mt-3 container",
    "player chose:"
  );

  const playerChoice = new div(
    "playerChoice",
    "row rounded my-4 mx-auto border border-secondary"
  );

  for (let key of gameVariablesPic) {
    const choice = new div(
      `p-${key.name}`,
      "col-4 rounded my-2 p-0 mx-auto border border-secondary playerChoice"
    );
    choice.innerHTML = `<button id="${key.name}" class="btn btn-player p-0 m-0"><img src="${key.pic}" class="w-100 h-100" alt="${key.name}" ></button>`;
    playerChoice.appendChild(choice);
  }
  playerPattern.appendChild(playerChoice);
  main.appendChild(playerPattern);
}

function resultGamePattern() {
  const resultPattern = new div("resultPattern", "text-center mt-3 row");
  const resultMessage = new div(
    "resultMessage",
    "text-center fs-3 mt-3 border border-secondary rounded-pill col-6 mx-auto py-2",
    "Chose Rock, Paper or Scissors to play"
  );

  resultPattern.appendChild(resultMessage);
  main.appendChild(resultPattern);
}

function resetGamePattern() {
  const resetPattern = new div(
    "",
    "row mx-auto justify-content-center text-center"
  );
  const newBtn = document.createElement("button");
  newBtn.classList = "btn btn-warning col-4 col-sm-3 col-md-2 col-l-1 my-5";
  newBtn.innerText = "Restart Game";
  newBtn.id = "resetGame";

  resetPattern.appendChild(newBtn);
  main.appendChild(resetPattern);
}
