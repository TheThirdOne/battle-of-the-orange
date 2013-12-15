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
    this.sprite.afterFrame(self.sprite.getAnimations().death.length - 1,function(){
      self.sprite.setAnimation('death_stay');
    });
  };
}
function makeEnemy(){
  var i = Math.floor(Math.random()*400);
  var frame = Math.floor(Math.random()*pirateanimation.walk.length);
  var sprite = new Kinetic.Sprite({
    x: i,
    y: 200,
    image: piratesheet,
    animation: 'walk',
    animations: pirateanimation,
    frameRate: 8,
    index: frame,
    width: 128,
    height:128
  });
  var temp =new Entity(sprite,enemyAI);
  temp.speed =  Math.random()*2+3;
  temp.setDirection((i%2)?1:-1);
  return temp;
}
function enemyAI(){
  if(this.sprite.getAnimation()==='walk'){
    this.sprite.setX(this.sprite.getX()+this.speed*this.direction);
    var temp = this.sprite.getX()+this.direction*this.sprite.getWidth();
    if(temp>1.1*stage.getWidth() || temp< -0.1*stage.getWidth())
      this.setDirection(-this.direction);
    this.sprite.setY(getYofFloor(this.sprite.getX()+0.45*this.direction*this.sprite.getWidth()-20));
  }
}
function getYofFloor(x){
  if(x > 945)
    return 155;
  else if(x > 900)
    return -(x-900)+200;
  else if(x > 133)
    return 200;
  else if(x > 69)
    return (x-69)+145;
  else if(x>-34)
    return 145;
  else
    return 200;
}
function init_game(){
  pirateship = new Kinetic.Image({
          x: -500,
          y: -450,
          image: shipsheet,
          width: shipsheet.width,
          height: shipsheet.height
        });
  ship.add(pirateship);
  ship.batchDraw();
  back= new Kinetic.Image({
          x: 0,
          y: -125,
          image: backsheet,
          width: backsheet.width,
          height: backsheet.height
        });
  background.add(back);
  background.batchDraw();
  for(var i = 0; i < 8; i++){
    enemies[i] = makeEnemy();
  }
  red = new Kinetic.Sprite({
    x: 400,
    y: 200,
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
  people.add(red);
  people.add(orange);
  for(i = 0; i < 8; i++){
    people.add(enemies[i].sprite);
  }
  red.start();
  orange.start();
  enemies[0].sprite.start();
  for(i = 0; i < 8; i++){
    enemies[i].sprite.start();
  }
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
  for(i = 0; i < 8; i++){
    enemies[i].ai();
  }
  var temp = 30*Math.pow(Math.sin((k++)/25),2);
  ship.setY(temp);
  ship.batchDraw();
  people.setY(temp);
}
var k = 0;