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
piratesheet.src = 'assets/pirate.png';
redsheet.src = 'assets/redcoat.png';
orangesheet.src = 'assets/orange.png';

var counter = 3;
var orange, pirate;
function start(){
  counter--;
  if(counter === 0){
    stage.add(background);
    init_game();
  }
}
var stage = new Kinetic.Stage({
  container: 'container',
  width: 1000,
  height: 500
});
var background = new Kinetic.Layer();
var pirate= new Kinetic.Layer();