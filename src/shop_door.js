// ---------- The Frequency Map: a small wooden door to the jazz club (front wall, right of the stairs) ----------
var JAZZDOOR=(function(){var g=new THREE.Group();g.position.set(3.45,F,-5.1);g.rotation.y=Math.PI;scene.add(g);
 var lm=function(c){return new THREE.MeshLambertMaterial({color:c});};
 [[-0.5,1.04,0.08,2.08],[0.5,1.04,0.08,2.08],[0,2.1,1.08,0.08]].forEach(function(f){var m=new THREE.Mesh(new THREE.BoxGeometry(f[2],f[3],0.06),lm(0x2a1a10));m.position.set(f[0],f[1],0.03);g.add(m);});
 var hole=new THREE.Group();hole.visible=false;g.add(hole);
 var hm=new THREE.Mesh(new THREE.PlaneGeometry(0.92,2.02),new THREE.MeshBasicMaterial({color:0x140b06}));hm.position.set(0,1.01,0.004);hole.add(hm);
 var hg=new THREE.Mesh(new THREE.PlaneGeometry(0.6,1.7),new THREE.MeshBasicMaterial({color:0xffb768,transparent:true,opacity:0.8,depthWrite:false}));hg.position.set(0,0.95,0.008);hole.add(hg);
 var c=document.createElement('canvas');c.width=180;c.height=400;var x=c.getContext('2d');x.fillStyle='#24382e';x.fillRect(0,0,180,400);
 for(var i=0;i<4;i++){x.fillStyle=i%2?'#203328':'#28402f';x.fillRect(i*45,0,44,400);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(i*45+44,0,1,400);}
 x.strokeStyle='rgba(0,0,0,.4)';x.lineWidth=3;x.strokeRect(14,18,152,150);x.strokeRect(14,200,152,180);
 x.save();x.translate(90,96);x.rotate(-0.06);x.fillStyle='#efe4cc';x.fillRect(-52,-26,104,52);x.fillStyle='#3a2414';x.font='italic 19px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillText('Jazz Club \u2192',0,-4);x.font='11px Georgia, serif';x.fillText('\u266A durch den Gang',0,15);x.restore();
 x.fillStyle='#c9a24a';x.beginPath();x.arc(26,214,7,0,Math.PI*2);x.fill();
 var tex=new THREE.CanvasTexture(c);var side=lm(0x1c2a22);
 var piv=new THREE.Group();piv.position.set(0.46,0,0.035);g.add(piv);
 var door=new THREE.Mesh(new THREE.BoxGeometry(0.9,2.0,0.045),[side,side,side,side,new THREE.MeshLambertMaterial({map:tex}),side]);door.position.set(-0.45,1.0,0);piv.add(door);
 var knob=new THREE.Mesh(new THREE.SphereGeometry(0.035,10,8),new THREE.MeshLambertMaterial({color:0xc9a24a,emissive:0x2a1c06}));knob.position.set(-0.8,1.0,0.05);piv.add(knob);
 return {g:g,piv:piv,hole:hole,open:false};})();
function jazzDoorTo(v,ms,done){var a=JAZZDOOR.piv.rotation.y/1.3,t0=performance.now();(function an(){var k=Math.min(1,(performance.now()-t0)/ms),e=k*k*(3-2*k);JAZZDOOR.piv.rotation.y=1.3*(a+(v-a)*e);if(k<1)requestAnimationFrame(an);else if(done)done();})();}
function toJazzClub(){if(JAZZDOOR.open)return;JAZZDOOR.open=true;closeAll();JAZZDOOR.hole.visible=true;caption('The little door creaks open. Behind it, a narrow passage, records stacked along the walls, and far ahead, a piano.',6000);jazzDoorTo(1,1200);setTimeout(function(){if(window.FMAP)window.FMAP.go('jazz');},1700);}
SPOTS.push({k:'jazzdoor',x:3.45,z:-5.5,r:.85,label:'Go through to the jazz club',fn:toJazzClub});
// arriving from the jazz club
if(window.FMAP_ARRIVE==='jazz'){setTimeout(function(){$('bWalk').onclick();doorOpen=true;enteredShop=true;P.sit=false;P.x=3.45;P.z=-5.5;P.y=F;P.yaw=.55;P.pitch=-.05;
 JAZZDOOR.piv.rotation.y=1.3;JAZZDOOR.hole.visible=true;JAZZDOOR.open=true;
 setTimeout(function(){caption('You come out of the passage through a small wooden door, right beside the stairs. Records everywhere, two disco balls turning. The record shop.',8000);},500);
 setTimeout(function(){jazzDoorTo(0,1300,function(){JAZZDOOR.hole.visible=false;JAZZDOOR.open=false;});},1500);},60);}
