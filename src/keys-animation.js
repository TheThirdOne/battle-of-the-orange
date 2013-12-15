var pirate_a = {
  anims:[{name: 'idle', slides:[0]},
         {name: 'walk', slides:[0,1,2,3,0,4,5,6]},
         {name: 'attack', slides:[0,8,8,9,10,11,8,0]},
         {name: 'death', slides:[0,12,13,14]},
         {name: 'death_stay', slides:[14]}],
         columns:4,rows:4,width:128,height:128};
var orange_a = {
  anims:[{name: 'idle', slides:[0,1,1,2,2,2,1,1,0,5,6,5]}],
         columns:4,rows:2,width:64,height:64};
var red_a = {
  anims:[{name: 'idle', slides:[0]},
         {name: 'walk', slides:[0,1,2,3,4,1,2]},
         {name: 'attack', slides:[0,8,8,9,10,11,8,0]},
         {name: 'death', slides:[0,12,13,14]},
         {name: 'death_stay', slides:[14]}],
         columns:4,rows:4,width:32,height:32};
var redanimation = AnimationSet(red_a);
var orangeanimation = AnimationSet(orange_a);
var pirateanimation = AnimationSet(pirate_a);

var keys = [];
var bindingsDown = [], bindingsUp = [];
var tempkeys = [];
var bindings = {left: 65, right: 68, space: 32};
function init_bindings(){
        document.onkeydown = function(evt){
          if(!keys[evt.keyCode] ){
            keys[evt.keyCode] = true;
            console.log(evt.keyCode);
            if((!currentlevel.env.paused || evt.keyCode == pause) && bindingsDown[evt.keyCode])
              bindingsDown[evt.keyCode]();
          }
        };
        document.onkeyup = function(evt){
          keys[evt.keyCode] = false;
          if((!currentlevel.env.paused || evt.keyCode == pause )){
                  if(bindingsUp[evt.keyCode])
                      bindingsUp[evt.keyCode]();
                }else{
                      tempkeys.push(evt.keyCode);
                }
        };
        bindingsDown[bindings.space]=function(){
          player.sprite.setAnimation('attack');
          player.sprite.afterFrame(7,function(){
            player.sprite.setAnimation('idle');
          });
        };
        bindingsDown[bindings.left]=function(){
          player.sprite.setAnimation('walk');
          player.setDirection(-1);
        };
        bindingsUp[bindings.left]=function(){
          if(player.direction === -1)
            player.sprite.setAnimation('idle');  
        };
        bindingsDown[bindings.right]=function(){
          player.sprite.setAnimation('walk');
          player.setDirection(1);
        };
        bindingsUp[bindings.right]=function(){
          if(player.direction === 1)
            player.sprite.setAnimation('idle');  
        };
}