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
    pirate = new Kinetic.Sprite({
      x: 400,
      y: 100,
      image: piratesheet,
      animation: 'walk',
      animations: pirateanimation,
      frameRate: 8,
      index: 0,
      width: 128,
      height:128
    });
    red = new Kinetic.Sprite({
      x: 400,
      y: 100,
      image: redsheet,
      animation: 'walk',
      animations: redanimation,
      frameRate: 8,
      index: 0,
      width: 128,
      height:128,
      scale:4
    });
    orange = new Kinetic.Sprite({
      x: 60,
      y: 60,
      image: orangesheet,
      animation: 'idle',
      animations: orangeanimation,
      frameRate: 8,
      index: 0,
      width: 64,
      height:64
    });
    background.add(red);
    background.add(pirate);
    background.add(orange);
    red.start();
    orange.start();
    pirate.start();
    stage.add(background);
  }
}
var stage = new Kinetic.Stage({
  container: 'container',
  width: 1000,
  height: 500
});
var background = new Kinetic.Layer();
var pirate= new Kinetic.Layer();