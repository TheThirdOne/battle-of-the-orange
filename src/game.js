var player, enemies, currentlevel, interval;
function Player(sprite){
  this.sprite = sprite;
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
  player = new Player(pirate);
  currentlevel={"env":{}};
  init_bindings();
  interval = window.setInterval(loop,50);
}
function loop(){
  if(player.sprite.getAnimation()==='walk'){
    player.sprite.setX(player.sprite.getX()+4*player.direction)
  }
}