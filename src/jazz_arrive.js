// ---------- The Frequency Map: arriving from the beach or the record shop ----------
if(window.FMAP_ARRIVE==='beach'||window.FMAP_ARRIVE==='shop'){setTimeout(function(){$('bWalk').onclick();P.sit=false;P.eyeT=1.62;P.lvl=0;
 if(window.FMAP_ARRIVE==='beach'){P.x=0;P.z=8.4;P.gy=groundAt(0,8.4);P.yaw=0;P.pitch=-0.02;cap('You come down the stone steps from the cave and push the door open. Warm light, a piano somewhere. The Digital Jazz Club.',7000);}
 else{shelfOpen=true;shelfDoor.position.z=-1.25;shelfPass.visible=true;P.x=5.3;P.z=-3.75;P.gy=groundAt(5.3,-3.75);P.yaw=Math.PI/2;P.pitch=-0.02;cap('You step out of the passage, and the record shelf slides shut behind you. The Digital Jazz Club.',7000);
  setTimeout(function(){shelfTo(0,1400,function(){shelfPass.visible=false;shelfOpen=false;});},1200);}
},60);}
