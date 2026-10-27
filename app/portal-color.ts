// Reference-image coordinates, shared by the relief shaders and the no-WebGL picture.
export const portalZones = {
  landscape: { width: 1672, height: 941, polygons: [
    [[134,548],[150,524],[205,508],[208,499],[257,494],[306,492],[366,499],[358,509],[410,524],[442,547],[432,566],[370,581],[225,585],[157,569]],
    [[712,560],[740,540],[790,528],[852,518],[915,518],[984,529],[1034,547],[1059,571],[1046,594],[1004,614],[937,628],[847,628],[777,614],[732,589]],
    [[1303,581],[1501,471],[1653,482],[1509,629]],
  ] },
  portrait: { width: 941, height: 1672, polygons: [
    [[0,680],[25,632],[84,607],[162,591],[248,593],[332,611],[388,650],[410,700],[390,740],[327,767],[224,781],[112,772],[34,745],[0,717]],
    [[594,851],[626,822],[699,800],[783,792],[871,799],[941,817],[941,935],[874,956],[777,962],[687,944],[621,914],[594,885]],
    [[135,1089],[294,1069],[740,1439],[407,1460]],
  ] },
} as const;

export function portalMask(portrait: boolean) {
  const { width, height, polygons } = portalZones[portrait ? "portrait" : "landscape"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${polygons.map(points => `<polygon fill="white" points="${points.map(p => p.join(",")).join(" ")}"/>`).join("")}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export const portalTrailLimit = 16;
export const portalTrailDuration = 1000;
export type PortalTrailPoint = { x: number; y: number; alpha: number };

// A bounded, event-started trail. Both renderers receive exactly the same fade.
export function createPortalTrail(paint: (points: readonly PortalTrailPoint[]) => void) {
  let points: (PortalTrailPoint & { born: number })[] = [];
  let frame = 0, sampled = -Infinity, painted = 0;
  function tick(now: number) {
    frame = 0;
    if (now - painted >= 32) {
      points = points.filter(point => now - point.born < portalTrailDuration);
      for (const point of points) {
        const age = Math.min(1, (now - point.born) / portalTrailDuration);
        point.alpha = 1 - age * age * (3 - 2 * age);
      }
      paint(points);
      painted = now;
    }
    if (points.length) frame = requestAnimationFrame(tick);
  }
  function clear() {
    cancelAnimationFrame(frame);
    frame = 0; points = []; sampled = -Infinity;
    paint(points);
  }
  return {
    clear,
    move(x: number, y: number, animate: boolean) {
      const now = performance.now(), point = { x, y, alpha: 1, born: now };
      if (!animate) {
        cancelAnimationFrame(frame); frame = 0; points = [point];
        paint(points);
        return;
      }
      if (points.length && now - sampled < portalTrailDuration / (portalTrailLimit - 1)) {
        points[points.length - 1] = point;
      } else {
        points.push(point); sampled = now;
        if (points.length > portalTrailLimit) points.shift();
      }
      if (!frame) { paint(points); painted = now; frame = requestAnimationFrame(tick); }
    },
  };
}

export function portalColorShader(portrait: boolean) {
  const { width, height, polygons } = portalZones[portrait ? "portrait" : "landscape"];
  const float = (n: number) => n.toFixed(1);
  // Signed polygon distance: the edge feather is only 1.5 reference pixels, not a halo.
  const functions = polygons.map((points, index) => `
    float portalZone${index}(vec2 p) {
      vec2 v[${points.length}] = vec2[](${points.map(([x,y]) => `vec2(${float(x)},${float(y)})`).join(",")});
      float d = 1e10; float s = 1.0;
      for (int i=0, j=${points.length - 1}; i<${points.length}; j=i, i++) {
        vec2 e=v[j]-v[i]; vec2 w=p-v[i];
        vec2 b=w-e*clamp(dot(w,e)/dot(e,e),0.0,1.0);
        d=min(d,dot(b,b));
        bvec3 c=bvec3(p.y>=v[i].y,p.y<v[j].y,e.x*w.y>e.y*w.x);
        if (all(c)||all(not(c))) s=-s;
      }
      return 1.0-smoothstep(0.0,1.5,s*sqrt(d));
    }`).join("\n");
  return {
    declarations: `varying vec2 vPortalUv;
      uniform vec3 portalTrail[${portalTrailLimit}];
      uniform int portalTrailCount;
      uniform vec2 portalViewport;
      uniform float portalDpr;
      uniform float portalRadius;
      ${functions}`,
    output: `vec2 portalPoint=vPortalUv*vec2(${float(width)},${float(height)});
      float zone=max(portalZone0(portalPoint),max(portalZone1(portalPoint),portalZone2(portalPoint)));
      vec2 screenPoint=vec2(gl_FragCoord.x/portalDpr,portalViewport.y-gl_FragCoord.y/portalDpr);
      float reveal=0.0;
      for (int i=0; i<${portalTrailLimit}; i++) {
        if (i>=portalTrailCount) break;
        reveal=max(reveal,portalTrail[i].z*(1.0-smoothstep(portalRadius*.35,portalRadius,distance(screenPoint,portalTrail[i].xy))));
      }
      float gray=dot(gl_FragColor.rgb,vec3(.2126,.7152,.0722));
      gl_FragColor.rgb=mix(vec3(gray),gl_FragColor.rgb,max(zone,reveal));`,
  };
}
