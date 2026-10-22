(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' && module.exports ? require('./engine.js') : root.Lucha;
  const roster = [
    ['aro', 'Aro', 28, 98, 181, 8, 6, 6], ['bente', 'Bente', 31, 90, 176, 6, 8, 6],
    ['ciro', 'Ciro', 26, 105, 185, 6, 6, 8], ['dario', 'Darío', 34, 112, 190, 7, 7, 7],
    ['elio', 'Elio', 29, 92, 179, 8, 7, 5], ['faro', 'Faro', 32, 101, 183, 5, 8, 7]
  ].map(([id, name, age, weight, height, force, skill, stamina]) => Object.freeze({ id, name, age, weight, height, force, skill, stamina, rating: Math.round(10 * (force + skill + stamina) / 3) }));
  Object.freeze(roster);
  const strategies = Object.freeze({ equilibrada: 'Equilibrada', iniciativa: 'Iniciativa: +1 presión, +1 coste', reserva: 'Reserva: −1 presión, +1 recuperación' });
  const get = id => roster.find(p => p.id === id);
  function selection(order) {
    if (!Array.isArray(order) || order.length > 3 || new Set(order).size !== order.length || order.some(id => !get(id))) throw new Error('Convocatoria no válida');
  }
  function toggle(order, id) {
    selection(order); if (!get(id)) throw new Error('Personaje no válido');
    const next = order.includes(id) ? order.filter(x => x !== id) : [...order, id]; selection(next); return next;
  }
  function move(order, id, offset) {
    selection(order); const i = order.indexOf(id), j = i + offset;
    if (i < 0 || ![-1, 1].includes(offset) || j < 0 || j >= order.length) throw new Error('Orden no válido');
    const next = [...order]; [next[i], next[j]] = [next[j], next[i]]; return next;
  }
  function create(order, strategy = 'equilibrada', seed = 20261022) {
    selection(order);
    if (order.length !== 3 || !Object.hasOwn(strategies, strategy) || !Number.isInteger(seed)) throw new Error('El encuentro requiere tres convocados y una estrategia válida');
    return { order: [...order], strategy, seed, index: 0, results: [], phase: 'playing' };
  }
  function game(match) {
    if (match.phase !== 'playing') throw new Error('Encuentro terminado');
    return E.createGame(match.seed + match.index, 1, { player: { ...get(match.order[match.index]), strategy: match.strategy }, enemy: { ...roster[[3, 1, 2][match.index]], strategy: 'equilibrada' } });
  }
  function finish(match, duel) {
    const expected = game(match);
    if (duel.phase !== 'final' || !['player', 'enemy'].includes(duel.winner) || duel.seed !== expected.seed || duel.player.profile?.id !== expected.player.profile.id) throw new Error('Resultado fuera de orden');
    const result = { player: duel.player.profile.name, enemy: duel.enemy.profile.name, winner: duel.winner };
    const index = match.index + 1;
    return { ...match, index, results: [...match.results, result], phase: index === 3 ? 'complete' : 'playing' };
  }
  const score = match => [match.results.filter(r => r.winner === 'player').length, match.results.filter(r => r.winner === 'enemy').length];
  const api = { roster, strategies, get, toggle, move, create, game, finish, score };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.LuchaEncounter = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
