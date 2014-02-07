var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");

var points = [];
var boxSize = 50;
var soldierSize = 20;
var startX = 0;
var startY = 0;
var stepMove = 20;
var cx = startX,
cy = startY;

var player = new Player();

var isPlayerAlive = true;

generateBoard();
var numberOfSoldiers = 4;
var soldiers = [];
var numberOfDead = 0;

for(i=0; i<numberOfSoldiers; i++){
  soldiers[i] = new SoldierAI();
}

player.start();
soldiers.forEach(function(soldier){
  soldier.startAI();
});

function restart() {
  isPlayerAlive = false;

  setTimeout(function(){
    points = []; 
    cx = startX;
    cy = startY;
    ctx.clearRect(0, 0, 1000, 1000);
    isPlayerAlive = true;
    generateBoard();
    numberOfDead = 0;

    player.restart();
    
    soldiers.forEach(function(soldier){
      soldier.restartAI();
    });
  },300);
}

function generateBoard() {
  for(var x=30; x<=930; x+=100){
    var y=30;
    while(y<330){
      var rnd = generateRandomNumber(0,100);
      ctx.fillStyle="#FF0000";
      ctx.fillRect(x,y+rnd,boxSize,boxSize);
      point = {};
      point.x = x;
      point.y = y+rnd;
      points.push(point);
      y = y + boxSize + rnd;
    }
  }
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(startX, startY, soldierSize, soldierSize);
}
 
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}