// ---------- The Frequency Map: arriving from the jazz club ----------
if(window.FMAP_ARRIVE==='jazz'){setTimeout(function(){$('bWalk').onclick();rig.position.set(CCX+2.0,0,CZ+1.7);yaw=Math.PI/2;pitch=-0.08;lying=false;eyeT=1.6;
 JAZZDOOR.piv.rotation.y=-1.25;JAZZDOOR.warm.material.opacity=1;JAZZDOOR.glow.material.opacity=0.7;JAZZDOOR.seam.material.opacity=0;JAZZDOOR.open=true;
 caption('Up the stone steps and out through the secret door, back in the cave. The glowing stones, the two beds, and out there, the beach.',8000);
 setTimeout(function(){jazzDoorTo(0,1400,function(){JAZZDOOR.open=false;});},1600);},60);}
