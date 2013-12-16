var player, enemies = [], attacking=[], currentlevel, interval;
function Entity(sprite,ai){
  this.sprite = sprite;
  this.ai = ai;
  this.direction = 1;
  this.dead = false;
  this.setDirection = function(d){
    if(d === this.direction)
      return;
    this.sprite.setX(this.sprite.getX()-0.65*d*this.sprite.getWidth());
    this.sprite.setScaleX(d);
    this.direction = d;
  };
  this.die = function(){
    this.sprite.setAnimation('death');
    this.dead = true;
    var self = this;
    this.sprite.afterFrame(self.sprite.getAnimations().death.length - 1,function(){
      self.sprite.setAnimation('death_stay');
    });
  };
  this.attack = function(){
    this.sprite.setAnimation('attack');
    var self = this;
    this.sprite.afterFrame(self.sprite.getAnimations().attack.length - 1,function(){
      attacking.push(self);
      self.sprite.setAnimation('idle');
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
    return 160;
  else if(x > 900)
    return -(x-900)+205;
  else if(x > 133)
    return 205;
  else if(x > 69)
    return (x-69)+155;
  else
    return 160;
}
function init_game(){
  stage.add(background);
  stage.add(ship);
  stage.add(people);
  stage.add(main);
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
    x: 0,
    y: 0,
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
    x: 10,
    y: -75,
    image: orangesheet,
    animation: 'idle',
    animations: orangeanimation,
    frameRate: 8,
    index: 0,
    width: 64,
    height:64
  });
  main.add(red);
  main.add(orange);
  main.setY(200);
  main.setX(400);
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
      people.setX(people.getX()-8*this.direction);
      ship.setX(ship.getX()-8*this.direction);
    } 
  });
  currentlevel={"env":{}};
  init_bindings();
  interval = window.setInterval(loop,100);
}
function getX(sprite,d){
  return sprite.sprite.getX()+(d||0.45)*sprite.direction*sprite.sprite.getWidth();
}
function loop(){
  if(!player.dead)player.ai();
  for(var i = 0; i < 8; i++){
    if(!enemies[i].dead)enemies[i].ai();
  }
  var tmp = main.getX()-ship.getX()+getX(player);
  for(i = 0; i < attacking.length; i++){
    if(attacking[i]===player){
      console.log('atc');
      var t = tmp + player.direction*0.55*player.sprite.getWidth();
      for(var j = 0; j < enemies.length;j++){
        if(enemies[j].dead)continue;
        var x1 = getX(enemies[j]) -35,x2 = getX(enemies[j])+30;
        if(t>x1 && t<x2){
          enemies[j].die();
        }
      }
    }else{
      var x1 = tmp -30,x2 = tmp+30;
      if(getX(attacking[i],0.7)>x1 && getX(attacking[i],0.7)<x2){
        player.die();
      }
    }
  }
  attacking = [];
  var temp = 30*Math.pow(Math.sin((k++)/12),2)||0;
  ship.setY(temp);
  ship.batchDraw();
  people.setY(temp);
  main.setY(temp+getYofFloor(tmp-20));
}
var k = 0;