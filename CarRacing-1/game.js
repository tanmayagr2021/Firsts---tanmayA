// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables
let player1X = 50; // Starting position for Player 1
let player1Y = canvas.height / 2 - 70; // Move Player 1 higher
let player1Speed = 0;

let player2X = 50; // Starting position for Player 2, parallel to Player 1
let player2Y = canvas.height / 2 + 30; // Increased distance below Player 1
let player2Speed = 0;

const finishLineX = 750; // Position of the finish line (X coordinate)
const finishLineWidth = 10; // Width of the finish line

let gameOver = false;
let winner = '';
let player1Name = '';
let player2Name = '';

// Load car images (make sure these paths are correct)
const car1Image = new Image();
car1Image.src = 'car1.png'; // Path to car image for Player 1
const car2Image = new Image();
car2Image.src = 'car2.png'; // Path to car image for Player 2

// Initialize the game
function initGame() {
   player1X = 50; // Reset position for Player 1
   player1Y = canvas.height / 2 -70 ; // Move up from center for Player One 
   player2X =50 ; // Reset position for Player Two , parallel to Player One 
   player2Y=canvas.height/2+30 ; // Increased distance below Player One 
   player1Speed=0 ;
   player2Speed=0 ;

   gameOver=false ; // Reset game over state 
}

// Define the game loop 
function update() {
   // Clear the canvas 
   ctx.clearRect(0,0,canvas.width,canvas.height);

   // Draw the finish line 
   drawFinishLine();

   // Update player positions 
   updatePlayerPositions();

   // Check for collisions with finish line 
   checkFinishLine();

   // Draw cars 
   drawCars();

   // Request next frame if game is not over 
   if(!gameOver){
       requestAnimationFrame(update);
   }
}

// Function to draw a vertical bold white finish line across screen 
function drawFinishLine() {
   ctx.strokeStyle='white'; // Set stroke color to white 
   ctx.lineWidth=finishLineWidth ; // Set width of line  
   ctx.beginPath(); 
   
// Start at top of canvas  
ctx.moveTo(finishLineX,0); 

// Draw down to bottom of canvas  
ctx.lineTo(finishLineX,canvas.height); 

ctx.stroke(); 

// Optional : Add text label for "Finish"
ctx.fillStyle='black'; 
ctx.font='16px Arial'; 

ctx.fillText('Finish',finishLineX+15 ,canvas.height/2); // Draw text next to line  
}

// Function to update player positions based on speed (unchanged) 
function updatePlayerPositions() {
if(player1Speed!==0){
player1X+=player1Speed ; 

if(player1X<0)player1X=0;

if(player1X>canvas.width-50)player1X=canvas.width-50;

}

if(player2Speed!==0){

player2X+=player2Speed ; 

if(player2X<0)player2X=0;

if(player2X>canvas.width-50)player2X=canvas.width-50;

}
}

// Function to check who crosses finish line first (unchanged) 
function checkFinishLine() {
if(!gameOver){ 

if(player1X+50 >finishLineX && player1X<finishLineX+finishLineWidth){

winner=player1Name || 'Player One';

endGame(winner);

}else if(player2X+50 >finishLineX && player2X<finishLineX+finishLineWidth){

winner=player2Name || 'Player Two';

endGame(winner);

}
}
}

// Function to end game and announce winner (unchanged) 
function endGame(winner) {

gameOver=true;

alert(winner + ' crossed the finish line first!');

}

// Function to draw cars on canvas (unchanged) 
function drawCars() {

ctx.drawImage(car1Image ,player1X ,player1Y ,50 ,50);

ctx.drawImage(car2Image ,player2X ,player2Y ,50 ,50);

}

// Function to start game (unchanged) 
function startGame() {

player1Name=document.getElementById('player1Name').value || 'Player One';

player2Name=document.getElementById('player2Name').value || 'Player Two';

initGame();

update(); 

}

// Add event listeners for keyboard input (unchanged) 
document.addEventListener('keydown',(event)=>{

if(event.key==='ArrowRight' && !gameOver){

player1Speed=+5 ; 

}else if(event.key==='ArrowLeft' && !gameOver){

player1Speed=-5 ; 

}else if(event.key==='d' && !gameOver){

player2Speed=+5 ; 

}else if(event.key==='a' && !gameOver){

player2Speed=-5 ; 

}

});

document.addEventListener('keyup',(event)=>{

if(event.key==='ArrowRight' || event.key==='ArrowLeft'){

player1Speed=0 ;

}else if(event.key==='d' || event.key==='a'){

player2Speed=0 ;

}

});