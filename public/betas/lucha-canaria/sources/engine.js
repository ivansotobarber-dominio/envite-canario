(function (root) {
  'use strict';
  const MAX = 10;
  const ACTIONS = Object.freeze({
    muslo: Object.freeze({ name: 'Cogida de muslo', cost: 3, pressure: 3, beats: 'pardelera', icon: 'hand' }),
    pardelera: Object.freeze({ name: 'Pardelera', cost: 2, pressure: 2, beats: 'cadera', icon: 'footprints' }),
    cadera: Object.freeze({ name: 'Media cadera', cost: 3, pressure: 3, beats: 'muslo', icon: 'rotate-cw' }),
    defensa: Object.freeze({ name: 'Defensa', cost: 0, pressure: 0, icon: 'shield' }),
    recuperar: Object.freeze({ name: 'Recuperar', cost: 0, pressure: 0, icon: 'battery-charging' })
  });
  const clamp = n => Math.max(0, Math.min(MAX, n));
  const fighter = (score, profile) => ({ energy: MAX, balance: MAX, score, ...(profile ? { profile: { ...profile } } : {}) });
  function actionFor(f, id) {
    const a = ACTIONS[id], p = f.profile || {};
    const power = p.force >= 8 ? 1 : 0, skill = p.skill >= 8 ? 1 : 0, stamina = p.stamina >= 8 ? 1 : 0;
    const push = p.strategy === 'iniciativa' ? 1 : 0, save = p.strategy === 'reserva' ? 1 : 0;
    return { ...a, cost: a.cost + (a.pressure ? power + push : 0),
      pressure: a.pressure ? Math.max(1, a.pressure + power - skill - stamina + push - save) : 0,
      bonus: 2 + skill, recovery: (id === 'defensa' ? 2 : 5) + stamina + save };
  }
  const legalFor = f => Object.keys(ACTIONS).filter(id => actionFor(f, id).cost <= f.energy);
  function choose(state) {
    state.rng = (Math.imul(1664525, state.rng) + 1013904223) >>> 0;
    const options = state.enemy.energy < 3 ? ['recuperar', 'defensa'] : legalFor(state.enemy);
    state.intent = options[state.rng % options.length];
    return state;
  }
  function createGame(seed = 20261022, target = 2, profiles = {}) {
    if (!Number.isInteger(seed) || ![1, 2].includes(target)) throw new Error('Formato no válido');
    return choose({ version: 1, seed: seed >>> 0, rng: seed >>> 0, target, turn: 1,
      phase: 'turn', player: fighter(0, profiles.player), enemy: fighter(0, profiles.enemy), intent: null, last: null, winner: null });
  }
  function legalActions(state) { return state.phase === 'turn' ? legalFor(state.player) : []; }
  function pressure(f, id, other) {
    const a = actionFor(f, id);
    if (!a.pressure) return 0;
    const value = a.pressure + (a.beats === other ? a.bonus : 0) + (other === 'recuperar' ? 1 : 0);
    return other === 'defensa' ? 1 : value;
  }
  function prepare(f, id) {
    const a = actionFor(f, id), next = { ...f, energy: f.energy - a.cost };
    if (id === 'recuperar') { next.energy += a.recovery; next.balance += 1; }
    if (id === 'defensa') next.energy += a.recovery;
    next.energy = clamp(next.energy); next.balance = clamp(next.balance);
    return next;
  }
  function resolve(state, action) {
    if (!legalActions(state).includes(action)) throw new Error('Acción no disponible');
    const enemyAction = state.intent;
    const player = prepare(state.player, action), enemy = prepare(state.enemy, enemyAction);
    const toEnemy = pressure(state.player, action, enemyAction), toPlayer = pressure(state.enemy, enemyAction, action);
    player.balance = clamp(player.balance - toPlayer);
    enemy.balance = clamp(enemy.balance - toEnemy);
    const playerFall = player.balance === 0, enemyFall = enemy.balance === 0;
    // Simultaneous falls reset the exchange without points in this experimental format.
    if (playerFall && !enemyFall) enemy.score++;
    if (enemyFall && !playerFall) player.score++;
    const winner = player.score >= state.target ? 'player' : enemy.score >= state.target ? 'enemy' : null;
    const outcome = playerFall && enemyFall ? 'Caída simultánea. Sin punto.' : enemyFall ? 'Caída del azul. Punto para ti.' : playerFall ? 'Caída del rojo. Punto para el azul.' : 'Intercambio resuelto.';
    const changes = {};
    for (const [side, next] of Object.entries({ player, enemy })) {
      changes[side] = {};
      for (const resource of ['energy', 'balance']) {
        const before = state[side][resource], after = next[resource];
        changes[side][resource] = { before, after, delta: after - before };
      }
    }
    return { ...state, phase: 'resolution', player, enemy, winner,
      last: { action, enemyAction, toEnemy, toPlayer, playerFall, enemyFall, outcome, changes } };
  }
  function advance(state) {
    if (state.phase !== 'resolution') throw new Error('No hay resolución pendiente');
    if (state.winner) return { ...state, phase: 'final' };
    const fell = state.last.playerFall || state.last.enemyFall;
    return choose({ ...state, phase: 'turn', turn: state.turn + 1, last: null,
      player: fell ? fighter(state.player.score, state.player.profile) : { ...state.player },
      enemy: fell ? fighter(state.enemy.score, state.enemy.profile) : { ...state.enemy } });
  }
  const api = { MAX, ACTIONS, actionFor, createGame, legalActions, resolve, advance };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Lucha = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
