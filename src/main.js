var pirate_a = {
  anims:[{name: 'idle', slides:[0]},
         {name: 'walk', slides:[0,1,2,3,0,4,5,6]},
         {name: 'attack', slides:[0,8,8,9,10,11,8,0]},
         {name: 'death', slides:[0,12,13,14]},
         {name: 'death_stay', slides:[14]}],
         columns:4,rows:2,width:32,height:32};
var orange_a = {
  anims:[{name: 'idle', slides:[0,1,1,2,2,2,1,1,0,5,6,5]}],
         columns:4,rows:2,width:16,height:16};
var orangeanimation = AnimationSet(orange_a);
var pirateanimation = AnimationSet(pirate_a);
var piratesheet = new Image();
piratesheet.onload = function(){
  start();
};
var orangesheet = new Image();
orangesheet.onload = function(){
  start();
};
piratesheet.src = 'assets/pirate.png';
orangesheet.src = 'assets/orange.png';
var counter = 2;
var orange, pirate;
function start(){
  counter--;
  if(counter === 0){
    pirate = new Kinetic.Sprite({
      x: 300,
      y: 300,
      image: piratesheet,
      animation: 'walk',
      animations: pirateanimation,
      frameRate: 8,
      index: 0,
      width: 128,
      height:128
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
    background.add(pirate);
    background.add(orange);
    orange.start();
    pirate.start();
    stage.add(background);
  }
}
var stage = new Kinetic.Stage({
  container: 'container',
  width: 1000,
  height: 400
});
var background = new Kinetic.Layer();
var pirate= new Kinetic.Layer();