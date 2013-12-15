var player, enemies = [], currentlevel, interval;
function Entity(sprite,ai){
  this.sprite = sprite;
  this.ai = ai;
  this.direction = 1;
  this.setDirection = function(d){
    if(d === this.direction)
      return;
    this.sprite.setX(this.sprite.getX()-0.65*d*this.sprite.getWidth());
    this.sprite.setScaleX(d);
    this.direction = d;
  };
  this.die = function(){
    this.sprite.setAnimation('death');
    var self = this;
    this.sprite.afterFrame(player.sprite.getAnimations().death.length - 1,function(){
      self.sprite.setAnimation('death_stay');
    });
  };
}
function makeEnemy(){
  var i = Math.floor(Math.random()*400);
  var sprite = new Kinetic.Sprite({
    x: i,
    y: 100,
    image: piratesheet,
    animation: 'walk',
    animations: pirateanimation,
    frameRate: 8,
    index: 0,
    width: 128,
    height:128
  });
  return new Entity(sprite,function(){
    if(this.sprite.getAnimation()==='walk'){
      this.sprite.setX(this.sprite.getX()+4*this.direction);
    }
  });
}
function init_game(){
  enemies[0] = makeEnemy();
  red = new Kinetic.Sprite({
    x: 400,
    y: 100,
    image: redsheet,
    animation: 'idle',
    animations: redanimation,
    frameRate: 16,
    index: 0,
    width: 128,
    height:128,
    scale:1
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
  background.add(orange);
  background.add(enemies[0].sprite);
  red.start();
  orange.start();
  enemies[0].sprite.start();
  player = new Entity(red,function(){
    if(this.sprite.getAnimation()==='walk'){
      this.sprite.setX(this.sprite.getX()+4*this.direction);
  }
  });
  currentlevel={"env":{}};
  init_bindings();
  interval = window.setInterval(loop,50);
}
function loop(){
  player.ai();
  enemies[0].ai();
}