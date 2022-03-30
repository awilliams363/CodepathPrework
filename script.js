var clueHoldTime = 600;  
const cluePauseTime = 500;
const nextClueWaitTime = 400;
const numberOfRounds = 8;

var pattern = new Array(10);
var progress = 0;
var gamePlaying = false;
var tonePlaying = false; 
var volume = 0.5;
var guessCounter = 0;
var randomIntMin = 1;
var randomIntMax = 4; 
var randomNumberResult;
var decreaseTime = 0;

function randomNumber(){
  randomNumberResult = Math.floor(Math.random() * (randomIntMax-randomIntMin) + randomIntMin);
  console.log("Random number generated: "+randomNumberResult);
  return randomNumberResult;
}

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
function stopGame(){
  gamePlaying = false; 
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}
function lostGame(){
  stopGame();
  alert("Game Over. Practice makes Perfect :)")
}
function winGame(){
  stopGame();
  alert("You win! <3");
}
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn, clueHoldTime - decreaseTime);
    setTimeout(clearButton, clueHoldTime - decreaseTime, btn);
  }
}
function setPattern(){
  for(let j = 0; j<= numberOfRounds+1; j++){
    pattern[j] = randomNumber();
  }
}
function playClueSequence(){
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime - decreaseTime;
    delay += cluePauseTime - decreaseTime;
  }
}

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
        decreaseTime = decreaseTime + 30; 
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
// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
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
