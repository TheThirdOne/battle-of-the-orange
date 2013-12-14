var player, enemies, currentlevel, interval;
function init_game(){
  player = {"sprite":pirate,direction:1};
  player.setDirection = function(d){
    if(d === this.direction)
      return;
    this.sprite.setX(this.sprite.getX()-.8*d*this.sprite.getWidth())
    this.sprite.setScaleX(d);
    this.direction = d;
  };
  currentlevel={"env":{}};
  init_bindings();
  interval = window.setInterval(loop,50);
}
function loop(){
  if(player.sprite.getAnimation()==='walk'){
    player.sprite.setX(player.sprite.getX()+4*player.direction)
  }
}