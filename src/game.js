var player, enemies, currentlevel;
function init_game(){
  player = {"sprite":pirate,direction:1};
  player.setDirection = function(d){
    if(d === this.direction)
      return;
    this.sprite.setX(this.sprite.getX()+d*this.sprite.getWidth())
    this.sprite.setScaleX(d);
    this.direction = d;
  };
  currentlevel={"env":{}};
  init_bindings();
}
function loop(){

}