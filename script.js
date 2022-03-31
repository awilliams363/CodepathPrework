//Angel Williams 
//CodePath SITE Prework: Light and Sound Memory Game (js file)

//constants
const cluePauseTime = 500; //how long until the next clue is played (ms)
const nextClueWaitTime = 400; //initial delay wait time 
const numberOfRounds = 10; // number of rounds to complete to win; Must match size of "pattern" array

//variables
var clueHoldTime = 600; //how long the clue is played (ms). Changed constant to var to enable edits to value during playSingleClue() and playSequence()
var pattern = new Array(10); //holds the sequence pattern for each match
var progress = 0; //counter for number of rounds user has completed
var gamePlaying = false; //boolean used to toggle whether the game is playing or not
var tonePlaying = false;  //boolean used to toggle button audio
var volume = 0.5; //general volume for game button audio
var guessCounter = 0; //counter for number of guesses performed by user

//used in randomNumber() function to generate integers between 1-4 for each game button
var randomIntMin = 1; 
var randomIntMax = 4; 

//used to hold result of randomNumber() function. The results will be put in the pattern array and used as the seuqence pattern
var randomNumberResult;

//used to increase speed of each round in the playSingleClue() and playSequence() functions
var decreaseTime = 0;

//Random number generator used to generate button sequence pattern
function randomNumber(){
  randomNumberResult = Math.floor(Math.random() * (randomIntMax-randomIntMin) + randomIntMin); 
  console.log("Random number generated: "+randomNumberResult);
  return randomNumberResult;
}

//defines the start of the game by hiding the start button, displaying the stop button,
//setting gamePlaying boolean to true, setting the sequence pattern, and playing the clue sequence 
function startGame(){
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  setPattern();
  console.log("This match's pattern is: "+pattern.toString());
  playClueSequence();
  clueHoldTime = 600;
}

//Defines the end of the game (loss and win) by setting gamePlaying to false,
//hiding the stop button, and displaying the start button 
function stopGame(){
  gamePlaying = false; 
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

//Sends game over message to user in event of a loss
function lostGame(){
  stopGame();
  alert("Game Over. Practice makes Perfect :)")
}

//Sends winnng message to user in the event of a win 
function winGame(){
  stopGame();
  alert("You win! <3");
}

//Allows the button to be highlighted while being played as a clue 
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

//Clears button highlights after it has been played as a clue 
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

//Defines how to play 1 clue which involves:
//highlighting the button, playing the button's audio (timed), and clearing the highlight after a speficied time 
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    //here the decreaseTime (incremented later in guess() function) is used to lower to the amount of time a clue is played and the time between clues
    playTone(btn, clueHoldTime - decreaseTime); 
    setTimeout(clearButton, clueHoldTime - decreaseTime, btn);
  }
}

//creates a new sequence pattern with each start of a new game using the randomNumber() method
function setPattern(){
  for(let j = 0; j<= numberOfRounds+1; j++){
    pattern[j] = randomNumber();
  }
}

// Allows for SingleClue() to be played as a sequence 
function playClueSequence(){
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
   //decreaseTime is incremented with each round in the guess() method. This makes the clue sequence faster each round
    delay += clueHoldTime - decreaseTime;
    delay += cluePauseTime - decreaseTime;
  }
}


//guess(btn) function from prework instructions
function guess(btn){
  console.log("user guessed: " + btn);
  
  if(!gamePlaying){
    return;
  }
  
  if(pattern[guessCounter] == btn){
    //Guess was correct!
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        //GAME OVER: WIN!
        winGame();
      }else{
        //Pattern correct. Add next segment
        progress++;
        decreaseTime = decreaseTime + 30; //increases clue sequence speed by increasing the time subtracted from the clue play and hold times 
        playClueSequence();
      }
    }else{
      //so far so good... check the next guess
      guessCounter++;
    }
  }else{
    //Guess was incorrect
    //GAME OVER: LOSE!
    lostGame();
  }
}    

// Sound Synthesis Functions from prework instructions
//I altered the original frequencies
const freqMap = {
  1: 261.0,
  2: 329.0,
  3: 392,
  4: 469.6,
} 
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
