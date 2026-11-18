import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { websiteContent } from '../data/websiteContent';
import { createChibiPrince, createChibiPrincess, createChibiCat } from '../utils/cutieCharacterBuilder';

export default function ThreeFairytaleWorld({
  currentStationId,
  onStationTrigger,
  explorationMode,
  activeActionKey = null,
  isEnactingAction = false,
  onArrivalAtStation = () => {}
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);
  const stationsGroupRef = useRef(new Map());
  const gatesRef = useRef({ left: null, right: null, open: false });
  const waterRef = useRef(null);
  const crownRef = useRef(null);
  const dragonRef = useRef(null);
  const swanBoatRef = useRef(null);
  const teapotRef = useRef(null);
  const coinRef = useRef(null);
  const dovesGroupRef = useRef(null);

  // Characters Group & References
  const charactersGroupRef = useRef(null);
  const princeRef = useRef(null);
  const princessRef = useRef(null);
  const catRef = useRef(null);

  // Character walk state & interpolation
  const charPos = useRef({ x: 0, z: 22 });
  const charTarget = useRef({ x: 0, z: 22 });
  const walkCycle = useRef(0);
  const hasTriggeredArrival = useRef(false);

  // Controls for walk mode
  const keysPressed = useRef({});
  const joystickCenter = useRef({ x: 0, y: 0 });
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickKnob, setJoystickKnob] = useState({ x: 0, y: 0 });

  // Camera targets
  const camCurrent = useRef({ x: 0, y: 15, z: 35 });
  const camLookCurrent = useRef({ x: 0, y: 2, z: 0 });

  // Update target when currentStationId changes in Tour Mode
  useEffect(() => {
    if (explorationMode === 'tour') {
      const station = websiteContent.stations.find((s) => s.id === currentStationId) || websiteContent.stations[0];
      // Target position slightly in front of station
      charTarget.current = {
        x: station.position[0],
        z: station.position[2] + 2.5
      };
      hasTriggeredArrival.current = false;
    }
  }, [currentStationId, explorationMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Daylight Sky (CutiePage aesthetic)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    scene.background = new THREE.Color(0xdde8f5);
    scene.fog = new THREE.FogExp2(0xeaf0f8, 0.012);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 300);
    camera.position.set(0, 16, 36);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights (Warm golden daylight)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    sunLight.position.set(30, 48, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const textureLoader = new THREE.TextureLoader();

    // 5. Environment
    // Shimmering Lake
    const waterGeo = new THREE.PlaneGeometry(180, 180, 32, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x769ecb,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.3;
    scene.add(waterMesh);
    waterRef.current = waterMesh;

    // Island (Grass)
    const islandGeo = new THREE.CylinderGeometry(26, 32, 2.8, 48);
    const islandMat = new THREE.MeshStandardMaterial({ color: 0x759b6a, roughness: 0.85 });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.y = 0.5;
    islandMesh.receiveShadow = true;
    scene.add(islandMesh);

    // Sandy Cobblestone Path
    const pathGeo = new THREE.RingGeometry(0.5, 19, 32, 8);
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xeadccf, roughness: 0.9, side: THREE.DoubleSide });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.rotation.x = -Math.PI / 2;
    pathMesh.position.y = 1.92;
    pathMesh.receiveShadow = true;
    scene.add(pathMesh);

    // Fluffy Clouds
    for (let c = 0; c < 8; c++) {
      const cloudGroup = new THREE.Group();
      const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      for (let p = 0; p < 4; p++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(2 + Math.random() * 2, 8, 8), cloudMat);
        puff.position.set(p * 2.2, Math.random() * 0.8, (Math.random() - 0.5) * 1.5);
        cloudGroup.add(puff);
      }
      const angle = (c / 8) * Math.PI * 2;
      cloudGroup.position.set(Math.cos(angle) * 55, 25 + Math.random() * 10, Math.sin(angle) * 55);
      scene.add(cloudGroup);
    }

    // Streetlamps with glowing lanterns along path
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x33282f });
    const glassMat = new THREE.MeshBasicMaterial({ color: 0xfff0b3 });
    [[-3.2, 18], [3.2, 18], [-8, 12], [8, 10], [-10, 0], [10, 0]].forEach(([lx, lz]) => {
      const lamp = new THREE.Group();
      lamp.position.set(lx, 1.9, lz);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3.2), lampMat);
      post.position.y = 1.6;
      const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.35), glassMat);
      lantern.position.y = 3.3;
      lamp.add(post, lantern);
      scene.add(lamp);
    });

    // 6. The Castle
    const castleGroup = new THREE.Group();
    castleGroup.position.set(0, 1.9, 0);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xf3e8ee, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xe86b8c, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf7c844, roughness: 0.25, metalness: 0.85 });

    const keep = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 8), stoneMat);
    keep.position.y = 4;
    keep.castShadow = true;
    keep.receiveShadow = true;
    castleGroup.add(keep);

    const towerPositions = [[-5, 6, -4], [5, 6, -4], [-5, 6, 4], [5, 6, 4]];
    towerPositions.forEach(([tx, ty, tz]) => {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 12, 16), stoneMat);
      tower.position.set(tx, ty, tz);
      tower.castShadow = true;
      castleGroup.add(tower);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(2.1, 5, 16), roofMat);
      roof.position.set(tx, ty + 8.2, tz);
      roof.castShadow = true;
      castleGroup.add(roof);

      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2), goldMat);
      spire.position.set(tx, ty + 11.2, tz);
      castleGroup.add(spire);
    });

    const centerTower = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.3, 14, 16), stoneMat);
    centerTower.position.set(0, 8, -0.5);
    centerTower.castShadow = true;
    castleGroup.add(centerTower);
    const centerRoof = new THREE.Mesh(new THREE.ConeGeometry(2.7, 7, 16), roofMat);
    centerRoof.position.set(0, 18, -0.5);
    castleGroup.add(centerRoof);

    // Glowing beam
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 40, 16),
      new THREE.MeshBasicMaterial({ color: 0xffb6c1, transparent: true, opacity: 0.25 })
    );
    beam.position.set(0, 25, -0.5);
    castleGroup.add(beam);

    scene.add(castleGroup);

    // 7. Stations
    // Station 1: Gates & Banner
    const gatesGroup = new THREE.Group();
    gatesGroup.position.set(0, 1.9, 18);
    const archBar = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.15, 8, 24, Math.PI), goldMat);
    archBar.position.y = 3.6;
    gatesGroup.add(archBar);

    const bannerCanvas = document.createElement('canvas');
    bannerCanvas.width = 512;
    bannerCanvas.height = 128;
    const bctx = bannerCanvas.getContext('2d');
    bctx.fillStyle = '#FFFFFF';
    bctx.roundRect(0, 0, 512, 128, 20);
    bctx.fill();
    bctx.strokeStyle = '#F3D7DF';
    bctx.lineWidth = 6;
    bctx.stroke();
    bctx.fillStyle = '#6E5868';
    bctx.font = 'bold 24px sans-serif';
    bctx.textAlign = 'center';
    bctx.fillText('Welcome, Princess', 256, 45);
    bctx.fillStyle = '#D84A6E';
    bctx.font = 'bold 44px cursive';
    bctx.fillText('Farheena', 256, 95);
    const bannerTex = new THREE.CanvasTexture(bannerCanvas);
    const bannerMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), new THREE.MeshBasicMaterial({ map: bannerTex }));
    bannerMesh.position.set(0, 3.8, 0);
    gatesGroup.add(bannerMesh);

    const gateWingL = new THREE.Mesh(new THREE.BoxGeometry(2.3, 3.6, 0.15), goldMat);
    gateWingL.position.set(-1.25, 1.8, 0);
    const gateWingR = new THREE.Mesh(new THREE.BoxGeometry(2.3, 3.6, 0.15), goldMat);
    gateWingR.position.set(1.25, 1.8, 0);
    gatesGroup.add(gateWingL, gateWingR);
    gatesRef.current = { left: gateWingL, right: gateWingR, open: false };
    scene.add(gatesGroup);

    // Station 2: Rose Garden (-10, 1.9, 10)
    const roseGroup = new THREE.Group();
    roseGroup.position.set(-10, 1.9, 10);
    const trellis = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.15, 12, 24, Math.PI), new THREE.MeshStandardMaterial({ color: 0x4e7246 }));
    trellis.position.y = 2.4;
    trellis.rotation.y = Math.PI / 4;
    roseGroup.add(trellis);
    for (let i = 0; i < 16; i++) {
      const bloom = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28), new THREE.MeshStandardMaterial({ color: 0xd84a6e }));
      const angle = (i / 16) * Math.PI;
      bloom.position.set(
        Math.cos(angle) * 2.3 * Math.cos(Math.PI / 4),
        2.4 + Math.sin(angle) * 2.3,
        Math.cos(angle) * 2.3 * Math.sin(Math.PI / 4)
      );
      roseGroup.add(bloom);
    }
    scene.add(roseGroup);

    // Station 3: Royal Tea Party (11, 1.9, 8)
    const teaGroup = new THREE.Group();
    teaGroup.position.set(11, 1.9, 8);
    const table = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.15, 24), stoneMat);
    table.position.y = 1.3;
    const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 1.3, 12), stoneMat);
    tableLeg.position.y = 0.65;
    const parasol = new THREE.Mesh(new THREE.ConeGeometry(2.5, 1, 16), new THREE.MeshStandardMaterial({ color: 0xe86b8c }));
    parasol.position.set(0, 3.6, 0);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.6, 8), goldMat);
    pole.position.set(0, 1.8, 0);
    const teapot = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), goldMat);
    teapot.position.set(0, 1.55, 0);
    teapotRef.current = teapot;
    teaGroup.add(table, tableLeg, parasol, pole, teapot);
    scene.add(teaGroup);

    // Station 4: Baby Dragon (14, 1.9, -4)
    const dragonGroup = new THREE.Group();
    dragonGroup.position.set(14, 1.9, -4);
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0x7a7182 }));
    rock.position.y = 0.8;
    const dragonMat = new THREE.MeshStandardMaterial({ color: 0x76c498, roughness: 0.6 });
    const dragonBody = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), dragonMat);
    dragonBody.position.set(0, 1.8, 0);
    const dragonHead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), dragonMat);
    dragonHead.position.set(0.6, 2.3, 0);
    dragonGroup.add(rock, dragonBody, dragonHead);
    dragonRef.current = dragonGroup;
    scene.add(dragonGroup);

    // Station 5: Wishing Well (-12, 1.9, -2)
    const wellGroup = new THREE.Group();
    wellGroup.position.set(-12, 1.9, -2);
    const wellCyl = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 1.4, 24, 1, true), stoneMat);
    wellCyl.position.y = 0.7;
    const wellWater = new THREE.Mesh(new THREE.CircleGeometry(1.3, 24), new THREE.MeshBasicMaterial({ color: 0x48e5c2 }));
    wellWater.rotation.x = -Math.PI / 2;
    wellWater.position.y = 0.55;
    const wellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.2, 4), roofMat);
    wellRoof.position.y = 2.6;
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), goldMat);
    coin.position.set(0, 4.0, 0);
    coin.visible = false;
    coinRef.current = coin;
    wellGroup.add(wellCyl, wellWater, wellRoof, coin);
    scene.add(wellGroup);

    // Station 6: Swan Boat (-14, 0.4, -12)
    const swanGroup = new THREE.Group();
    swanGroup.position.set(-14, 0.4, -12);
    const boatBase = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.2, 0.6, 16), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    boatBase.position.y = 0.3;
    const swanNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    swanNeck.position.set(1.2, 1.1, 0);
    swanNeck.rotation.z = -Math.PI / 6;
    const swanHead = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    swanHead.position.set(1.6, 1.9, 0);
    swanGroup.add(boatBase, swanNeck, swanHead);
    swanBoatRef.current = swanGroup;
    scene.add(swanGroup);

    // Station 7: Royal Portrait Easel (8, 1.9, -12) with Real Couple Portrait
    const easelGroup = new THREE.Group();
    easelGroup.position.set(8, 1.9, -12);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
    const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2), woodMat);
    leg1.rotation.z = -0.2; leg1.position.set(-0.5, 1.6, 0);
    const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2), woodMat);
    leg2.rotation.z = 0.2; leg2.position.set(0.5, 1.6, 0);
    const goldFrame = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.8, 0.2), goldMat);
    goldFrame.position.set(0, 1.8, 0.1);

    textureLoader.load('/photos/couple-portrait.jpg', (portraitTex) => {
      portraitTex.colorSpace = THREE.SRGBColorSpace;
      const canvasMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 2.4), new THREE.MeshBasicMaterial({ map: portraitTex }));
      canvasMesh.position.set(0, 1.8, 0.22);
      easelGroup.add(canvasMesh);
    });
    easelGroup.add(leg1, leg2, goldFrame);
    scene.add(easelGroup);

    // Station 8: Dancing Gazebo (0, 1.9, -10)
    const gazeboGroup = new THREE.Group();
    gazeboGroup.position.set(0, 1.9, -10);
    const gazeboFloor = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.2, 8), stoneMat);
    gazeboFloor.position.y = 0.1;
    const gazeboRoof = new THREE.Mesh(new THREE.ConeGeometry(3.8, 1.8, 8), roofMat);
    gazeboRoof.position.y = 3.6;
    gazeboGroup.add(gazeboFloor, gazeboRoof);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.8), stoneMat);
      p.position.set(Math.cos(angle) * 2.8, 1.5, Math.sin(angle) * 2.8);
      gazeboGroup.add(p);
    }
    scene.add(gazeboGroup);

    // Station 9: Doves on Tower (-4, 1.9, -18)
    const dovesGroup = new THREE.Group();
    dovesGroup.position.set(-4, 10, -18);
    for (let i = 0; i < 6; i++) {
      const dove = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      dove.rotation.x = Math.PI / 2;
      dovesGroup.add(dove);
    }
    dovesGroupRef.current = dovesGroup;
    scene.add(dovesGroup);

    // Station 10: Royal Throne (0, 1.9, 4)
    const throneGroup = new THREE.Group();
    throneGroup.position.set(0, 1.9, 4);
    const dais = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.0, 0.4, 24), stoneMat);
    dais.position.y = 0.2;
    const velvetMat = new THREE.MeshStandardMaterial({ color: 0x8b0032, roughness: 0.5 });
    const throneSeat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 1.3), velvetMat);
    throneSeat.position.set(0, 0.7, 0);
    const throneBack = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.4, 0.3), velvetMat);
    throneBack.position.set(0, 2.0, -0.5);
    const throneTrim = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.1, 8, 16), goldMat);
    throneTrim.position.set(0, 2.9, -0.45);
    throneGroup.add(dais, throneSeat, throneBack, throneTrim);

    const crownMesh = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.12, 12, 24), goldMat);
    crownMesh.rotation.x = Math.PI / 2;
    crownMesh.position.set(0, 3.3, 0.1);
    throneGroup.add(crownMesh);
    crownRef.current = crownMesh;
    scene.add(throneGroup);

    // 8. BUILD 3D CHIBI CHARACTERS
    const charactersGroup = new THREE.Group();
    charactersGroup.position.set(0, 1.9, 21);

    const prince = createChibiPrince();
    prince.position.set(0.55, 0, 0);
    princeRef.current = prince;
    charactersGroup.add(prince);

    const princess = createChibiPrincess();
    princess.position.set(-0.55, 0, 0);
    princessRef.current = princess;
    charactersGroup.add(princess);

    const cat = createChibiCat();
    cat.position.set(1.4, 0, 0.2);
    catRef.current = cat;
    charactersGroup.add(cat);

    charactersGroupRef.current = charactersGroup;
    scene.add(charactersGroup);

    // Station Beacons
    websiteContent.stations.forEach((st) => {
      const beacon = new THREE.Mesh(
        new THREE.RingGeometry(0.8, 1.1, 24),
        new THREE.MeshBasicMaterial({ color: 0xd84a6e, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
      );
      beacon.rotation.x = -Math.PI / 2;
      beacon.position.set(st.position[0], 1.95, st.position[2]);
      scene.add(beacon);
      stationsGroupRef.current.set(st.id, beacon);
    });

    // Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Keyboard
    const handleKeyDown = (e) => { keysPressed.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e) => { keysPressed.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 9. ANIMATION LOOP WITH ACTIVE LOCOMOTION
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Water shimmer
      if (waterRef.current) waterRef.current.position.y = -0.3 + Math.sin(elapsed * 1.5) * 0.03;

      // Gate opening animation
      if (activeActionKey === 'gates' && gatesRef.current) {
        gatesRef.current.left.rotation.y = THREE.MathUtils.lerp(gatesRef.current.left.rotation.y, -Math.PI / 2.2, 0.05);
        gatesRef.current.right.rotation.y = THREE.MathUtils.lerp(gatesRef.current.right.rotation.y, Math.PI / 2.2, 0.05);
      }

      // Check walking movement in either Free-Walk mode OR Tour Mode
      let moving = false;
      let targetRotY = null;

      if (explorationMode === 'walk' && charactersGroupRef.current) {
        let moveX = 0;
        let moveZ = 0;
        if (keysPressed.current['w'] || keysPressed.current['arrowup']) moveZ -= 0.16;
        if (keysPressed.current['s'] || keysPressed.current['arrowdown']) moveZ += 0.16;
        if (keysPressed.current['a'] || keysPressed.current['arrowleft']) moveX -= 0.16;
        if (keysPressed.current['d'] || keysPressed.current['arrowright']) moveX += 0.16;

        if (joystickActive) {
          moveX += (joystickKnob.x / 40) * 0.16;
          moveZ += (joystickKnob.y / 40) * 0.16;
        }

        if (Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01) {
          moving = true;
          charPos.current.x += moveX;
          charPos.current.z += moveZ;

          const dist = Math.hypot(charPos.current.x, charPos.current.z);
          if (dist > 23) {
            charPos.current.x = (charPos.current.x / dist) * 23;
            charPos.current.z = (charPos.current.z / dist) * 23;
          }

          charactersGroupRef.current.position.x = charPos.current.x;
          charactersGroupRef.current.position.z = charPos.current.z;
          targetRotY = Math.atan2(moveX, moveZ);

          // Check station proximity
          websiteContent.stations.forEach((st) => {
            const dToStation = Math.hypot(charPos.current.x - st.position[0], charPos.current.z - st.position[2]);
            if (dToStation < 3.2 && currentStationId !== st.id) {
              onStationTrigger(st.id);
            }
          });
        }

        camCurrent.current.x = THREE.MathUtils.lerp(camCurrent.current.x, charPos.current.x, 0.06);
        camCurrent.current.y = THREE.MathUtils.lerp(camCurrent.current.y, 8, 0.06);
        camCurrent.current.z = THREE.MathUtils.lerp(camCurrent.current.z, charPos.current.z + 10, 0.06);

        camLookCurrent.current.x = THREE.MathUtils.lerp(camLookCurrent.current.x, charPos.current.x, 0.08);
        camLookCurrent.current.y = THREE.MathUtils.lerp(camLookCurrent.current.y, 2.5, 0.08);
        camLookCurrent.current.z = THREE.MathUtils.lerp(camLookCurrent.current.z, charPos.current.z, 0.08);
      } else if (charactersGroupRef.current) {
        // TOUR MODE: Active path traversal between stations!
        let targetX = charTarget.current.x;
        let targetZ = charTarget.current.z;

        // When enacting an action, move characters specifically into the action scene!
        if (isEnactingAction) {
          if (activeActionKey === 'gates') {
            targetZ = 15.5; // Walk forward through the opened gates!
          } else if (activeActionKey === 'roses') {
            targetX = -10; targetZ = 11.2; // Walk right up to the rose trellis!
          } else if (activeActionKey === 'tea') {
            targetX = 11; targetZ = 9.2; // Walk up to the tea table!
          } else if (activeActionKey === 'dragon') {
            targetX = 13.2; targetZ = -3.2; // Walk up to pet the dragon!
          } else if (activeActionKey === 'wishing-well') {
            targetX = -11.2; targetZ = -1.2; // Walk right to the well rim!
          } else if (activeActionKey === 'swan-boat') {
            targetX = -13.5; targetZ = -11.5; // Walk onto the boat dock!
          } else if (activeActionKey === 'portrait') {
            targetX = 8; targetZ = -10.5; // Walk up to the easel!
          } else if (activeActionKey === 'dance') {
            targetX = 0; targetZ = -10; // Walk to the center of gazebo!
          } else if (activeActionKey === 'coronation') {
            targetX = 0; targetZ = 4.2; // Walk up to the throne dais!
          }
        }

        const dx = targetX - charPos.current.x;
        const dz = targetZ - charPos.current.z;
        const distToTarget = Math.hypot(dx, dz);

        if (distToTarget > 0.2) {
          moving = true;
          // Natural walking speed
          const walkSpeed = 0.08;
          charPos.current.x += (dx / distToTarget) * walkSpeed;
          charPos.current.z += (dz / distToTarget) * walkSpeed;

          charactersGroupRef.current.position.x = charPos.current.x;
          charactersGroupRef.current.position.z = charPos.current.z;
          targetRotY = Math.atan2(dx, dz);
        } else {
          // Arrived at station!
          if (!hasTriggeredArrival.current && !isEnactingAction) {
            hasTriggeredArrival.current = true;
            onArrivalAtStation(currentStationId);
          }
          // Turn to face camera or partner
          targetRotY = Math.atan2(
            camCurrent.current.x - charactersGroupRef.current.position.x,
            camCurrent.current.z - charactersGroupRef.current.position.z
          );
        }

        // Camera smoothly moves with guided tour
        const currentStation = websiteContent.stations.find((s) => s.id === currentStationId) || websiteContent.stations[0];
        const targetCam = currentStation.targetCamera;
        const targetPos = currentStation.position;

        camCurrent.current.x = THREE.MathUtils.lerp(camCurrent.current.x, targetCam[0], 0.04);
        camCurrent.current.y = THREE.MathUtils.lerp(camCurrent.current.y, targetCam[1], 0.04);
        camCurrent.current.z = THREE.MathUtils.lerp(camCurrent.current.z, targetCam[2], 0.04);

        camLookCurrent.current.x = THREE.MathUtils.lerp(camLookCurrent.current.x, targetPos[0], 0.05);
        camLookCurrent.current.y = THREE.MathUtils.lerp(camLookCurrent.current.y, 2.2, 0.05);
        camLookCurrent.current.z = THREE.MathUtils.lerp(camLookCurrent.current.z, targetPos[2], 0.05);
      }

      // Smooth Character Rotation
      if (targetRotY !== null && charactersGroupRef.current) {
        charactersGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          charactersGroupRef.current.rotation.y,
          targetRotY,
          0.12
        );
      }

      // ACTIVE WALKING LIMB CYCLES!
      const p = princeRef.current?.userData;
      const f = princessRef.current?.userData;
      const c = catRef.current?.userData;

      if (moving) {
        walkCycle.current += delta * 12;
        const cycle = walkCycle.current;

        // Up-and-down footstep bounce
        charactersGroupRef.current.position.y = 1.9 + Math.abs(Math.sin(cycle)) * 0.1;

        // Prince Limbs
        if (p) {
          p.legL.rotation.x = Math.sin(cycle) * 0.65;
          p.legR.rotation.x = -Math.sin(cycle) * 0.65;
          p.armL.rotation.x = -Math.sin(cycle) * 0.5; // Outer arm swings
          p.armR.rotation.x = 0.15; // Inner arm holds Farheena's hand
        }

        // Princess Farheena Limbs
        if (f) {
          f.legL.rotation.x = -Math.sin(cycle) * 0.55;
          f.legR.rotation.x = Math.sin(cycle) * 0.55;
          f.skirt.rotation.z = Math.sin(cycle) * 0.07;
          f.armR.rotation.x = Math.sin(cycle) * 0.5; // Outer arm swings
          f.armL.rotation.x = -0.15; // Inner arm holds Faheem's hand
        }

        // Cat Quadruped Trot Gait
        if (c) {
          c.legFL.rotation.x = Math.sin(cycle * 1.4) * 0.55;
          c.legBR.rotation.x = Math.sin(cycle * 1.4) * 0.55;
          c.legFR.rotation.x = -Math.sin(cycle * 1.4) * 0.55;
          c.legBL.rotation.x = -Math.sin(cycle * 1.4) * 0.55;
          c.tail.rotation.z = Math.sin(cycle * 2) * 0.4;
        }
      } else {
        // IDLE BREATHING & SWEET IDLE LIFE ANIMATION
        charactersGroupRef.current.position.y = THREE.MathUtils.lerp(charactersGroupRef.current.position.y, 1.9, 0.1);

        // Prince Idle
        if (p) {
          p.legL.rotation.x = THREE.MathUtils.lerp(p.legL.rotation.x, 0, 0.15);
          p.legR.rotation.x = THREE.MathUtils.lerp(p.legR.rotation.x, 0, 0.15);
          p.armL.rotation.x = THREE.MathUtils.lerp(p.armL.rotation.x, 0.1, 0.15);
          p.armR.rotation.x = THREE.MathUtils.lerp(p.armR.rotation.x, 0.15, 0.15);
          p.torso.scale.y = 1 + Math.sin(elapsed * 2.5) * 0.02; // Subtle breathing
          p.head.rotation.y = -0.15 + Math.sin(elapsed * 1.5) * 0.04; // Looking softly at Farheena
        }

        // Princess Farheena Idle
        if (f) {
          f.legL.rotation.x = THREE.MathUtils.lerp(f.legL.rotation.x, 0, 0.15);
          f.legR.rotation.x = THREE.MathUtils.lerp(f.legR.rotation.x, 0, 0.15);
          f.armL.rotation.x = THREE.MathUtils.lerp(f.armL.rotation.x, -0.15, 0.15);
          f.armR.rotation.x = THREE.MathUtils.lerp(f.armR.rotation.x, 0.1, 0.15);
          f.skirt.rotation.z = THREE.MathUtils.lerp(f.skirt.rotation.z, 0, 0.15);
          f.torso.scale.y = 1 + Math.sin(elapsed * 2.5) * 0.02; // Subtle breathing
          f.head.rotation.y = 0.15 - Math.sin(elapsed * 1.5) * 0.04; // Looking softly at Faheem
        }

        // Cat Idle
        if (c) {
          c.legFL.rotation.x = THREE.MathUtils.lerp(c.legFL.rotation.x, 0, 0.15);
          c.legFR.rotation.x = THREE.MathUtils.lerp(c.legFR.rotation.x, 0, 0.15);
          c.legBL.rotation.x = THREE.MathUtils.lerp(c.legBL.rotation.x, 0, 0.15);
          c.legBR.rotation.x = THREE.MathUtils.lerp(c.legBR.rotation.x, 0, 0.15);
          c.tail.rotation.z = Math.sin(elapsed * 3) * 0.35; // Wagging tail
        }
      }

      // Action Enactment Animations (When user clicks on the action texts!)
      if (isEnactingAction && princeRef.current && princessRef.current) {
        if (activeActionKey === 'roses') {
          // Prince kneels down on one knee and offers rose to Farheena!
          princeRef.current.position.y = THREE.MathUtils.lerp(princeRef.current.position.y, -0.42, 0.08);
          princeRef.current.rotation.x = THREE.MathUtils.lerp(princeRef.current.rotation.x, 0.22, 0.08);
        } else if (activeActionKey === 'tea' && teapotRef.current) {
          // Teapot pours!
          teapotRef.current.rotation.z = Math.sin(elapsed * 4) * 0.3;
        } else if (activeActionKey === 'dance' && charactersGroupRef.current) {
          // Romantic waltz spin!
          charactersGroupRef.current.rotation.y = elapsed * 1.2;
        } else if (activeActionKey === 'coronation' && crownRef.current) {
          // Golden tiara descends onto Farheena's head!
          crownRef.current.position.y = THREE.MathUtils.lerp(crownRef.current.position.y, 2.7, 0.05);
          princessRef.current.position.y = THREE.MathUtils.lerp(princessRef.current.position.y, 0.7, 0.08);
          princeRef.current.position.set(1.4, 0, 0.4);
        } else if (activeActionKey === 'dragon' && dragonRef.current) {
          // Dragon flaps wings and breathes!
          dragonRef.current.rotation.y = Math.sin(elapsed * 4) * 0.2;
        } else if (activeActionKey === 'swan-boat' && swanBoatRef.current) {
          // Swan boat glides forward!
          swanBoatRef.current.position.x = -14 + Math.sin(elapsed * 1.5) * 1.5;
        }
      }

      camera.position.set(camCurrent.current.x, camCurrent.current.y, camCurrent.current.z);
      camera.lookAt(camLookCurrent.current.x, camLookCurrent.current.y, camLookCurrent.current.z);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Joystick touch handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    joystickCenter.current = { x: touch.clientX, y: touch.clientY };
    setJoystickActive(true);
  };
  const handleTouchMove = (e) => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickCenter.current.x;
    const dy = touch.clientY - joystickCenter.current.y;
    const dist = Math.hypot(dx, dy);
    const maxDist = 40;
    if (dist > maxDist) {
      setJoystickKnob({ x: (dx / dist) * maxDist, y: (dy / dist) * maxDist });
    } else {
      setJoystickKnob({ x: dx, y: dy });
    }
  };
  const handleTouchEnd = () => {
    setJoystickActive(false);
    setJoystickKnob({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* On-screen joystick for walk mode */}
      {explorationMode === 'walk' && (
        <div
          className="absolute bottom-6 left-6 z-20 w-28 h-28 rounded-full bg-white/40 backdrop-blur-md border border-white flex items-center justify-center touch-none md:hidden shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="w-12 h-12 rounded-full bg-[#D84A6E] shadow-md transition-transform"
            style={{ transform: `translate(${joystickKnob.x}px, ${joystickKnob.y}px)` }}
          />
        </div>
      )}

      {/* Desktop Walk instructions pill */}
      {explorationMode === 'walk' && (
        <div className="hidden md:flex absolute bottom-4 left-6 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[11px] text-[#57474E] border border-pink-100 shadow-sm">
          <span>Use <kbd className="px-1.5 py-0.5 rounded bg-pink-100 text-[#D84A6E] font-mono">W A S D</kbd> or Arrow Keys to walk around the castle</span>
        </div>
      )}
    </div>
  );
}
