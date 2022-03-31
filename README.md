# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Angel Williams
Time spent: **#** hours spent in total

Link to project: https://codepath-site-task1.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![1]https://recordit.co/bh1cCjTrkt (win game playthrough (set to 8 rounds))
![2]https://recordit.co/pLB2f279j5 (incorrect guess/lose game)
![3]https://recordit.co/ancmf4U9tN (Displays console messages showing random pattern generation, clues played, and user guess)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
-https://palettes.shecodes.io/ (Css color palletes)
-https://www.w3schools.com/css/default.asp (Defines and provides examples of css elements and features)
-https://www.w3schools.com/js/default.asp (Defines and provides examples of js elements and features)
-https://www.w3schools.com/html/default.asp (Defines and provides examples of html elements and features)
-https://www.tutorialbrain.com/css_tutorial/css_font_family_list/ (List of css fonts and font-families)
-https://www.w3schools.com/jsref/met_win_settimeout.asp (Used to gain a better understaing of setTimeout function and its syntax)

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
I came into this project with very little experience with hmtl and almost no expereince with css and js. 
Learning the correct syntax presented its own challenge. I had difficulties with getting the buttons to light up without a click. 
When I was adding color to the buttons i deviated from the speficied format: 
Instead of: "#button1{
  background: #6e386e;
}
#button1:active, #button1.lit {
  background: #3c0303;
}"
I did:
"#button1{
  background: #6e386e;
}
 #button2{
 background: #fe7187;
 }"
 I put the active and lit spefications at the bottom. This created some cases where the buttons would not light up at all. I originally tried to fix this by defining the pseudoclass ".lit" but I got the same result. 
 After some trial and error, I realized the importance of the formatting of the css code and went with the format from the directions. 
 I also had an issue with a syntax error when implementing the clearButton(btn) function. Withtin the playSingleClue(btn) function, I used the setTimeout() method.
 I originally typed: "function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn, clueHoldTime - decreaseTime);
    setTimeout(clearButton(btn), clueHoldTime - decreaseTime); (Point of error)
  } "
  The incorrect syntax cause my program to play the clue sequence without clearing the highlighted buttons. 
  To troubleshoot I tested the clearButton function by itself. After confirming it worked, I then saw that the problem lied in its implementation in paySingleClue()
  I researched the setTimeout method and saw that the correct sytax was: 
  setTimeout(function, milliseconds, param1, param2, ...) 
  After fixing the sytax, the game was functional. 
  I had a hard time perfecting the logic behind the guess() function. 
3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
  This project has peeked my curiousity in web development, and has nutured a desire to learn more about the subject.
  How can I implement video into my projects? I would like to try and create more css art. 
  How do I implement and manage larger volumes of data (forms, records, etc)?
  Which functions provide better time and space complexities? 
  How can the functions I learned in this project be expanded to larger projects?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
 I woud have perfected my own guess() function. 
 I would have added background music that would play upon pressing start and stop unpon clicking stop and have the option to toggle play/mute with buttons similar to the stop and start buttons
 I think it would be fun to give the game an unlimited number of rounds so the player can test their abilities. 
 If I were to go the unlimited rounds route, I would have implemented the "Player only loses after 3 mistakes", but since there are only 10 rounds I think that giving the user 1 chance has the potential to add an addictive edge to the game
 I would have like the end game messages (game over, you win, etc ) to be a more decorative pop-up window with different audio cues depending on a win or a loss 
 I implemented a feature within the PlaySequence() and PlaySigleClue() functions that speeds up the clues each round. However, the page needs to be refreshed to reset the speed to normal. I would have fixed it to where the speed returns to normal after stopping the game 
 I would have made the audio more complex, like each button would have either a major, minor, or diminished chord in a different key. 
 I would also implement a time limit for guesses. With this I might also implement a pause game button that is only visible while the game is playing. 
 (Even though players could cheat the time limit with a pause button, its a personal prefence of mine to allow the user to step away from the computer if needed)
 I really enjoyed this project, so I will keep working on it to add in this features. 



## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright Angel Williams

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.