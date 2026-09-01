import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playClickSound, playHoverSound, playPageFlipSound, playDrawerSlideSound } from "@/lib/audio";
import { Compass, Zap, HelpCircle, Trophy, Eye, ArrowRight, ArrowLeft } from "lucide-react";

interface ThreePortfolioProps {
  activeZone: string;
  onZoneCollide: (zone: string, details?: any) => void;
  virtualKeys: { w: boolean; a: boolean; s: boolean; d: boolean };
}

export function ThreePortfolio({ activeZone, onZoneCollide, virtualKeys }: ThreePortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Game entities refs
  const carRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<{
    fl: THREE.Group;
    fr: THREE.Group;
    bl: THREE.Mesh;
    br: THREE.Mesh;
  } | null>(null);

  // Sparkles and smoke arrays
  const sparklesRef = useRef<THREE.Mesh[]>([]);
  const smokeParticlesRef = useRef<{ mesh: THREE.Mesh; age: number; maxAge: number; vx: number; vz: number }[]>([]);

  // Physics state variables
  const carPhysics = useRef({
    x: 0,
    z: 0,
    speed: 0,
    angle: 0, // car orientation angle in radians
    steerAngle: 0,
    vx: 0,
    vz: 0,
    drift: 0,
    width: 2.4,
    length: 4.5,
  });

  // Target coordinates for teleportation zones
  const zoneCoords = useRef<Record<string, { x: number; z: number; angle: number }>>({
    about: { x: 0, z: 20, angle: Math.PI },
    experiments: { x: 0, z: -45, angle: 0 },
    machines: { x: 45, z: 10, angle: -Math.PI / 2 },
    research: { x: -45, z: 20, angle: Math.PI / 2 },
    timeline: { x: 0, z: 65, angle: 0 },
    cover: { x: 0, z: 0, angle: 0 },
  });

  // Track currently colliding zones to trigger overlay only once per entry
  const currentCollision = useRef<string | null>(null);

  // Input tracking
  const keys = useRef({ w: false, a: false, s: false, d: false });

  // Sync virtual joystick inputs
  useEffect(() => {
    keys.current.w = virtualKeys.w;
    keys.current.a = virtualKeys.a;
    keys.current.s = virtualKeys.s;
    keys.current.d = virtualKeys.d;
  }, [virtualKeys]);

  // Handle keyboard driving keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || e.key === "ArrowUp") keys.current.w = true;
      if (k === "s" || e.key === "ArrowDown") keys.current.s = true;
      if (k === "a" || e.key === "ArrowLeft") keys.current.a = true;
      if (k === "d" || e.key === "ArrowRight") keys.current.d = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || e.key === "ArrowUp") keys.current.w = false;
      if (k === "s" || e.key === "ArrowDown") keys.current.s = false;
      if (k === "a" || e.key === "ArrowLeft") keys.current.a = false;
      if (k === "d" || e.key === "ArrowRight") keys.current.d = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Teleport listener
  useEffect(() => {
    if (activeZone && zoneCoords.current[activeZone]) {
      const target = zoneCoords.current[activeZone];
      carPhysics.current.x = target.x;
      carPhysics.current.z = target.z;
      carPhysics.current.angle = target.angle;
      carPhysics.current.speed = 0;

      // Animate a giant sparkly flash burst at the car coordinates
      if (sceneRef.current) {
        for (let i = 0; i < 40; i++) {
          spawnSparkle(target.x, target.z, true);
        }
      }
      playPageFlipSound();
    }
  }, [activeZone]);

  // Helper to draw text onto 3D billboards procedurally
  const createTextBillboard = (title: string, subtitle: string, color: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Background base
      ctx.fillStyle = "#fffdfa";
      ctx.fillRect(0, 0, 512, 256);
      
      // Sparkly Y2K double border
      ctx.strokeStyle = "#2d2621";
      ctx.lineWidth = 8;
      ctx.strokeRect(12, 12, 488, 232);
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(22, 22, 468, 212);

      // Title Text
      ctx.fillStyle = "#2d2621";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(title.toUpperCase(), 256, 100);

      // Subtitle Text
      ctx.fillStyle = color;
      ctx.font = "bold 20px monospace";
      ctx.fillText(subtitle.toUpperCase(), 256, 160);
      
      // Star sparkles decoration
      ctx.fillStyle = "#d6bdf2";
      ctx.font = "24px sans-serif";
      ctx.fillText("★", 60, 60);
      ctx.fillText("★", 452, 60);
      ctx.fillText("★", 60, 200);
      ctx.fillText("★", 452, 200);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const boardGeom = new THREE.PlaneGeometry(10, 5);
    const boardMat = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.1,
    });
    const boardMesh = new THREE.Mesh(boardGeom, boardMat);
    boardMesh.castShadow = true;

    // Build the signpost support poles (cylinders)
    const signGroup = new THREE.Group();
    signGroup.add(boardMesh);
    boardMesh.position.y = 4.5;

    const poleGeom = new THREE.CylinderGeometry(0.12, 0.12, 5, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2d2621 });
    
    const poleL = new THREE.Mesh(poleGeom, poleMat);
    poleL.position.set(-4, 2, 0);
    poleL.castShadow = true;
    signGroup.add(poleL);

    const poleR = poleL.clone();
    poleR.position.x = 4;
    signGroup.add(poleR);

    return signGroup;
  };

  // Helper to spawn a sparkle mesh in the scene
  const spawnSparkle = (x: number, z: number, burst = false) => {
    if (!sceneRef.current) return;
    const geom = new THREE.OctahedronGeometry(burst ? 0.35 + Math.random() * 0.4 : 0.15 + Math.random() * 0.2, 0);
    const colors = [0xffb3c6, 0xdaeaf6, 0xe8dff5, 0xfff0f5, 0xffe5ec];
    const mat = new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      emissive: 0xffffff,
      emissiveIntensity: 0.4,
      roughness: 0,
      metalness: 0.8
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(
      x + (Math.random() - 0.5) * (burst ? 8 : 2),
      (burst ? 0.5 + Math.random() * 6 : 0.2 + Math.random() * 2),
      z + (Math.random() - 0.5) * (burst ? 8 : 2)
    );
    sceneRef.current.add(mesh);
    sparklesRef.current.push(mesh);

    // Caps sparkle list size
    if (sparklesRef.current.length > 200) {
      const oldest = sparklesRef.current.shift();
      if (oldest) sceneRef.current.remove(oldest);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. SETUP WEBGL SCENE
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfce1e4); // soft Y2K pink sky
    scene.fog = new THREE.FogExp2(0xfce1e4, 0.008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 24, 28);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(30, 45, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // 3. GROUND AND STYLIZED GRID (Pink and Blue)
    const groundGeom = new THREE.PlaneGeometry(300, 300);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xdaeaf6, // soft blue ground
      roughness: 0.85,
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(300, 75, 0xffb3c6, 0xffe5ec); // pink lines grid
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 4. PROCEDURALLY CONSTRUCT FORMULA STUDENT TOY CAR
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carRef.current = carGroup;

    // Main chassis (girly pink)
    const chassisGeom = new THREE.BoxGeometry(2.1, 0.5, 4.2);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0xffb3c6, roughness: 0.1 });
    const chassis = new THREE.Mesh(chassisGeom, chassisMat);
    chassis.position.y = 0.45;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    carGroup.add(chassis);

    // Sidepods (lavender)
    const sidepodGeom = new THREE.BoxGeometry(2.4, 0.4, 1.8);
    const sidepodMat = new THREE.MeshStandardMaterial({ color: 0xe8dff5, roughness: 0.1 });
    const sidepod = new THREE.Mesh(sidepodGeom, sidepodMat);
    sidepod.position.set(0, 0.4, 0.1);
    sidepod.castShadow = true;
    carGroup.add(sidepod);

    // Cockpit cabin + Helmet
    const cockpitGeom = new THREE.BoxGeometry(1.0, 0.4, 1.2);
    const cockpitMat = new THREE.MeshStandardMaterial({ color: 0xdaeaf6 });
    const cockpit = new THREE.Mesh(cockpitGeom, cockpitMat);
    cockpit.position.set(0, 0.8, -0.2);
    carGroup.add(cockpit);

    const helmetGeom = new THREE.SphereGeometry(0.38, 12, 12);
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x2d2621, roughness: 0.1 });
    const helmet = new THREE.Mesh(helmetGeom, helmetMat);
    helmet.position.set(0, 1.15, -0.2);
    carGroup.add(helmet);

    // Spoiler wings (sage green)
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x94b0a0, roughness: 0.2 });
    
    // Front wing
    const frontWingGeom = new THREE.BoxGeometry(2.3, 0.08, 0.7);
    const frontWing = new THREE.Mesh(frontWingGeom, wingMat);
    frontWing.position.set(0, 0.28, -2.1);
    frontWing.castShadow = true;
    carGroup.add(frontWing);

    // Rear wing
    const rearWingGeom = new THREE.BoxGeometry(2.5, 0.1, 0.9);
    const rearWing = new THREE.Mesh(rearWingGeom, wingMat);
    rearWing.position.set(0, 1.2, 1.8);
    rearWing.castShadow = true;
    carGroup.add(rearWing);

    const wingPostGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 8);
    const wingPostMat = new THREE.MeshStandardMaterial({ color: 0x2d2621 });
    
    const postL = new THREE.Mesh(wingPostGeom, wingPostMat);
    postL.position.set(-0.6, 0.8, 1.7);
    carGroup.add(postL);
    
    const postR = postL.clone();
    postR.position.x = 0.6;
    carGroup.add(postR);

    // WHEELS (Steerable front, rigid back)
    const wheelGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.42, 12);
    wheelGeom.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2d2621, roughness: 0.8 });

    const hubGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.44, 12);
    hubGeom.rotateZ(Math.PI / 2);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0xdaeaf6, metalness: 0.6 }); // neon blue hubs

    // Function to assemble wheel group
    const makeWheelGroup = () => {
      const g = new THREE.Group();
      const tire = new THREE.Mesh(wheelGeom, wheelMat);
      tire.castShadow = true;
      const hub = new THREE.Mesh(hubGeom, hubMat);
      g.add(tire);
      g.add(hub);
      return g;
    };

    const wheelFL = makeWheelGroup();
    wheelFL.position.set(-1.25, 0.55, -1.35);
    carGroup.add(wheelFL);

    const wheelFR = makeWheelGroup();
    wheelFR.position.set(1.25, 0.55, -1.35);
    carGroup.add(wheelFR);

    const wheelBL = makeWheelGroup();
    wheelBL.position.set(-1.25, 0.55, 1.35);
    const tireBL = wheelBL.children[0] as THREE.Mesh;
    carGroup.add(wheelBL);

    const wheelBR = makeWheelGroup();
    wheelBR.position.set(1.25, 0.55, 1.35);
    const tireBR = wheelBR.children[0] as THREE.Mesh;
    carGroup.add(wheelBR);

    wheelsRef.current = {
      fl: wheelFL,
      fr: wheelFR,
      bl: tireBL,
      br: tireBR,
    };

    // 5. DECORATIONS: 3D LANDMARKS & TIMELINE POND

    // Welcoming Arch
    const welcomeSign = createTextBillboard("Mannat Goyal", "Systems & AI Portfolio", "#ffb3c6");
    welcomeSign.position.set(0, 0, -20);
    scene.add(welcomeSign);

    // Projects Zone (5 pedestals)
    const projectTitles = [
      { label: "F1 Stint RL", sub: "Motorsports AI", col: "#daeaf6" },
      { label: "DQN Cyber", sub: "Firewall Security", col: "#e8dff5" },
      { label: "VoltQuant Battery", sub: "Quantum State", col: "#fce1e4" },
      { label: "Image Forensics", sub: "ResNet gradcam", col: "#daeaf6" },
      { label: "Fateh Hub", sub: "Data logging dashboard", col: "#e8dff5" },
    ];
    
    projectTitles.forEach((proj, idx) => {
      const x = -32 + idx * 16;
      const z = -50;
      
      const pedGeom = new THREE.CylinderGeometry(1.5, 1.8, 1.5, 8);
      const pedMat = new THREE.MeshStandardMaterial({ color: 0x2d2621 });
      const pedestal = new THREE.Mesh(pedGeom, pedMat);
      pedestal.position.set(x, 0.75, z);
      pedestal.castShadow = true;
      scene.add(pedestal);

      const boxGeom = new THREE.BoxGeometry(2, 2, 2);
      const boxMat = new THREE.MeshStandardMaterial({ color: proj.col, roughness: 0.1 });
      const box = new THREE.Mesh(boxGeom, boxMat);
      box.position.set(x, 2.5, z);
      box.castShadow = true;
      scene.add(box);

      // Label sign above pedestal
      const pBillboard = createTextBillboard(proj.label, proj.sub, proj.col);
      pBillboard.position.set(x, 0, z - 2);
      pBillboard.scale.set(0.4, 0.4, 0.4);
      scene.add(pBillboard);
    });

    // EV Shed Garage Canopy
    const garageGroup = new THREE.Group();
    garageGroup.position.set(45, 0, 10);
    scene.add(garageGroup);

    const roofGeom = new THREE.BoxGeometry(16, 0.25, 12);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xebd9cc });
    const roof = new THREE.Mesh(roofGeom, roofMat);
    roof.position.y = 5;
    roof.castShadow = true;
    garageGroup.add(roof);

    // Columns
    const colGeom = new THREE.CylinderGeometry(0.15, 0.15, 5, 8);
    const colMat = new THREE.MeshStandardMaterial({ color: 0x2d2621 });
    
    const positions = [
      [-7.5, 2.5, -5.5],
      [7.5, 2.5, -5.5],
      [-7.5, 2.5, 5.5],
      [7.5, 2.5, 5.5],
    ];
    positions.forEach((pos) => {
      const m = new THREE.Mesh(colGeom, colMat);
      m.position.set(pos[0], pos[1], pos[2]);
      m.castShadow = true;
      garageGroup.add(m);
    });

    const gBillboard = createTextBillboard("EV Motor Shed", "Fleet TUFF 17 / 18 / 19", "#94b0a0");
    gBillboard.position.set(45, 0, 18);
    gBillboard.scale.set(0.65, 0.65, 0.65);
    scene.add(gBillboard);

    // Research logs Area
    const rBillboard = createTextBillboard("Research logs", "Vol I & II Manuscript Journals", "#e8dff5");
    rBillboard.position.set(-45, 0, 20);
    scene.add(rBillboard);

    // Timeline Pond
    const pondGeom = new THREE.CylinderGeometry(15, 15, 0.1, 24);
    const pondMat = new THREE.MeshStandardMaterial({ color: 0xdaeaf6, roughness: 0.1, metalness: 0.5 }); // water
    const pond = new THREE.Mesh(pondGeom, pondMat);
    pond.position.set(0, 0.05, 65);
    pond.receiveShadow = true;
    scene.add(pond);

    // Stepping stones inside pond
    const stoneGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.35, 8);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xffb3c6, roughness: 0.9 });
    
    const stoneCoordsList = [
      [-10, 60, "2019"],
      [-5, 56, "2023"],
      [4, 58, "2024"],
      [9, 65, "2024"],
      [2, 72, "2025"],
      [-6, 70, "2026"],
    ] as const;

    stoneCoordsList.forEach((st) => {
      const stone = new THREE.Mesh(stoneGeom, stoneMat);
      stone.position.set(st[0], 0.2, st[1]);
      stone.castShadow = true;
      scene.add(stone);
    });

    const tBillboard = createTextBillboard("Milestones Tidepool", "2019 - 2027 Stepping Stones", "#94b0a0");
    tBillboard.position.set(0, 0, 82);
    tBillboard.scale.set(0.65, 0.65, 0.65);
    scene.add(tBillboard);

    // 6. INITIAL SPARKLING PARTICLE SYSTEM
    const starGeom = new THREE.OctahedronGeometry(0.18, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xfffdfa,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      roughness: 0,
      metalness: 0.7,
    });
    
    // Spawn standing sparkles in environment
    for (let i = 0; i < 60; i++) {
      const star = new THREE.Mesh(starGeom, starMat);
      star.position.set(
        (Math.random() - 0.5) * 160,
        1 + Math.random() * 8,
        (Math.random() - 0.5) * 160
      );
      scene.add(star);
      sparklesRef.current.push(star);
    }

    // 7. DRIVING PHYSICS FRAME LOOP
    let lastTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Update Physics
      const p = carPhysics.current;

      // Acceleration and reverse speed parameters
      const accel = 18;
      const reverseAccel = 8;
      const maxSpeed = 22;
      const maxRevSpeed = -8;
      const drag = 0.955;
      const steerSpeed = 4.2;

      // Handle WASD inputs
      if (keys.current.w) {
        p.speed += accel * dt;
        if (p.speed > maxSpeed) p.speed = maxSpeed;
      } else if (keys.current.s) {
        p.speed -= reverseAccel * dt;
        if (p.speed < maxRevSpeed) p.speed = maxRevSpeed;
      } else {
        p.speed *= drag;
        if (Math.abs(p.speed) < 0.1) p.speed = 0;
      }

      // Handle steering inputs
      const maxSteer = 0.44;
      if (keys.current.a) {
        p.steerAngle += steerSpeed * dt;
        if (p.steerAngle > maxSteer) p.steerAngle = maxSteer;
      } else if (keys.current.d) {
        p.steerAngle -= steerSpeed * dt;
        if (p.steerAngle < -maxSteer) p.steerAngle = -maxSteer;
      } else {
        p.steerAngle *= 0.75; // auto-center steering
        if (Math.abs(p.steerAngle) < 0.01) p.steerAngle = 0;
      }

      // Ackerman steering mesh angle updates
      if (wheelsRef.current) {
        wheelsRef.current.fl.rotation.y = p.steerAngle;
        wheelsRef.current.fr.rotation.y = p.steerAngle;
        
        // Spin wheels based on speed
        const spinDelta = (p.speed * dt) / 0.55;
        wheelsRef.current.fl.children[0].rotation.x += spinDelta;
        wheelsRef.current.fr.children[0].rotation.x += spinDelta;
        wheelsRef.current.bl.rotation.x += spinDelta;
        wheelsRef.current.br.rotation.x += spinDelta;
      }

      // Orientation update
      // Turning speed depends on vehicle velocity (stationary car doesn't pivot)
      if (p.speed !== 0) {
        const turnDirection = p.speed > 0 ? 1 : -1;
        p.angle += p.steerAngle * (p.speed / 14) * dt * turnDirection;
      }

      // Heading vector velocity updates
      p.vx = -Math.sin(p.angle) * p.speed;
      p.vz = -Math.cos(p.angle) * p.speed;

      // Coordinate updates
      p.x += p.vx * dt;
      p.z += p.vz * dt;

      // Playground grid boundary checks (keeps car on desk surface)
      const bound = 95;
      if (p.x > bound) { p.x = bound; p.speed = -p.speed * 0.3; }
      if (p.x < -bound) { p.x = -bound; p.speed = -p.speed * 0.3; }
      if (p.z > bound) { p.z = bound; p.speed = -p.speed * 0.3; }
      if (p.z < -bound) { p.z = -bound; p.speed = -p.speed * 0.3; }

      // Update 3D car mesh transforms
      if (carGroup) {
        carGroup.position.set(p.x, 0, p.z);
        carGroup.rotation.y = p.angle;
      }

      // FOLLOW CAMERA OFFSET
      if (camera) {
        const camDistance = 16;
        const camHeight = 9.5;
        
        // Smooth camera follow interpolation
        const targetCamX = p.x - Math.sin(p.angle) * -camDistance;
        const targetCamZ = p.z - Math.cos(p.angle) * -camDistance;
        const targetCamY = camHeight;

        camera.position.x += (targetCamX - camera.position.x) * 0.08;
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.y += (targetCamY - camera.position.y) * 0.08;
        camera.lookAt(p.x, 1, p.z);
      }

      // COLLISION ZONES CHECKING
      let inCollisionZone = false;
      let closestZone = null;
      let minDist = 9999;

      // Coordinates bounds triggers
      const triggers = [
        { id: "about", x: 0, z: 20, r: 6.5 },
        { id: "experiments", x: 0, z: -45, r: 9.5 },
        { id: "machines", x: 45, z: 10, r: 9.5 },
        { id: "research", x: -45, z: 20, r: 8.5 },
        { id: "timeline", x: 0, z: 65, r: 12.0 },
      ];

      triggers.forEach((trig) => {
        const dx = p.x - trig.x;
        const dz = p.z - trig.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        if (dist < trig.r) {
          inCollisionZone = true;
          if (dist < minDist) {
            minDist = dist;
            closestZone = trig.id;
          }
        }
      });

      if (inCollisionZone && closestZone) {
        if (currentCollision.current !== closestZone) {
          currentCollision.current = closestZone;
          playDrawerSlideSound();
          onZoneCollide(closestZone);
        }
      } else {
        if (currentCollision.current !== null) {
          currentCollision.current = null;
          onZoneCollide(""); // exit trigger
        }
      }

      // TYRE DRIFT SMOKE EMISSIONS
      const isDrifting = Math.abs(p.steerAngle) > 0.28 && Math.abs(p.speed) > 10;
      if (isDrifting && scene) {
        // Spawn purple/pink dust clouds at rear wheels
        const leftRearX = p.x + Math.sin(p.angle + Math.PI/2) * 1.2 + Math.sin(p.angle) * 1.3;
        const leftRearZ = p.z + Math.cos(p.angle + Math.PI/2) * 1.2 + Math.cos(p.angle) * 1.3;
        spawnSmoke(leftRearX, leftRearZ);
        
        if (Math.random() < 0.25) {
          spawnSparkle(p.x, p.z);
        }
      }

      // Update smoke particles lifetime and size fade
      for (let i = smokeParticlesRef.current.length - 1; i >= 0; i--) {
        const sm = smokeParticlesRef.current[i];
        sm.age += dt;
        
        // Float and expand smoke meshes
        sm.mesh.position.x += sm.vx * dt;
        sm.mesh.position.z += sm.vz * dt;
        sm.mesh.position.y += 1.4 * dt;
        const scale = 1.0 - sm.age / sm.maxAge;
        sm.mesh.scale.set(scale, scale, scale);

        if (sm.age >= sm.maxAge) {
          scene.remove(sm.mesh);
          smokeParticlesRef.current.splice(i, 1);
        }
      }

      // Animate ambient sparkles (make them rotate or float)
      sparklesRef.current.forEach((sp) => {
        sp.rotation.x += 0.8 * dt;
        sp.rotation.y += 1.2 * dt;
      });

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    // Spawn drift smoke particle
    const spawnSmoke = (x: number, z: number) => {
      const geom = new THREE.DodecahedronGeometry(0.3 + Math.random() * 0.3);
      const smokeColors = [0xe8dff5, 0xfce1e4, 0xdaeaf6];
      const mat = new THREE.MeshStandardMaterial({
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        roughness: 0.9,
        transparent: true,
        opacity: 0.65
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, 0.15, z);
      scene.add(mesh);
      smokeParticlesRef.current.push({
        mesh,
        age: 0,
        maxAge: 0.45 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2
      });
    };

    requestRef.current = requestAnimationFrame(animate);

    // 8. RESIZE STAGE LISTENER
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onZoneCollide]);

  return (
    <div className="three-canvas-container" ref={containerRef}>
      
      {/* 3D Dashboard HUD instruction tags */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-3.5 select-none pointer-events-none">
        
        {/* Title */}
        <div className="bg-white border-3 border-[#2d2621] p-3 rounded-2xl shadow-[4px_4px_0px_#2d2621] pointer-events-auto flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#d6bdf2] fill-[#e8dff5] animate-bounce" />
          <div>
            <h1 className="font-serif font-black text-xs text-[#2d2621] uppercase tracking-wide">
              Fateh EV Sandbox
            </h1>
            <p className="font-mono text-[8px] text-stone-400 font-bold uppercase tracking-wider">
              3D WebGL Driving Chronicle
            </p>
          </div>
        </div>

        {/* Driving keys guide */}
        <div className="driving-instructions-tag">
          <HelpCircle className="w-4 h-4 text-[#daeaf6]" />
          <span>DRIVE: [W, A, S, D] OR [ARROW KEYS]</span>
        </div>
      </div>

    </div>
  );
}
