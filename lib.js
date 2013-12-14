function AnimationSet(data){
  var out = {};
  for(var i = 0; i < data.anims.length; i++){
    out[data.anims[i].name]=Animation(data.anims[i].slides,data);
  }
  return out;
}
function Animation(slides, data){
  var x,y;
  var out=[];
  for(var i = 0; i < slides.length; i++){
    x = slides[i]%data.columns;
    y = Math.floor(slides[i]/data.columns);
    out[i] = {'x': x*data.width, 'y' : y*data.height,
           'width': data.width, 'height': data.height}
  }
  return out;
}
function init_sound(type, channels, volume){
  sounds[type]=[]
  for (a=0;a<channels;a++) {                  
    sounds[type][a] = {};
    sounds[type][a]['channel'] = new Audio();   
    sounds[type][a]['channel'].src = document.getElementById(type).src; 
    sounds[type][a]['channel'].load();      
    sounds[type][a]['finished'] = -1;
    if(volume)
      sounds[type][a]['channel'].volume = volume;         
  }
}

function play_multi_sound(s, start) {
  for (a=0;a<sounds[s].length;a++) {
    thistime = new Date();
    temp = sounds[s]
    if (sounds[s][a]['finished'] < thistime.getTime()) {      
      sounds[s][a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000 + start*1000;
      sounds[s][a]['channel'].currentTime = start;
      sounds[s][a]['channel'].play();
      break;
    }
  }
}