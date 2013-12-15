var piratesheet = new Image();
piratesheet.onload = function(){
  start();
};
var orangesheet = new Image();
orangesheet.onload = function(){
  start();
};
var redsheet = new Image();
redsheet.onload = function(){
  start();
};
var shipsheet = new Image();
shipsheet.onload = function(){
  start();
};
var backsheet = new Image();
backsheet.onload = function(){
  start();
};
piratesheet.src = 'assets/pirate.png';
redsheet.src = 'assets/redcoat.png';
orangesheet.src = 'assets/orange.png';
shipsheet.src = 'assets/pirateship.png';
backsheet.src = 'assets/back.png';
var counter = 5;
var orange, pirate;
function start(){
  counter--;
  if(counter === 0){
    stage.add(background);
    stage.add(ship);
    stage.add(people);
    init_game();
  }
}
var stage = new Kinetic.Stage({
  container: 'container',
  width: 1000,
  height: 500
});
var background = new Kinetic.Layer();
var ship = new Kinetic.Layer();
var people = new Kinetic.Layer();