var player, enemies, currentlevel, interval;
function Entity(sprite,ai){
  this.sprite = sprite;
  this.ai = ai;
  this.direction = 1;
  this.setDirection = function(d){
    if(d === this.direction)
      return;
    this.sprite.setX(this.sprite.getX()-0.8*d*this.sprite.getWidth());
    this.sprite.setScaleX(d);
    this.direction = d;
  };
  this.die = function(){
    this.sprite.setAnimation('death');
    var self = this;
    this.sprite.afterFrame(3,function(){
      self.sprite.setAnimation('death_stay');
    });
  };
}
function init_game(){
  player = new Entity(red,function(){
    if(this.sprite.getAnimation()==='walk'){
    this.sprite.setX(this.sprite.getX()+4*this.direction)
  }
  });
  currentlevel={"env":{}};
  init_bindings();
  interval = window.setInterval(loop,50);
}
function loop(){
  player.ai();
}