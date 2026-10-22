// ---------- The Frequency Map: the record shelf is a secret door to the record shop ----------
// same meshes as before, now grouped so the whole shelf can slide along the wall towards the stage
var mustardTex=cv(64,64,function(g,w,h){g.fillStyle='#d8a21c';g.fillRect(0,0,w,h);g.fillStyle='#7a1f2b';g.fillRect(0,h*0.12,w,h*0.16);g.fillRect(0,h*0.72,w,h*0.1);});
var mustardRec=new THREE.Mesh(new THREE.BoxGeometry(0.31,0.31,0.024),new THREE.MeshLambertMaterial({map:mustardTex,emissive:0x2a1a00}));
mustardRec.position.set(6.66,0.95+0.16,-3.9);shelfDoor.add(mustardRec);
var shelfPass=new THREE.Group();shelfPass.visible=false;scene.add(shelfPass);
(function(){var m=new THREE.Mesh(new THREE.PlaneGeometry(1.1,2.05),new THREE.MeshBasicMaterial({color:0x140b06}));m.rotation.y=-Math.PI/2;m.position.set(6.985,1.025,-3.75);shelfPass.add(m);
 var gl=new THREE.Mesh(new THREE.PlaneGeometry(0.7,1.7),new THREE.MeshBasicMaterial({color:0xffb768,transparent:true,opacity:0.85,depthWrite:false}));gl.rotation.y=-Math.PI/2;gl.position.set(6.98,0.95,-3.75);shelfPass.add(gl);
 var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xffb060,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(2.4,2.4,1);sp.position.set(6.7,1.1,-3.75);shelfPass.add(sp);})();
var shelfOpen=false;
function shelfTo(v,ms,done){var a=shelfDoor.position.z/-1.25,t0=performance.now();(function an(){var k=Math.min(1,(performance.now()-t0)/ms),e=k*k*(3-2*k);shelfDoor.position.z=-1.25*(a+(v-a)*e);if(k<1)requestAnimationFrame(an);else if(done)done();})();}
function openShelfDoor(){if(shelfOpen)return;shelfOpen=true;closePanels();shelfPass.visible=true;cap('Click. The whole shelf slides along the wall towards the stage. Behind it, a narrow passage, warm light, a faint crackle.',6000);shelfTo(1,1400);setTimeout(function(){if(window.FMAP)window.FMAP.go('shop');},1800);}
function toBeach(){closePanels();cap('You open the door. Behind it, stone steps lead up through the rock, toward the sound of the sea.',6000);setTimeout(function(){if(window.FMAP)window.FMAP.go('beach');},1300);}
