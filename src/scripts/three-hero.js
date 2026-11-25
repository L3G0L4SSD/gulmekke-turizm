import * as THREE from 'three';

export function initHeroWebGL() {
  const container = document.getElementById('hero-webgl-container');
  if (!container) return;

  // ── Scene ─────────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03040a, 0.022);
  scene.background = new THREE.Color(0x040508);

  // ── Camera ────────────────────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(
    38,
    container.clientWidth / container.clientHeight,
    0.1,
    120
  );
  camera.position.set(0.5, 3.8, 9.2);
  camera.lookAt(0, 1.4, 0);

  // ── Renderer ──────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // ── Lights ────────────────────────────────────────────────────────────────
  // Soft ambient – gives base fill
  const ambient = new THREE.AmbientLight(0xffe8c0, 0.55);
  scene.add(ambient);

  // Key golden light from front-right (mimics Harem floodlights)
  const keyLight = new THREE.DirectionalLight(0xffd97a, 3.0);
  keyLight.position.set(4, 7, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 40;
  keyLight.shadow.camera.top = 8;
  keyLight.shadow.camera.bottom = -4;
  keyLight.shadow.camera.left = -8;
  keyLight.shadow.camera.right = 8;
  scene.add(keyLight);

  // Rim backlight – separates Kaaba from dark fog
  const rimLight = new THREE.DirectionalLight(0xd4af37, 1.6);
  rimLight.position.set(-5, 5, -7);
  scene.add(rimLight);

  // Subtle teal fill from bottom – Haram courtyard bounce
  const bounceLight = new THREE.PointLight(0x2a5a70, 0.8, 20);
  bounceLight.position.set(0, -0.5, 4);
  scene.add(bounceLight);

  // Gold Kiswah glow from front face
  const doorGlow = new THREE.PointLight(0xffcc55, 2.4, 8);
  doorGlow.position.set(0.5, 2.2, 3.5);
  scene.add(doorGlow);

  // ── Texture Loader ────────────────────────────────────────────────────────
  const loader = new THREE.TextureLoader();

  function loadTex(url, options = {}) {
    const t = loader.load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    if (options.anisotropy) t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  }

  const texFront = loadTex('/assets/images/tex_kaaba_front.jpg', { anisotropy: true });
  const texSide  = loadTex('/assets/images/tex_kaaba_side.jpg',  { anisotropy: true });
  const texRoof  = loadTex('/assets/images/tex_kaaba_roof.jpg',  { anisotropy: true });

  // ── Materials ─────────────────────────────────────────────────────────────
  // MeshPhysicalMaterial for realistic silk/gold response
  function kiswahMat(tex) {
    return new THREE.MeshPhysicalMaterial({
      map: tex,
      roughness: 0.72,
      metalness: 0.08,
      clearcoat: 0.15,
      clearcoatRoughness: 0.55,
      envMapIntensity: 0.6,
    });
  }

  const matFront  = kiswahMat(texFront);
  const matSide   = kiswahMat(texSide);
  const matRoof   = new THREE.MeshPhysicalMaterial({
    map: texRoof,
    roughness: 0.28,
    metalness: 0.15,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  });
  const matBottom = new THREE.MeshStandardMaterial({ color: 0x0a0b0e, roughness: 0.9 });

  // BoxGeometry face order: +X, -X, +Y, -Y, +Z (front, toward camera), -Z (back)
  const kaabaMaterials = [
    matSide,    // +X  (Right side)
    matSide,    // -X  (Left side)
    matRoof,    // +Y  (Roof)
    matBottom,  // -Y  (Base)
    matFront,   // +Z  (Front – Bab al-Kaaba faces viewer)
    matSide,    // -Z  (Back)
  ];

  // ── Kaaba Group ───────────────────────────────────────────────────────────
  const kaabaGroup = new THREE.Group();
  scene.add(kaabaGroup);

  // Main body – authentic proportions (width ≈ 11.03m, height ≈ 13.1m, depth ≈ 12.86m)
  // Scaled to 1.9 × 2.4 × 1.9 units
  const kaabaGeo = new THREE.BoxGeometry(1.92, 2.42, 1.92, 2, 2, 2);
  const kaabaMesh = new THREE.Mesh(kaabaGeo, kaabaMaterials);
  kaabaMesh.position.y = 1.28;
  kaabaMesh.castShadow = true;
  kaabaGroup.add(kaabaMesh);

  // Shadherwan – sloping marble skirting base
  const shGeo = new THREE.BoxGeometry(2.18, 0.18, 2.18);
  const shMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0ece0,
    roughness: 0.15,
    metalness: 0.12,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  });
  const shMesh = new THREE.Mesh(shGeo, shMat);
  shMesh.position.y = 0.09;
  shMesh.castShadow = true;
  kaabaGroup.add(shMesh);

  // Mizab al-Rahman – golden rain spout on roof NW edge
  const mizabGeo = new THREE.BoxGeometry(0.14, 0.09, 0.55);
  const goldMat  = new THREE.MeshPhysicalMaterial({
    color: 0xf5e08a,
    roughness: 0.08,
    metalness: 0.98,
    emissive: 0x7a5500,
    emissiveIntensity: 0.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });
  const mizabMesh = new THREE.Mesh(mizabGeo, goldMat);
  mizabMesh.position.set(-1.02, 2.52, 0.15);
  kaabaGroup.add(mizabMesh);

  // Hatim (Hijr Ismail) – semi-circular low marble wall on NW side
  const hatimGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.28, 48, 1, true, Math.PI * 0.07, Math.PI * 0.86);
  const hatimMat = new THREE.MeshPhysicalMaterial({
    color: 0xfaf7ee,
    roughness: 0.18,
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    side: THREE.DoubleSide
  });
  const hatimMesh = new THREE.Mesh(hatimGeo, hatimMat);
  hatimMesh.position.set(-1.08, 0.16, 0.08);
  hatimMesh.rotation.y = Math.PI / 2;
  kaabaGroup.add(hatimMesh);

  // Staircase / Daraj (door steps) in front
  const stairGeo = new THREE.BoxGeometry(0.62, 0.28, 0.38);
  const stairMat = new THREE.MeshPhysicalMaterial({
    color: 0x2a2018,
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.3,
  });
  const stairMesh = new THREE.Mesh(stairGeo, stairMat);
  stairMesh.position.set(0, 0.14, 0.98);
  kaabaGroup.add(stairMesh);

  // ── Floor – Reflective Marble ─────────────────────────────────────────────
  const floorGeo = new THREE.CircleGeometry(11, 80);
  const floorMat = new THREE.MeshPhysicalMaterial({
    color: 0x0d0f14,
    roughness: 0.05,
    metalness: 0.0,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05,
    reflectivity: 0.9,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Concentric tawaf guide rings (subtle gold)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.09,
    side: THREE.DoubleSide,
  });
  for (let r = 2.6; r <= 9.8; r += 1.45) {
    const rGeo = new THREE.RingGeometry(r, r + 0.025, 80);
    const rMesh = new THREE.Mesh(rGeo, ringMat);
    rMesh.rotation.x = -Math.PI / 2;
    rMesh.position.y = 0.01;
    scene.add(rMesh);
  }

  // ── PARTICLE TAWAF VORTEX ─────────────────────────────────────────────────
  const N = 3600;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(N * 3);
  const pCol = new Float32Array(N * 3);
  const radii  = new Float32Array(N);
  const speeds = new Float32Array(N);
  const angles = new Float32Array(N);
  const heights = new Float32Array(N);

  const palette = [
    new THREE.Color(0xfef6cc),
    new THREE.Color(0xd4af37),
    new THREE.Color(0xffffff),
    new THREE.Color(0xc5a028),
    new THREE.Color(0x4ec87e), // Gül Mekke emerald accent
  ];

  for (let i = 0; i < N; i++) {
    const r = 2.1 + Math.pow(Math.random(), 1.5) * 8.0;
    const a = Math.random() * Math.PI * 2;
    const h = (Math.random() - 0.38) * (0.35 + r * 0.13);
    radii[i]   = r;
    angles[i]  = a;
    heights[i] = h;
    speeds[i]  = (0.30 / Math.sqrt(r)) * (0.75 + Math.random() * 0.5);
    pPos[i * 3]     = Math.cos(a) * r;
    pPos[i * 3 + 1] = h;
    pPos[i * 3 + 2] = Math.sin(a) * r;
    const c = palette[Math.floor(Math.random() * palette.length)];
    pCol[i * 3]     = c.r;
    pCol[i * 3 + 1] = c.g;
    pCol[i * 3 + 2] = c.b;
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));

  // Soft circular glow sprite texture
  const pCvs = document.createElement('canvas');
  pCvs.width = pCvs.height = 64;
  const pCtx = pCvs.getContext('2d');
  const g = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0,   'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(240,208,110,0.85)');
  g.addColorStop(1,   'rgba(0,0,0,0)');
  pCtx.fillStyle = g;
  pCtx.fillRect(0, 0, 64, 64);
  const pTex = new THREE.CanvasTexture(pCvs);

  const pMat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    map: pTex,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ── Mouse / Touch ─────────────────────────────────────────────────────────
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', e => {
    mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('touchmove', e => {
    if (e.touches.length) {
      mouse.tx = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    }
  }, { passive: true });

  // ── Animation Loop ────────────────────────────────────────────────────────
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const t  = clock.getElapsedTime();

    // Smooth mouse easing
    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;

    // Kaaba subtle hover + mouse parallax
    // Keep front face (Bab) roughly facing camera at all times
    kaabaGroup.rotation.y = mouse.x * 0.28;
    kaabaGroup.rotation.x = mouse.y * 0.12;
    kaabaGroup.position.y = Math.sin(t * 0.65) * 0.045;

    // Camera very slight drift
    camera.position.x = 0.5 + mouse.x * 1.0;
    camera.position.y = 3.8 + mouse.y * 0.5;
    camera.lookAt(0, 1.3, 0);

    // Door glow pulse
    doorGlow.intensity = 2.2 + Math.sin(t * 1.8) * 0.5;

    // Counter-clockwise (Tawaf) particle orbit
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      angles[i] += speeds[i] * dt * 0.7;
      const r = radii[i];
      const a = angles[i];
      pos[i * 3]     = Math.cos(a) * r;
      pos[i * 3 + 1] = heights[i] + Math.sin(a * 2.5 + t) * 0.08;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    pGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // ── Resize ────────────────────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
