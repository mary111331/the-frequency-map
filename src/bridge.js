// The Frequency Map bridge: lets a world ask the map to take you through a door.
(function(){
 var made=[],AC=window.AudioContext||window.webkitAudioContext;
 if(AC){var W=function(o){var c=o===undefined?new AC():new AC(o);made.push(c);return c;};W.prototype=AC.prototype;window.AudioContext=W;if(window.webkitAudioContext)window.webkitAudioContext=W;}
 // after a door, sound may start suspended; the first touch wakes it up again
 function wake(){made.forEach(function(c){try{if(c.state==='suspended')c.resume();}catch(e){}});}
 ['pointerdown','touchend','keydown','click'].forEach(function(e){addEventListener(e,wake,true);});
 window.FMAP={world:window.FMAP_WORLD,arrive:window.FMAP_ARRIVE,
  go:function(to){try{parent.postMessage({fmap:'go',from:window.FMAP_WORLD,to:to},'*');}catch(e){}},
  map:function(){try{parent.postMessage({fmap:'map'},'*');}catch(e){}},
  audio:function(){return made.map(function(c){return c.state;});}};
 document.addEventListener('DOMContentLoaded',function(){var t=document.getElementById('tbtns');if(!t)return;var b=document.createElement('button');b.className='tb';b.type='button';b.id='bMap';b.textContent='Map';b.onclick=function(){window.FMAP.map();};t.insertBefore(b,t.firstChild);});
})();
