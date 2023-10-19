// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let userInput = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
      
		 if (oldPointStructure[pointValue].includes(word[i])) {
			//letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
         letterPoints = letterPoints + Number(pointValue);
		 }
 
	  }
	}
   //console.log(letterPoints);
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   //console.log("Let's play some scrabble! Enter a word:");
   initialInput = input.question("Let's play some scrabble! Enter a word: ");
   return userInput = initialInput;
};

//let simpleScorer;
function simpScorer(word){
   let wordScore = 0;
   
   for (let i = 0; i < word.length; i++) {
      wordScore++;
   }
   return wordScore;
   //return `Simple Score is: ${wordScore}`;
}

function vowelScorer(word){
   let vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
   word = word.toUpperCase();
   let wordScore = 0;
   let vowelScore = 0;
   for (let i = 0; i < word.length; i++){
      for (let j = 0; j < vowels.length; j++){
         if (word[i].includes(vowels[j])) {
            wordScore = wordScore + 2;
         }
      }
      wordScore++;   
      vowelScore = vowelScore + wordScore;
      //console.log(`Points for '${word[i]}': ${wordScore}`);
   }
   //return `Vowel Score is: ${vowelScore}`;  
   //console.log(vowelScore);
   return vowelScore;
}

let olderScrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: function() {
      return oldScrabbleScorer(userInput);
   }
};
let scrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: function() {
      return transform(userInput);
   }
};
let simpleScorer = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: function() {
      return simpScorer(userInput);
   }
};
let vowelBonusScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: function() {
      return vowelScorer(userInput);
   }
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer ];

function scorerPrompt(word) {
   algorithmInput = input.question(`Which scoring algorithm would you like to use? \n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses srabble point system \n Enter 0, 1, or 2: `);
   return `Score for '${word}': ${scoringAlgorithms[algorithmInput].scorerFunction()}`;
}

function transform(word) {
   const scrabbleStructure = {};
   for (const key in oldPointStructure) { 
      for (let i = 0; i < oldPointStructure[key].length; i++) {
         scrabbleStructure[oldPointStructure[key][i]] = oldPointStructure[key];
   }
}
   return scrabbleStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   console.log(scorerPrompt(userInput));
   console.log(newPointStructure);
   
   // console.log(oldScrabbleScorer(userInput));
   // console.log(simpScorer(userInput));
   // console.log(vowelScorer(userInput));
   // console.log(scoringAlgorithms);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
