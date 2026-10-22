// ---------- The Frequency Map: the secret door at the back of the cave ----------
// (built without rnd(), so nothing else on the beach changes)
var JAZZDOOR=(function(){var gx=CCX+2.95,gz=CZ+1.7,ry=-1.96,c=Math.cos(ry),s=Math.sin(ry);
 function w(lx,ly,lz){return [gx+lx*c+lz*s,ly,gz-lx*s+lz*c];}
 var g=new THREE.Group();g.position.set(gx,0,gz);g.rotation.y=ry;scene.add(g);
 var hole=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.96),new THREE.MeshBasicMaterial({color:0x0b0705}));hole.position.set(0,0.98,-0.07);g.add(hole);
 var warm=new THREE.Mesh(new THREE.PlaneGeometry(0.92,1.78),new THREE.MeshBasicMaterial({color:0xffb768,transparent:true,opacity:0,depthWrite:false}));warm.position.set(0,0.9,-0.06);g.add(warm);
 var seam=new THREE.Mesh(new THREE.PlaneGeometry(1.0,1.85),new THREE.MeshBasicMaterial({color:0xffc07a,transparent:true,opacity:0.8,depthWrite:false}));seam.position.set(0,0.925,-0.035);g.add(seam);
 var piv=new THREE.Group();piv.position.set(-0.47,0,0);g.add(piv);
 var slab=new THREE.Mesh(new THREE.BoxGeometry(0.94,1.8,0.1),new THREE.MeshLambertMaterial({map:rockMat2.map,color:0x8c7e76}));slab.position.set(0.47,0.9,0);piv.add(slab);
 var nc=document.createElement('canvas');nc.width=nc.height=128;var x=nc.getContext('2d');x.fillStyle='rgba(255,196,130,0.95)';x.font='bold 92px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillText('\u266A',64,70);
 var note=new THREE.Mesh(new THREE.PlaneGeometry(0.24,0.24),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(nc),transparent:true,depthWrite:false}));note.position.set(0.47,1.28,0.056);piv.add(note);
 // rough stone frame around it
 var fm=new THREE.MeshLambertMaterial({map:rockMat2.map,color:0x6e625c});
 [[-0.74,0.5,0.95,1.5],[0.74,0.5,0.95,1.5],[-0.78,1.45,0.9,1.3],[0.78,1.45,0.9,1.3],[0,2.02,2.4,0.65]].forEach(function(q,i){var gg=new THREE.DodecahedronGeometry(0.34,1),pa=gg.attributes.position;for(var k=0;k<pa.count;k++){var f=0.82+0.3*hash(pa.getX(k)*3.1+q[0]+i,pa.getY(k)*2.7+pa.getZ(k)*1.3+q[1]);pa.setXYZ(k,pa.getX(k)*f,pa.getY(k)*f,pa.getZ(k)*f);}gg.computeVertexNormals();var m=new THREE.Mesh(gg,fm);var p=w(q[0],q[1],-0.08);m.position.set(p[0],p[1],p[2]);m.scale.set(q[2]*0.6,q[3],0.7);m.rotation.set(0.4*i,ry+0.7*i,0.3*i);scene.add(m);});
 var glow=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOWT,color:0xffb060,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));glow.scale.set(2.6,2.6,1);glow.position.set(0,1.0,0.25);g.add(glow);
 solidR(gx-0.45,gx+0.6,gz-0.6,gz+0.6);
 return {g:g,piv:piv,warm:warm,glow:glow,seam:seam,open:false,x:gx,z:gz};})();
function jazzDoorTo(v,ms,done){var a=JAZZDOOR.piv.rotation.y/-1.25,t0=performance.now();(function an(){var k=Math.min(1,(performance.now()-t0)/ms),e=k*k*(3-2*k),o=a+(v-a)*e;JAZZDOOR.piv.rotation.y=-1.25*o;JAZZDOOR.warm.material.opacity=o;JAZZDOOR.glow.material.opacity=0.7*o;JAZZDOOR.seam.material.opacity=0.8*(1-o);if(k<1)requestAnimationFrame(an);else if(done)done();})();}
function openJazzDoor(){if(JAZZDOOR.open)return;JAZZDOOR.open=true;caption('The stone gives way. Behind it, steps go down into the rock, and from somewhere below: a saxophone.',6000);jazzDoorTo(1,1300);setTimeout(function(){if(window.FMAP)window.FMAP.go('jazz');},1700);}

