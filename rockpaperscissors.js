const readline = require('readline');
const hand = ['rock', 'paper', 'scissors'];

let humanScore = 0;
let computerScore = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getComputerChoice = () => {
  const computerChoice = Math.floor((Math.random() * 3));
  return hand[computerChoice];
};

const getHumanChoice = () => {
  return new Promise((resolve) => {
    rl.question("Rock, Paper, or Scissors? ", function(choice) {
      choice = choice.toLowerCase();
      if (!hand.includes(choice)) {
        console.log("Invalid choice! Please enter Rock, Paper, or Scissors:");
        rl.question("Rock, Paper, or Scissors? ", function(choice2) {
          resolve(choice2.toLowerCase());
        });
      } else {
        resolve(choice);
      }
    });
  });
};

const playRound = (humanChoice, computerChoice) => {
  const human = humanChoice.toLowerCase();
  const computer = computerChoice;
  const youWin = `You win! ${human} beats ${computer}`;
  const youLose = `You lose! ${computer} beats ${human}`;

  if (human === computer) {
    return "It's a tie!";
  }

  if (
    (human === "rock" && computer === "scissors") ||
    (human === "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper")
  ) {
    humanScore++;
    return youWin;
  } else {
    computerScore++;
    return youLose;
  }
};

const playGame = async () => {
  let rounds = 3;
  for (let i = 1; i <= rounds; i++) {
    const humanChoice = await getHumanChoice();
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);
    console.log(`Round ${i}:`);
    console.log(`You chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);
    console.log(result);
    console.log(`Score - You: ${humanScore}, Computer: ${computerScore}\n`);
  }

  if (humanScore > computerScore) {
    console.log("You win the game!");
  } else if (humanScore < computerScore) {
    console.log("You lose the game!");
  } else {
    console.log("The game is a tie!");
  }
  rl.close();
};

playGame();