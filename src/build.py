#!/usr/bin/env python3
"""The Frequency Map: wires three existing worlds together without changing their rooms.
Sources (read-only):
  beach_build/index.html          Hallucination of Love, Beach Edition (live version)
  jazz_build/index.html           The Digital Jazz Club (live version)
  the-record-shop-dino.html       The Record Shop v4.6 (with the Sockenplaylist crate)
Only additions: the doors between them, their Places entries, a help line each,
an arrival point for each door, and a Map button.
"""
import json, os, re, sys
H = '/home/sprite'
OUT = os.path.join(H, 'frequency_map_build')
THREE = open(os.path.join(H, 'beach_build/three.min.js')).read()
TOK_THREE = '%%FMAP_THREE%%'
TOK_ARRIVE = '%%FMAP_ARRIVE%%'

def rep(s, old, new, n=1):
    c = s.count(old)
    if c != n:
        sys.exit('patch anchor count %d != %d: %r' % (c, n, old[:80]))
    return s.replace(old, new)

BRIDGE = open(os.path.join(OUT, 'bridge.js')).read()

def prep(path, patches, world):
    h = open(path).read()
    assert THREE in h, path
    h = h.replace(THREE, TOK_THREE)  # three.js is shared; the shell puts it back at runtime
    for old, new in patches:
        h = rep(h, old, new)
    bridge = '<script>window.FMAP_WORLD=' + json.dumps(world) + ';window.FMAP_ARRIVE=' + TOK_ARRIVE + ';\n' + BRIDGE + '</script>'
    h = rep(h, '<head>', '<head>' + bridge)
    return h

P = lambda f: open(os.path.join(OUT, f)).read()

# ---------------- beach ----------------
beach = prep(os.path.join(H, 'beach_build/index.html'), [
    # the secret door, built right after the glowing stones (nothing else in the cave moves)
    ("var caveL=new THREE.PointLight(0xffc68e,1.25,11,1.2);", P('beach_door.js') + "var caveL=new THREE.PointLight(0xffc68e,1.25,11,1.2);"),
    # Places entry (appended at the end so existing indices stay the same)
    ("['Under the floating lines','Look up into the twilight sky',-6,-15,-18,-60,0.42]];",
     "['Under the floating lines','Look up into the twilight sky',-6,-15,-18,-60,0.42],\n ['The secret door','Back of the cave, beside the glowing stones: down to the jazz club',CCX+1.5,CZ+1.7,CCX+2.95,CZ+1.7,-0.05]];"),
    # interaction (appended at the end of ITS so ITS[6] is still the sky)
    ("{id:'crys',label:'Touch the glowing stones'", "{id:'crys',label:'Touch the glowing stones'"),
    # help line
    ("Look up from the beach to read the lines in the sky, or tap Lines.</p>",
     "Look up from the beach to read the lines in the sky, or tap Lines.</p><p>At the back of the cave, beside the glowing stones, there is a secret door. It leads down to the jazz club.</p>"),
    # arrival point + exposing the door for tests
    ("keys:keys,walk:function(n,k){keys[k]=true;for(var i=0;i<n;i++)move(0.05);keys[k]=false;}};\n})();",
     "keys:keys,walk:function(n,k){keys[k]=true;for(var i=0;i<n;i++)move(0.05);keys[k]=false;},jazzDoor:JAZZDOOR,can:allowed,rig:rig,scene:scene,camera:camera,look:function(y,p){yaw=y;pitch=p;}};\n" + P('beach_arrive.js') + "})();"),
], 'beach')
# ITS append: find the end of the ITS array literal
i = beach.find('var ITS=[')
j = beach.find('];', i)
beach = beach[:j] + ",\n {id:'jazzdoor',label:'Open the secret door',x:CCX+2.95,z:CZ+1.7,r:2.6,act:function(){openJazzDoor();}}" + beach[j:]
assert "id:'jazzdoor'" in beach

# ---------------- jazz club ----------------
jazz = prep(os.path.join(H, 'jazz_build/index.html'), [
    # the record shelf becomes a hinged group (same meshes, same places) + a mustard-yellow record as the handle
    ("[0.35,0.95,1.55].forEach(function(y){var r=new THREE.Mesh(BOX,shM);r.scale.set(0.34,0.36,4.6);r.position.set(6.8,y+0.18,-5.5);scene.add(r);blk(6.6,7,y-0.03,y,-7.85,-3.15,lam(0x3a2214));});\nblk(6.6,7,1.97,2.0,-7.85,-3.15,lam(0x3a2214));",
     "var shelfDoor=new THREE.Group();scene.add(shelfDoor);\n[0.35,0.95,1.55].forEach(function(y){var r=new THREE.Mesh(BOX,shM);r.scale.set(0.34,0.36,4.6);r.position.set(6.8,y+0.18,-5.5);shelfDoor.add(r);blk(6.6,7,y-0.03,y,-7.85,-3.15,lam(0x3a2214),shelfDoor);});\nblk(6.6,7,1.97,2.0,-7.85,-3.15,lam(0x3a2214),shelfDoor);\n" + P('jazz_shelf.js')),
    # interactions: pull the record (to the shop), the front door up the cave steps (to the beach)
    ("{label:'Look at the record shelf',seg:[6.6,-7.8,6.6,-3.2],r:1.6,act:function(){cap('More records, spines out, filed by feeling instead of by alphabet.');}},",
     "{label:'Look at the record shelf',seg:[6.6,-7.8,6.6,-3.2],r:1.6,act:function(){cap('More records, spines out, filed by feeling instead of by alphabet.');}},\n {label:'Pull the mustard-yellow record',pts:[[6.55,-3.9]],r:1.9,pri:0.7,act:function(){openShelfDoor();},obj:mustardRec},\n {label:'Go up the cave steps to the beach',pts:[[0,9.7]],r:2.0,pri:0.3,act:function(){toBeach();}},"),
    # Places entries (appended)
    ("['The door','Where you came in',0,8.4,0,1.4,0]\n];",
     "['The door','Where you came in',0,8.4,0,1.4,0],\n ['The cave steps','Out the door and up through the cave to the beach',0,8.4,0,1.4,10],\n ['The secret record shelf','Pull the mustard-yellow record: the way to the record shop',5.3,-3.75,6.6,1.15,-3.75]\n];"),
    # help line
    ("Miles\\u2019s room.</p>';",
     "Miles\\u2019s room.</p><p>The front door leads up the cave steps to the beach. On the record shelf by the stage, one mustard-yellow record sticks out. Pull it, and the shelf slides open the way to the record shop.</p>';"),
    # arrival point
    ("window.__jazz={ok:true,go:go,", P('jazz_arrive.js') + "window.__jazz={ok:true,shelfDoor:shelfDoor,go:go,"),
], 'jazz')

# ---------------- record shop ----------------
shop = prep(os.path.join(H, 'the-record-shop-dino.html'), [
    ("$('help').innerHTML='<p><b>How it works</b></p>';",
     "PLACES.push(['The door to the jazz club','Front wall, right of the stairs: the passage to the jazz club',3.45,-5.5,Math.PI,-.05,true]);HELP.push('Front wall, right of the stairs: a small wooden door. Behind it, a passage leads to the jazz club.');\n$('help').innerHTML='<p><b>How it works</b></p>';"),
    ("window.__shop={scene:scene,camera:camera,P:P,open:openDoor,", P('shop_door.js') + "window.__shop={jazzDoor:JAZZDOOR,spots:SPOTS,free:free,scene:scene,camera:camera,P:P,open:openDoor,"),
], 'shop')

shell = P('shell.html')
data = json.dumps({'three': THREE, 'beach': beach, 'jazz': jazz, 'shop': shop}, ensure_ascii=True).replace('</', '<\\/')
shell = rep(shell, '/*%%FMAP_DATA%%*/', 'var FMAP_DATA=' + data + ';')
open(os.path.join(OUT, 'index.html'), 'w').write(shell)
print('ok', len(shell))
