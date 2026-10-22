(function (root, factory) {
  const api = factory();
  if (typeof module === 'object') module.exports = api; else root.BolaRules = api;
})(this, function () {
  'use strict';
  const CONFIG = Object.freeze({ balls: 3, hands: 3, tolerance: 0.05, unitsPerMetre: 60 });
  const other = t => 1 - t;
  function measure(pieces) {
    const jack = pieces.find(p => p.team === -1);
    if (!jack || jack.out) return [];
    return pieces.filter(p => p.team >= 0 && !p.out).map(p => ({
      ...p, distance: Math.max(0, Math.hypot(p.x - jack.x, p.y - jack.y) - p.r - jack.r)
    })).sort((a, b) => a.distance - b.distance);
  }
  function standing(pieces) {
    const distances = measure(pieces);
    const best = [0, 1].map(t => distances.find(p => p.team === t)?.distance ?? Infinity);
    if (best.every(v => !Number.isFinite(v)) || Math.abs(best[0] - best[1]) <= CONFIG.tolerance)
      return { leader: null, points: 0, scoring: [], distances, best };
    const leader = best[0] < best[1] ? 0 : 1;
    const scoring = distances.filter(p => p.team === leader && p.distance < best[other(leader)] - CONFIG.tolerance).map(p => p.id);
    return { leader, points: scoring.length, scoring, distances, best };
  }
  function resolve(pieces, remaining, last) {
    const point = standing(pieces), jack = pieces.find(p => p.team === -1);
    if (!jack || jack.out) return { ...point, leader: null, points: 0, scoring: [], ended: true, reason: 'null', next: null };
    if (remaining.every(n => n === 0)) return { ...point, ended: true, reason: point.leader === null ? 'tie' : 'score', next: null };
    let next = point.leader === null ? other(last) : other(point.leader);
    if (!remaining[next]) next = other(next);
    return { ...point, ended: false, reason: 'turn', next };
  }
  class Game {
    constructor() { this.score = [0, 0]; this.hand = 1; this.history = []; this.opener = 0; this.newHand(); }
    newHand() {
      this.direction = this.hand % 2 ? 1 : -1;
      this.turn = this.opener; this.last = other(this.opener); this.remaining = [CONFIG.balls, CONFIG.balls];
      this.pieces = [{ id: 'B', team: -1, x: this.direction === 1 ? 860 : 340, y: 150, r: 5, out: false }];
      this.phase = 'ready'; this.result = null;
    }
    launch() {
      if (this.phase !== 'ready' || !this.remaining[this.turn]) throw new Error('Turno no disponible');
      const shot = { id: (this.turn ? 'I' : 'T') + (CONFIG.balls - this.remaining[this.turn] + 1), team: this.turn };
      this.remaining[this.turn]--; this.last = this.turn; this.phase = 'moving'; return shot;
    }
    settle(pieces) {
      if (this.phase !== 'moving') throw new Error('No hay lanzamiento pendiente');
      this.pieces = pieces; this.finishResolution();
    }
    finishResolution() {
      this.result = resolve(this.pieces, this.remaining, this.last);
      if (this.result.ended) {
        if (this.result.leader !== null) this.score[this.result.leader] += this.result.points;
        this.history.push({ hand: this.hand, leader: this.result.leader, points: this.result.points, reason: this.result.reason });
        this.phase = this.hand === CONFIG.hands ? 'final' : 'handEnd';
      } else this.phase = 'review';
    }
    continue() {
      if (this.phase === 'review') { this.turn = this.result.next; this.phase = 'ready'; return; }
      if (this.phase !== 'handEnd') throw new Error('No se puede avanzar');
      this.opener = this.result.leader ?? other(this.opener); this.hand++; this.newHand();
    }
    canResign() { return this.phase === 'ready' && this.turn === 0 && this.remaining[0] > 0 && this.remaining[1] === 0; }
    resign() {
      if (!this.canResign()) throw new Error('Renuncia no disponible');
      this.remaining[0] = 0; this.finishResolution();
    }
  }
  return { CONFIG, measure, standing, resolve, Game };
});
