(function (root, factory) {
  if (typeof module === 'object') module.exports = factory(require('../vendor/matter-0.20.0.min.js'), require('./rules.js'));
  else root.BolaPhysics = factory(root.Matter, root.BolaRules);
})(this, function (M, R) {
  'use strict';
  const C = Object.freeze({ width: 1200, height: 300, radius: 9, step: 1000 / 120, drag: 0.025, rest: 0.04, maxSteps: 2000 });
  const clamp = (v, a, b) => Math.max(a, Math.min(b, Number.isFinite(+v) ? +v : a));
  const speed = shot => shot.mode === 'impacto' ? 8 + clamp(shot.power, 0, 100) * 0.24 : 4 + clamp(shot.power, 0, 100) * 0.22;
  const origin = (direction, lateral) => ({ x: direction === 1 ? 80 : 1120, y: clamp(lateral, 45, 255) });
  function make(pieces) {
    const engine = M.Engine.create({ gravity: { x: 0, y: 0, scale: 0 }, positionIterations: 8, velocityIterations: 8 });
    const entries = pieces.map(p => {
      if (p.out) return { data: { ...p }, body: null };
      const body = M.Bodies.circle(p.x, p.y, p.r, { frictionAir: C.drag, friction: 0.03, frictionStatic: 0, restitution: 0.6, slop: 0.005 }, 32);
      M.Body.setMass(body, p.team === -1 ? 0.3 : 1);
      M.Body.setInertia(body, Infinity);
      M.Composite.add(engine.world, body);
      return { data: { ...p }, body };
    });
    return { engine, entries, steps: 0, quiet: 0, done: false, error: false };
  }
  function begin(pieces, identity, shot, direction) {
    const s = make(pieces), start = origin(direction, shot.lateral);
    const ball = make([{ ...identity, ...start, r: C.radius, out: false }]).entries[0];
    // The same release vector feeds human launches and every AI candidate.
    const a = clamp(shot.angle, -18, 18) * Math.PI / 180, v = speed(shot);
    M.Body.setVelocity(ball.body, { x: direction * v * Math.cos(a), y: v * Math.sin(a) });
    s.entries.push(ball); M.Composite.add(s.engine.world, ball.body); return s;
  }
  function snapshot(s) {
    return s.entries.map(e => ({ ...e.data, ...(e.body ? { x: e.body.position.x, y: e.body.position.y } : {}) }));
  }
  function step(s) {
    if (s.done) return;
    M.Engine.update(s.engine, C.step); s.steps++;
    let max = 0;
    for (const e of s.entries) {
      if (!e.body) continue;
      const p = e.body.position;
      if (![p.x, p.y].every(Number.isFinite)) { s.error = true; s.done = true; return; }
      if (p.x < 0 || p.x > C.width || p.y < 0 || p.y > C.height) {
        e.data = { ...e.data, x: p.x, y: p.y, out: true }; M.Composite.remove(s.engine.world, e.body); e.body = null;
      } else max = Math.max(max, M.Body.getSpeed(e.body));
    }
    s.quiet = max < C.rest ? s.quiet + 1 : 0;
    if (s.quiet >= 18) {
      for (const e of s.entries) if (e.body) M.Body.setVelocity(e.body, { x: 0, y: 0 });
      s.done = true;
    }
    if (s.steps >= C.maxSteps) { s.done = true; s.error = true; }
  }
  function simulate(pieces, identity, shot, direction) {
    const s = begin(pieces, identity, shot, direction);
    while (!s.done) step(s);
    return { pieces: snapshot(s), steps: s.steps, error: s.error };
  }
  function ai(pieces, direction) {
    const jack = pieces.find(p => p.team === -1), options = [];
    for (const lateral of [95, 150, 205]) {
      const start = origin(direction, lateral), dx = Math.abs(jack.x - start.x);
      const angle = clamp(Math.atan2(jack.y - lateral, dx) * 180 / Math.PI, -18, 18);
      const base = clamp((Math.hypot(dx, jack.y - lateral) * C.drag - 4) / 0.22, 0, 100);
      for (const power of [base - 6, base, base + 6]) options.push({ mode: 'arrime', lateral, angle, power: clamp(power, 0, 100) });
    }
    const rival = R.measure(pieces).find(p => p.team === 0);
    if (rival) {
      const start = origin(direction, 150);
      options.push({ mode: 'impacto', lateral: 150, angle: clamp(Math.atan2(rival.y - 150, Math.abs(rival.x - start.x)) * 180 / Math.PI, -18, 18), power: 75 });
    }
    let best = null;
    for (const shot of options) {
      const sim = simulate(pieces, { id: 'candidate', team: 1 }, shot, direction), result = R.standing(sim.pieces);
      const score = sim.error || sim.pieces.find(p => p.team === -1).out ? -100000 :
        (result.leader === 1 ? 2000 + result.points * 100 : 0) - (Number.isFinite(result.best[1]) ? result.best[1] : 10000);
      if (!best || score > best.score) best = { shot, score, simulation: sim };
    }
    return best;
  }
  return { C, speed, origin, begin, step, snapshot, simulate, ai };
});
