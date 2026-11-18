import * as THREE from 'three';

// Procedural Face Canvas Texture with Cute Chibi Eyes, Blush, and Smile
function createChibiFaceTexture(options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base skin tone
  ctx.fillStyle = options.skinColor || '#F7D7C4';
  ctx.fillRect(0, 0, 512, 512);

  // Big cute anime chibi eyes
  const eyeY = 280;
  const eyeR = 26;

  // Left Eye
  ctx.fillStyle = '#2A1810';
  ctx.beginPath();
  ctx.arc(175, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(168, eyeY - 8, 9, 0, Math.PI * 2);
  ctx.arc(184, eyeY + 10, 5, 0, Math.PI * 2);
  ctx.fill();

  // Right Eye
  ctx.fillStyle = '#2A1810';
  ctx.beginPath();
  ctx.arc(337, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(330, eyeY - 8, 9, 0, Math.PI * 2);
  ctx.arc(346, eyeY + 10, 5, 0, Math.PI * 2);
  ctx.fill();

  // Blushing cheeks
  ctx.fillStyle = 'rgba(255, 140, 160, 0.45)';
  ctx.beginPath();
  ctx.ellipse(135, 335, 35, 18, 0, 0, Math.PI * 2);
  ctx.ellipse(377, 335, 35, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Gentle smile
  ctx.strokeStyle = '#6E382A';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(256, 335, 24, 0.2, Math.PI - 0.2, false);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 1. Build Chibi Prince (Faheem) with articulated walking joints
export function createChibiPrince() {
  const group = new THREE.Group();
  group.name = 'prince';

  const skinMat = new THREE.MeshStandardMaterial({
    map: createChibiFaceTexture({ skinColor: '#F6D9C8' }),
    roughness: 0.6
  });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x2e1d17, roughness: 0.5 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xfcfcfc, roughness: 0.7 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x283652, roughness: 0.6 });
  const shoesMat = new THREE.MeshStandardMaterial({ color: 0x613d29, roughness: 0.5 });

  // Head Pivot
  const headPivot = new THREE.Group();
  headPivot.position.y = 2.45;
  const headGeo = new THREE.SphereGeometry(0.72, 24, 24);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.castShadow = true;
  headPivot.add(head);

  // Styled Side-Part Hair
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.75, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55), hairMat);
  hairCap.position.y = 0.07;
  hairCap.castShadow = true;
  headPivot.add(hairCap);

  // Bangs
  const bang1 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), hairMat);
  bang1.position.set(-0.25, 0.45, 0.52);
  bang1.scale.set(1.4, 0.7, 0.8);
  const bang2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), hairMat);
  bang2.position.set(0.3, 0.45, 0.48);
  bang2.scale.set(1.2, 0.6, 0.8);
  headPivot.add(bang1, bang2);
  group.add(headPivot);

  // Torso / White Collared Shirt
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.95, 0.55), shirtMat);
  torso.position.y = 1.45;
  torso.castShadow = true;
  group.add(torso);

  // Arms with Shoulder Pivots for Walking Swing
  const armL_pivot = new THREE.Group();
  armL_pivot.position.set(-0.55, 1.8, 0);
  const armL_mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.55, 8, 8), shirtMat);
  armL_mesh.position.y = -0.35;
  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), new THREE.MeshStandardMaterial({ color: 0xF6D9C8 }));
  handL.position.y = -0.7;
  armL_pivot.add(armL_mesh, handL);
  group.add(armL_pivot);

  const armR_pivot = new THREE.Group();
  armR_pivot.position.set(0.55, 1.8, 0);
  const armR_mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.55, 8, 8), shirtMat);
  armR_mesh.position.y = -0.35;
  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), new THREE.MeshStandardMaterial({ color: 0xF6D9C8 }));
  handR.position.y = -0.7;
  armR_pivot.add(armR_mesh, handR);
  group.add(armR_pivot);

  // Legs with Hip Pivots for Walking Swing
  const legL_pivot = new THREE.Group();
  legL_pivot.position.set(-0.25, 0.95, 0);
  const legL_mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.17, 0.85, 12), pantsMat);
  legL_mesh.position.y = -0.42;
  legL_mesh.castShadow = true;
  const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.38), shoesMat);
  shoeL.position.set(0, -0.85, 0.08);
  shoeL.castShadow = true;
  legL_pivot.add(legL_mesh, shoeL);
  group.add(legL_pivot);

  const legR_pivot = new THREE.Group();
  legR_pivot.position.set(0.25, 0.95, 0);
  const legR_mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.17, 0.85, 12), pantsMat);
  legR_mesh.position.y = -0.42;
  legR_mesh.castShadow = true;
  const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.38), shoesMat);
  shoeR.position.set(0, -0.85, 0.08);
  shoeR.castShadow = true;
  legR_pivot.add(legR_mesh, shoeR);
  group.add(legR_pivot);

  group.userData = {
    head: headPivot,
    torso,
    armL: armL_pivot,
    armR: armR_pivot,
    legL: legL_pivot,
    legR: legR_pivot,
  };

  return group;
}

// 2. Build Chibi Princess (Farheena) with articulated joints
export function createChibiPrincess() {
  const group = new THREE.Group();
  group.name = 'princess';

  const skinMat = new THREE.MeshStandardMaterial({
    map: createChibiFaceTexture({ skinColor: '#F7D7C4' }),
    roughness: 0.6
  });
  const hijabMat = new THREE.MeshStandardMaterial({ color: 0xcdb49e, roughness: 0.75 });
  const dressMat = new THREE.MeshStandardMaterial({ color: 0xe86b8c, roughness: 0.6 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xf7c844, roughness: 0.25, metalness: 0.85 });

  // Head Pivot
  const headPivot = new THREE.Group();
  headPivot.position.y = 2.45;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.70, 24, 24), skinMat);
  head.castShadow = true;
  headPivot.add(head);

  // Hijab wrap around head
  const hijabCap = new THREE.Mesh(new THREE.SphereGeometry(0.76, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65), hijabMat);
  hijabCap.position.y = 0.03;
  hijabCap.castShadow = true;
  headPivot.add(hijabCap);

  // Golden Tiara on Hijab
  const tiara = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 8, 16), goldMat);
  tiara.rotation.x = Math.PI / 2;
  tiara.position.set(0, 0.7, 0.15);
  headPivot.add(tiara);
  group.add(headPivot);

  // Hijab shoulder drape
  const hijabDrape = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.8, 16), hijabMat);
  hijabDrape.position.set(0, 1.85, 0.05);
  hijabDrape.rotation.x = 0.1;
  group.add(hijabDrape);

  // Dress Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.85, 0.5), dressMat);
  torso.position.y = 1.45;
  torso.castShadow = true;
  group.add(torso);

  // Dress Skirt (pivots gently while walking)
  const skirtPivot = new THREE.Group();
  skirtPivot.position.y = 1.1;
  const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.05, 16), dressMat);
  skirt.position.y = -0.45;
  skirt.castShadow = true;
  skirtPivot.add(skirt);
  group.add(skirtPivot);

  // Arms with Shoulder Pivots
  const armL_pivot = new THREE.Group();
  armL_pivot.position.set(-0.5, 1.75, 0);
  const armL_mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.5, 8, 8), dressMat);
  armL_mesh.position.y = -0.3;
  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), new THREE.MeshStandardMaterial({ color: 0xF7D7C4 }));
  handL.position.y = -0.6;
  armL_pivot.add(armL_mesh, handL);
  group.add(armL_pivot);

  const armR_pivot = new THREE.Group();
  armR_pivot.position.set(0.5, 1.75, 0);
  const armR_mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.5, 8, 8), dressMat);
  armR_mesh.position.y = -0.3;
  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), new THREE.MeshStandardMaterial({ color: 0xF7D7C4 }));
  handR.position.y = -0.6;
  armR_pivot.add(armR_mesh, handR);
  group.add(armR_pivot);

  // Feet peeking from skirt
  const feetMat = new THREE.MeshStandardMaterial({ color: 0xd84a6e });
  const legL_pivot = new THREE.Group();
  legL_pivot.position.set(-0.2, 0.8, 0);
  const footL = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), feetMat);
  footL.position.set(0, -0.7, 0.05);
  legL_pivot.add(footL);
  group.add(legL_pivot);

  const legR_pivot = new THREE.Group();
  legR_pivot.position.set(0.2, 0.8, 0);
  const footR = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), feetMat);
  footR.position.set(0, -0.7, 0.05);
  legR_pivot.add(footR);
  group.add(legR_pivot);

  group.userData = {
    head: headPivot,
    torso,
    skirt: skirtPivot,
    armL: armL_pivot,
    armR: armR_pivot,
    legL: legL_pivot,
    legR: legR_pivot,
  };

  return group;
}

// 3. Build Chibi Orange Tabby Cat with walking paws
export function createChibiCat() {
  const group = new THREE.Group();
  group.name = 'cat';

  const catMat = new THREE.MeshStandardMaterial({ color: 0xe68a3e, roughness: 0.6 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });

  // Body
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 0.45, 8, 12), catMat);
  body.rotation.x = Math.PI / 2;
  body.position.y = 0.35;
  body.castShadow = true;
  group.add(body);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), catMat);
  head.position.set(0, 0.55, 0.3);
  head.castShadow = true;
  group.add(head);

  // Ears
  const ear1 = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.18, 4), catMat);
  ear1.position.set(-0.16, 0.8, 0.28);
  const ear2 = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.18, 4), catMat);
  ear2.position.set(0.16, 0.8, 0.28);
  group.add(ear1, ear2);

  // White Muzzle
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), whiteMat);
  muzzle.position.set(0, 0.48, 0.48);
  group.add(muzzle);

  // Eyes (Green Cat Eyes)
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x48c774 });
  const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), eyeMat);
  eye1.position.set(-0.1, 0.58, 0.5);
  const eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), eyeMat);
  eye2.position.set(0.1, 0.58, 0.5);
  group.add(eye1, eye2);

  // Tail Pivot
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.45, -0.25);
  const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.45, 8), catMat);
  tailMesh.position.set(0, 0.2, -0.15);
  tailMesh.rotation.x = -Math.PI / 4;
  tailPivot.add(tailMesh);
  group.add(tailPivot);

  // 4 Legs with Pivots for Walking Trot
  const legFL = new THREE.Group(); legFL.position.set(-0.14, 0.25, 0.18);
  const mFL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25), whiteMat);
  mFL.position.y = -0.12; legFL.add(mFL); group.add(legFL);

  const legFR = new THREE.Group(); legFR.position.set(0.14, 0.25, 0.18);
  const mFR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25), whiteMat);
  mFR.position.y = -0.12; legFR.add(mFR); group.add(legFR);

  const legBL = new THREE.Group(); legBL.position.set(-0.14, 0.25, -0.18);
  const mBL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25), whiteMat);
  mBL.position.y = -0.12; legBL.add(mBL); group.add(legBL);

  const legBR = new THREE.Group(); legBR.position.set(0.14, 0.25, -0.18);
  const mBR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25), whiteMat);
  mBR.position.y = -0.12; legBR.add(mBR); group.add(legBR);

  group.userData = {
    head,
    tail: tailPivot,
    legFL, legFR, legBL, legBR
  };

  return group;
}
