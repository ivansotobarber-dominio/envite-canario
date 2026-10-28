import * as THREE from "three";
import { portalColorShader, portalTrailLimit, type PortalTrailPoint } from "./portal-color";

type Options = { desktop: string; mobile: string; paused: boolean; ready: () => void; failed: () => void };
export type PortalScene = { setPaused: (paused: boolean) => void; setActive: (index: number) => void; setTrail: (points: readonly PortalTrailPoint[]) => void; dispose: () => void };
type Terrace = [number, number, number, number, number];

export function createPortalScene(canvas: HTMLCanvasElement, root: HTMLElement, options: Options): PortalScene {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-9, 9, 5, -5, 0.1, 60);
  camera.position.z = 24;
  const media = matchMedia("(max-aspect-ratio: 4/5)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const colorUniforms = {
    portalTrail: { value: Array.from({ length: portalTrailLimit }, () => new THREE.Vector3()) },
    portalTrailCount: { value: 0 },
    portalViewport: { value: new THREE.Vector2(1, 1) },
    portalDpr: { value: renderer.getPixelRatio() },
    portalRadius: { value: 100 },
  };
  const pointer = new THREE.Vector2();
  const cameraOffset = new THREE.Vector2();
  const projected = new THREE.Vector3();
  const links = Array.from(root.querySelectorAll<HTMLElement>("[data-portal]"));
  const explore = root.querySelector<HTMLElement>('a[href$="/explorar/"]');
  let group = new THREE.Group();
  let texture: THREE.Texture | null = null;
  let water: THREE.ShaderMaterial | null = null;
  let rims: THREE.LineBasicMaterial[] = [];
  let anchors: THREE.Vector3[] = [];
  let paused = options.paused, disposed = false, loaded = false, lost = false;
  let frame = 0, revision = 0, active = -1, time = 0, last = 0;
  let worldWidth = 17.77, width = 1, height = 1;

  function freeGroup() {
    group.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    scene.remove(group);
    group = new THREE.Group();
    scene.add(group);
    texture?.dispose();
    texture = null;
    rims = [];
    water = null;
  }

  function build(map: THREE.Texture, portrait: boolean) {
    freeGroup();
    texture = map;
    texture.colorSpace = THREE.SRGBColorSpace;
    worldWidth = (portrait ? 941 / 1672 : 1672 / 941) * 10;
    const colorShader = portalColorShader(portrait);
    function colorize<T extends THREE.Material>(material: T): T {
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, colorUniforms);
        shader.vertexShader = `varying vec2 vPortalUv;\n${shader.vertexShader}`.replace(/void main\s*\(\s*\)\s*\{/, `void main() {
          vec3 portalWorld=(modelMatrix*vec4(position,1.0)).xyz;
          vPortalUv=vec2(portalWorld.x/${worldWidth.toFixed(8)}+.5,.5-portalWorld.y/10.0);`);
        shader.fragmentShader = `${colorShader.declarations}\n${shader.fragmentShader}`;
        // Apply after output color conversion to every surface, including additive water/lines.
        const end = shader.fragmentShader.lastIndexOf("}");
        shader.fragmentShader = shader.fragmentShader.slice(0, end) + colorShader.output + shader.fragmentShader.slice(end);
      };
      material.customProgramCacheKey = () => `portal-monochrome-${portrait}`;
      return material;
    }
    const terraces: Terrace[] = portrait
      ? [[.23, .405, .215, .055, 1.35], [.81, .515, .22, .055, 1.65], [.40, .748, .19, .13, 2.1]]
      : [[.175, .59, .095, .049, 1.3], [.53, .62, .12, .067, 1.6], [.86, .59, .105, .075, 1.7]];
    const labelPoints = portrait ? [[.24, .48], [.78, .60], [.38, .82]] : [[.175, .73], [.53, .78], [.86, .74]];
    const gaussian = (u: number, v: number, x: number, y: number, sx: number, sy: number) => Math.exp(-(((u - x) / sx) ** 2) - ((v - y) / sy) ** 2);
    // Hand-registered proxy relief, not an inferred or measured depth map.
    function depth(u: number, v: number) {
      let z = -1.8;
      if (v > .23) z = -.8 + Math.max(0, v - .35) * 2.1;
      z += portrait
        ? 2.3 * gaussian(u, v, .88, .38, .18, .17) + 1.1 * gaussian(u, v, .12, .36, .20, .14)
        : 1.8 * gaussian(u, v, .12, .37, .32, .12) + 1.2 * gaussian(u, v, .60, .51, .10, .10);
      z += .7 * gaussian(u, v, portrait ? .23 : .12, .18, .12, .07);
      if (v > .27) z += .10 * Math.sin(u * 71) * Math.sin(v * 43) * Math.max(0, v - .30);
      for (const [x, y, rx, ry, level] of terraces) {
        const distance = ((u - x) / rx) ** 2 + ((v - y) / ry) ** 2;
        if (distance < 1.15) z = level - .05;
      }
      return z;
    }
    function point(u: number, v: number, z = depth(u, v)) { return new THREE.Vector3((u - .5) * worldWidth, (.5 - v) * 10, z); }
    const terrain = new THREE.PlaneGeometry(worldWidth, 10, portrait ? 90 : 144, 112);
    const positions = terrain.attributes.position;
    const uv = terrain.attributes.uv;
    for (let i = 0; i < positions.count; i++) positions.setZ(i, depth(uv.getX(i), 1 - uv.getY(i)));
    terrain.computeVertexNormals();
    const terrainMesh = new THREE.Mesh(terrain, colorize(new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide })));
    terrainMesh.name = "registered-basalt-volcano-relief";
    group.add(terrainMesh);

    // Extend only the sky's top texel row when the viewport is taller than the artwork.
    const skyGeometry = new THREE.PlaneGeometry(worldWidth, 40);
    const skyUv = skyGeometry.attributes.uv;
    for (let i = 0; i < skyUv.count; i++) skyUv.setY(i, 1);
    const skyMaterial = colorize(new THREE.MeshBasicMaterial({ map }));
    const compileSky = skyMaterial.onBeforeCompile;
    skyMaterial.onBeforeCompile = (shader, renderer) => {
      compileSky(shader, renderer);
      const end = shader.fragmentShader.lastIndexOf("}");
      shader.fragmentShader = shader.fragmentShader.slice(0, end) +
        "gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.12549),smoothstep(0.0,0.08,-vPortalUv.y));" + shader.fragmentShader.slice(end);
    };
    skyMaterial.customProgramCacheKey = () => `portal-sky-${portrait}`;
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.position.set(0, 25, -1.8);
    group.add(sky);

    // Separate elevated terrace tops and basalt side walls, UV-projected from the reference view.
    terraces.forEach(([x, y, rx, ry, z], index) => {
      const vertices: number[] = [], uvs: number[] = [], indices: number[] = [];
      function vertex(u: number, v: number, level: number) {
        const p = point(u, v, level); vertices.push(p.x, p.y, p.z); uvs.push(u, 1 - v);
      }
      vertex(x, y, z);
      const rim: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const angle = j / 64 * Math.PI * 2;
        const u = x + Math.cos(angle) * rx, v = y + Math.sin(angle) * ry;
        vertex(u, v, z);
        vertex(u, v + .028, z - .8);
        rim.push(point(u, v, z + .025));
        if (j < 64) { const a = 1 + j * 2; indices.push(0, a, a + 2, a, a + 1, a + 2, a + 1, a + 3, a + 2); }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      const terrace = new THREE.Mesh(geometry, colorize(new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide })));
      terrace.name = `terrace-${index}`;
      group.add(terrace);
      const material = colorize(new THREE.LineBasicMaterial({ color: "#74fff0", transparent: true, opacity: .36 }));
      rims.push(material);
      const contour = new THREE.Line(new THREE.BufferGeometry().setFromPoints(rim), material);
      contour.visible = index !== 2;
      group.add(contour);
    });

    const contours = portrait
      ? [[[.72,.29],[.76,.34],[.84,.36],[.89,.39],[1,.42]], [[.68,.36],[.74,.39],[.80,.42],[.91,.44],[1,.47]], [[.02,.88],[.15,.90],[.29,.92],[.45,.91],[.63,.95]]]
      : [[[0,.32],[.12,.34],[.20,.33],[.29,.36],[.36,.37]], [[0,.39],[.10,.41],[.17,.40],[.24,.43],[.32,.44]], [[.02,.88],[.18,.91],[.35,.88],[.52,.94],[.73,.92],[.96,.96]]];
    for (const contour of contours) {
      const points = contour.map(([u,v]) => point(u,v,depth(u,v)+.06));
      const curve = new THREE.CatmullRomCurve3(points);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)), colorize(new THREE.LineBasicMaterial({ color: "#53ded4", transparent: true, opacity: .30 }))));
    }

    const waterGeometry = new THREE.PlaneGeometry(worldWidth * (portrait ? .55 : .48), portrait ? 1.05 : .85, 44, 18);
    const waterPosition = point(portrait ? .48 : .74, portrait ? .215 : .285, -.65);
    water = colorize(new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { time: { value: time } },
      vertexShader: "uniform float time; varying vec2 vUv; void main(){vUv=uv; vec3 p=position; p.z+=sin(p.x*9.0+time)*0.025; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}",
      fragmentShader: "uniform float time; varying vec2 vUv; void main(){float edge=smoothstep(0.0,0.18,vUv.x)*smoothstep(0.0,0.18,1.0-vUv.x)*smoothstep(0.0,0.2,vUv.y)*smoothstep(0.0,0.2,1.0-vUv.y); float wave=pow(max(0.0,sin(vUv.y*160.0+sin(vUv.x*34.0+time*.4)*2.0-time*.8)),14.0); gl_FragColor=vec4(.25,.8,.78,edge*wave*.16);}",
    }));
    const ocean = new THREE.Mesh(waterGeometry, water);
    ocean.name = "ocean-wave-surface";
    ocean.position.copy(waterPosition);
    group.add(ocean);
    anchors = labelPoints.map(([u,v], index) => point(u, v, terraces[index][4]));
    root.dataset.vertices = String(positions.count);
    root.dataset.depthRange = "-1.8:2.1";
    root.dataset.sceneAsset = portrait ? "caldera" : "atlantico-v2";
    loaded = true;
    resize();
    root.dataset.renderer = "three";
    options.ready();
    schedule();
  }

  function loadScene() {
    const ticket = ++revision;
    loaded = false;
    root.dataset.renderer = "fallback";
    const portrait = media.matches;
    new THREE.TextureLoader().load(portrait ? options.mobile : options.desktop, (map) => {
      if (disposed || ticket !== revision) { map.dispose(); return; }
      build(map, portrait);
    }, undefined, () => { if (!disposed && ticket === revision) options.failed(); });
  }

  function positionLabels() {
    anchors.forEach((anchor, index) => {
      projected.copy(anchor).project(camera);
      const half = links[index].offsetWidth / 2 + 10;
      const x = THREE.MathUtils.clamp((projected.x + 1) * width / 2, half, width - half);
      const lastY = Math.min(height - 112, (explore?.offsetTop ?? height - 80) - links[index].offsetHeight / 2 - 16);
      const y = THREE.MathUtils.clamp((1 - projected.y) * height / 2, 150, lastY);
      root.style.setProperty(`--portal-${index}-x`, `${x.toFixed(2)}px`);
      root.style.setProperty(`--portal-${index}-y`, `${y.toFixed(2)}px`);
    });
  }
  function render() {
    if (disposed || lost || !loaded) return;
    camera.updateMatrixWorld();
    renderer.render(scene, camera);
    positionLabels();
    root.dataset.drawCalls = String(renderer.info.render.calls);
  }
  function resize() {
    width = root.clientWidth; height = root.clientHeight;
    const aspect = width / height;
    const viewWidth = worldWidth, viewHeight = viewWidth / aspect;
    camera.left = -viewWidth / 2; camera.right = viewWidth / 2;
    camera.top = -5 + viewHeight; camera.bottom = -5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    colorUniforms.portalViewport.value.set(width, height);
    colorUniforms.portalRadius.value = Math.max(70, Math.min(120, Math.min(width, height) * .14));
    render();
  }
  function tick(now: number) {
    frame = 0;
    if (paused || document.hidden || disposed || lost || !loaded) return;
    const delta = last ? Math.min((now - last) / 1000, .05) : 0;
    last = now; time += delta;
    cameraOffset.lerp(pointer, .035);
    camera.position.x = cameraOffset.x * .10 + Math.sin(time * .17) * .012;
    camera.position.y = cameraOffset.y * .055;
    camera.lookAt(0, 0, 0);
    if (water) water.uniforms.time.value = time;
    rims.forEach((material, index) => { material.opacity = index === active ? .95 : .34 + Math.sin(time * .6 + index) * .06; });
    render();
    schedule();
  }
  function schedule() {
    if (!frame && !paused && !document.hidden && !disposed && !lost && loaded) frame = requestAnimationFrame(tick);
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; }
  function visibility() { leave(); if (document.hidden) stop(); else { render(); schedule(); } }
  function move(event: PointerEvent) {
    if (event.pointerType === "touch" || !finePointer.matches || paused) return;
    const rect = root.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / width * 2 - 1, 1 - (event.clientY - rect.top) / height * 2);
  }
  function leave() { pointer.set(0,0); colorUniforms.portalTrailCount.value = 0; if (paused) render(); }
  function contextLost(event: Event) { event.preventDefault(); lost = true; stop(); root.dataset.renderer = "fallback"; options.failed(); }
  const observer = new ResizeObserver(resize);
  observer.observe(root);
  media.addEventListener("change", loadScene);
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", visibility);
  canvas.addEventListener("webglcontextlost", contextLost);
  loadScene();

  return {
    setTrail(points) {
      colorUniforms.portalTrailCount.value = points.length;
      points.forEach(({ x, y, alpha }, i) => colorUniforms.portalTrail.value[i].set(x, y, alpha));
      if (paused) render();
    },
    setPaused(value) {
      paused = value;
      root.dataset.motion = value ? "paused" : "running";
      if (paused) {
        stop(); pointer.set(0,0); cameraOffset.set(0,0); camera.position.set(0,0,24); camera.lookAt(0,0,0); render();
      } else schedule();
    },
    setActive(index) { active = index; rims.forEach((material, i) => { material.opacity = i === index ? .95 : .36; }); render(); },
    dispose() {
      disposed = true; revision++; stop(); observer.disconnect();
      media.removeEventListener("change", loadScene);
      root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      freeGroup(); renderer.dispose();
    },
  };
}
