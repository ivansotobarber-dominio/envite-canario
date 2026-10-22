(function () {
  'use strict';
  const E = window.Lucha, $ = id => document.getElementById(id);
  const M = window.LuchaEncounter, params = new URLSearchParams(location.search);
  let encounter = null, setupError = '';
  if (params.has('equipo')) {
    try { encounter = M.create(params.get('equipo').split(','), params.get('estrategia') || 'equilibrada'); }
    catch (e) { setupError = 'Encuentro no válido. Duelo libre.'; }
  }
  let state = encounter ? M.game(encounter) : E.createGame();
  if (encounter) {
    document.querySelector('.game').classList.add('team-game');
    $('target').value = '1'; $('target').disabled = true;
    $('mode-link').href = 'index.html'; $('mode-link').textContent = 'Duelo libre';
    $('reset').title = 'Reiniciar encuentro completo'; $('reset').setAttribute('aria-label', 'Reiniciar encuentro completo');
  }
  const icon = name => window.LuchaIcons[name] || '';
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  for (const [id, a] of Object.entries(E.ACTIONS)) {
    const button = document.createElement('button');
    button.className = 'action'; button.dataset.action = id;
    button.innerHTML = icon(a.icon) + '<strong></strong><small></small>';
    button.querySelector('strong').textContent = a.name;
    button.addEventListener('click', () => update(() => E.resolve(state, id), true));
    $('actions').append(button);
  }
  function pose(side, id, fell) {
    $(side + '-figure').setAttribute('class', 'figure ' + (fell ? 'fallen' : id ? 'pose-' + id : ''));
    $(side + '-pose').textContent = fell ? 'Caída' : id ? E.ACTIONS[id].name : 'En agarre';
  }
  function render() {
    if (encounter) {
      document.querySelector('.topbar h1').textContent = 'Encuentro ' + (encounter.index + 1) + '/3 · ' + M.score(encounter).join(':');
      document.querySelector('.red > strong').textContent = state.player.profile.name + ' · Tú';
      document.querySelector('.blue > strong').textContent = state.enemy.profile.name + ' · Azul';
    }
    for (const side of ['player', 'enemy']) {
      for (const stat of ['energy', 'balance']) {
        $(side + '-' + stat).value = state[side][stat];
        $(side + '-' + stat + '-text').textContent = state[side][stat] + '/10';
      }
      $(side + '-score').textContent = state[side].score;
    }
    $('turn').textContent = 'INTERCAMBIO ' + state.turn;
    $('intent-label').textContent = state.phase === 'turn' ? 'INTENCIÓN DEL AZUL' : state.phase === 'resolution' ? 'ACCIÓN DEL AZUL' : 'RESULTADO';
    $('intent').textContent = state.phase === 'final' ? 'Combate cerrado' : E.ACTIONS[state.intent].name;
    const last = state.last;
    pose('red', last?.action, last?.playerFall); pose('blue', last?.enemyAction, last?.enemyFall);
    if (state.phase === 'turn') {
      $('headline').textContent = 'Tu decisión';
      $('detail').textContent = encounter ? M.strategies[encounter.strategy] + ' · Una caída experimental' : 'Objetivo experimental: ' + state.target + (state.target === 1 ? ' caída.' : ' caídas.');
    } else if (state.phase === 'resolution') {
      $('headline').textContent = last.outcome;
      $('detail').textContent = [['player', 'Tú'], ['enemy', 'Azul']].map(([side, name]) => {
        const c = last.changes[side];
        return name + ': energía ' + c.energy.before + '→' + c.energy.after + ', equilibrio ' + c.balance.before + '→' + c.balance.after + '.';
      }).join(' ');
    } else {
      $('headline').textContent = state.winner === 'player' ? 'Victoria del rojo' : 'Victoria del azul';
      $('detail').textContent = state.player.score + ' : ' + state.enemy.score + ' · Combate experimental terminado.';
    }
    const next = $('continue'); next.hidden = state.phase === 'turn';
    next.textContent = state.phase === 'final' ? 'Revancha' : state.winner ? 'Ver resultado' : 'Continuar';
    if (encounter && state.phase === 'final') next.textContent = encounter.index === 2 ? 'Ver encuentro' : 'Siguiente enfrentamiento';
    for (const button of $('actions').children) {
      const id = button.dataset.action, a = E.actionFor(state.player, id);
      button.disabled = !E.legalActions(state).includes(id);
      const best = a.beats === state.intent;
      button.classList.toggle('best', best && state.phase === 'turn');
      const selected = state.phase !== 'turn' && last?.action === id;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('small').textContent = a.pressure ? '−' + a.cost + ' energía · ' + (best ? 'Ventaja +' + a.bonus : 'Presión ' + a.pressure) : 'Hasta +' + a.recovery + ' energía · ' + (id === 'defensa' ? 'protege' : 'expuesto');
      button.title = a.beats ? 'Ventaja abstracta frente a ' + E.ACTIONS[a.beats].name : id === 'defensa' ? 'Reduce la presión recibida a 1, sin recuperar equilibrio' : 'Hasta +' + a.recovery + ' energía y +1 equilibrio; recibe más presión';
      button.setAttribute('aria-label', a.name + '. ' + button.querySelector('small').textContent + (state.phase === 'turn' && state.player.energy < a.cost ? '. Energía insuficiente' : ''));
    }
  }
  function update(change, focus) {
    try { state = change(); render();
      if (focus) (state.phase === 'turn' ? document.querySelector('.action:not(:disabled)') : $('continue')).focus();
    } catch (error) { $('headline').textContent = 'No se pudo resolver'; $('detail').textContent = error.message; $('reset').focus(); }
  }
  function resetEncounter() { encounter = M.create(encounter.order, encounter.strategy, encounter.seed); return M.game(encounter); }
  $('continue').addEventListener('click', () => {
    if (encounter && state.phase === 'final') {
      encounter = M.finish(encounter, state);
      if (encounter.phase === 'complete') {
        document.querySelector('.game').hidden = true; $('match-summary').hidden = false;
        const score = M.score(encounter); $('match-score').textContent = (score[0] > score[1] ? 'Victoria del rojo' : 'Victoria del azul') + ' · ' + score.join(' : ');
        $('match-results').replaceChildren();
        encounter.results.forEach(r => { const li = document.createElement('li'); li.textContent = r.player + ' / ' + r.enemy + ': ' + (r.winner === 'player' ? 'gana rojo' : 'gana azul'); $('match-results').append(li); });
        $('repeat-encounter').focus(); return;
      }
      update(() => M.game(encounter), true); return;
    }
    update(() => state.phase === 'final' ? E.createGame(state.seed, state.target) : E.advance(state), true);
  });
  $('reset').addEventListener('click', () => update(() => encounter ? resetEncounter() : E.createGame(state.seed, state.target), true));
  $('repeat-encounter').addEventListener('click', () => { $('match-summary').hidden = true; document.querySelector('.game').hidden = false; update(resetEncounter, true); });
  $('target').addEventListener('change', event => update(() => E.createGame(state.seed, Number(event.target.value)), false));
  render();
  if (setupError) $('headline').textContent = setupError;
})();
