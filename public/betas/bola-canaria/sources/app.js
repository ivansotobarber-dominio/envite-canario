(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  if (!window.Matter || !window.BolaRules || !window.BolaPhysics || !window.BolaIcons) {
    $('headline').textContent = 'Error: faltan recursos locales'; $('launch').disabled = true; return;
  }
  document.querySelectorAll('[data-icon]').forEach(e => e.innerHTML = BolaIcons[e.dataset.icon] || '');
  // Native ranges expose the value; outputs must not announce it a second time.
  document.querySelectorAll('output').forEach(e => e.setAttribute('aria-hidden', 'true'));
  const R = BolaRules, P = BolaPhysics, canvas = $('court'), ctx = canvas.getContext('2d');
  let game = new R.Game(), mode = 'arrime', measuring = false, sim = null, frame = 0;
  const name = t => t === 0 ? 'Tú' : 'IA';
  function shot() { return { mode, lateral: +$('lateral').value, angle: +$('angle').value, power: +$('power').value }; }
  function defaults() { mode = 'arrime'; $('lateral').value = 150; $('angle').value = 0; $('power').value = 70; }
  function update() {
    const ready = game.phase === 'ready', human = ready && game.turn === 0, point = R.standing(game.pieces);
    $('score-t').textContent = game.score[0]; $('score-i').textContent = game.score[1]; $('hand').textContent = `${game.hand} / 3`;
    $('turn').textContent = game.phase === 'moving' ? 'Bolas en movimiento' : ready ? (human ? 'Tu lanzamiento' : 'Lanzamiento IA') : game.phase === 'final' ? 'Partida terminada' : 'Resultado';
    $('point').textContent = point.leader === null ? 'Sin punto definido' : `Punto: ${name(point.leader)}`;
    $('stock').textContent = `Tú ${game.remaining[0]} · IA ${game.remaining[1]}`;
    $('direction').textContent = game.direction === 1 ? 'SALIDA →' : '← SALIDA';
    document.querySelectorAll('[data-mode]').forEach(b => { b.disabled = !human; b.setAttribute('aria-pressed', b.dataset.mode === mode); });
    for (const id of ['lateral', 'angle', 'power', 'cancel', 'launch']) $(id).disabled = !human;
    $('reset').disabled = game.phase === 'moving'; $('measure').disabled = game.phase === 'moving';
    $('resign').disabled = !game.canResign();
    $('lateral-out').textContent = Math.round(+$('lateral').value); $('angle-out').textContent = `${Number($('angle').value).toFixed(1)}°`; $('power-out').textContent = `${$('power').value}%`;
    $('lateral').setAttribute('aria-valuetext', `${$('lateral').value} unidades de cancha`);
    $('angle').setAttribute('aria-valuetext', `${Number($('angle').value).toFixed(1).replace('.', ',')} grados`);
    $('power').setAttribute('aria-valuetext', `${$('power').value}%`);
    $('measure').setAttribute('aria-pressed', measuring); $('measurements').hidden = !measuring;
    $('measurements').textContent = point.distances.map(p => `${p.id}: ${(p.distance / 60).toFixed(2)} m`).join(' · ') || 'Sin bolas válidas para medir';
    $('history').textContent = game.history.map(h => `M${h.hand} ${h.reason === 'null' ? 'nula' : h.leader === null ? 'empate' : name(h.leader) + ' +' + h.points}`).join(' · ') || 'Sin manos cerradas';
    const next = $('continue'); next.hidden = human || game.phase === 'moving' || game.phase === 'error';
    let title, detail, action = 'Continuar';
    if (ready) {
      title = human ? 'Tu lanzamiento' : 'Turno de la IA';
      detail = human ? `${mode === 'arrime' ? 'Arrime' : 'Impacto rasante'} · ${P.speed(shot()).toFixed(1).replace('.', ',')} u/paso` : 'Preparación local · misma física';
      action = 'Jugar IA';
    } else if (game.phase === 'moving') { title = 'Lanzamiento en curso'; detail = 'Resolviendo posición y colisiones'; }
    else if (game.phase === 'error') { title = 'Simulación detenida'; detail = 'No se ha adjudicado el tiro. Reinicia la partida.'; }
    else {
      const result = game.result;
      if (result.ended) {
        title = result.reason === 'null' ? 'Mano nula' : result.leader === null ? 'Mano empatada' : `${name(result.leader)} suma ${result.points}`;
        detail = result.reason === 'null' ? 'Boliche fuera · 0 puntos' : result.leader === null ? 'Sin ventaja medible · 0 puntos' : `Bolas que puntúan: ${result.scoring.join(', ')}`;
        action = 'Siguiente mano';
        if (game.phase === 'final') {
          title = game.score[0] === game.score[1] ? 'Partida empatada' : game.score[0] > game.score[1] ? 'Ganas la partida' : 'La IA gana';
          detail = `Final ${game.score[0]} : ${game.score[1]} · ${detail}`; action = 'Nueva partida';
        }
      } else {
        title = result.leader === null ? 'Punto empatado' : `Punto de ${name(result.leader)}`;
        detail = `Siguiente: ${name(result.next)} · ${result.points} tanto(s) provisional(es)`;
      }
    }
    $('headline').textContent = title; $('detail').textContent = detail; next.querySelector('span').textContent = action;
    document.body.dataset.phase = game.phase; draw();
  }
  function draw() {
    const pieces = sim ? P.snapshot(sim) : game.pieces;
    ctx.clearRect(0, 0, 1200, 300); ctx.fillStyle = '#343e40'; ctx.fillRect(0, 0, 1200, 300);
    // Deterministic, original mineral texture, not a downloaded decorative asset.
    for (let i = 0; i < 1600; i++) { ctx.fillStyle = i % 2 ? '#46504f' : '#2e383a'; ctx.fillRect((i * 379) % 1200, (i * 137) % 300, 1.5, 1); }
    ctx.strokeStyle = '#94a6a2'; ctx.lineWidth = 2; ctx.strokeRect(1, 1, 1198, 298);
    ctx.setLineDash([6, 7]); ctx.beginPath(); ctx.moveTo(game.direction === 1 ? 110 : 1090, 0); ctx.lineTo(game.direction === 1 ? 110 : 1090, 300); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = '12px Segoe UI'; ctx.fillStyle = '#aebcba'; ctx.textAlign = 'center';
    for (let x = 240; x < 1200; x += 240) { ctx.fillText(`${x / 60} m`, x, 20); ctx.fillRect(x, 0, 1, 6); }
    const point = R.standing(pieces), jack = pieces.find(p => p.team === -1);
    if (measuring && jack && !jack.out) {
      ctx.setLineDash([3, 5]);
      for (const p of point.distances) { ctx.strokeStyle = p.team ? '#59d6ca' : '#ff776c'; ctx.beginPath(); ctx.moveTo(jack.x, jack.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      ctx.setLineDash([]);
    }
    if (game.phase === 'ready' && game.turn === 0) {
      const s = shot(), start = P.origin(game.direction, s.lateral), a = s.angle * Math.PI / 180;
      ctx.strokeStyle = '#efd273'; ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.lineTo(start.x + game.direction * Math.cos(a) * 230, start.y + Math.sin(a) * 230); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#ff776c'; ctx.beginPath(); ctx.arc(start.x, start.y, 12, 0, Math.PI * 2); ctx.stroke();
    }
    for (const p of pieces.filter(p => !p.out)) {
      if (point.scoring.includes(p.id)) { ctx.strokeStyle = '#f2f5f3'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 5, 0, Math.PI * 2); ctx.stroke(); }
      ctx.fillStyle = p.team === -1 ? '#efd273' : p.team === 0 ? '#ff776c' : '#59d6ca'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#172124'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#f2f5f3'; ctx.font = 'bold 11px Segoe UI'; ctx.textAlign = 'center'; ctx.fillText(p.team === -1 ? 'B' : p.id, p.x, p.y - p.r - 9);
    }
  }
  function launch(s) {
    const identity = game.launch(); sim = P.begin(game.pieces, identity, s, game.direction); update();
    let previous = performance.now(), accumulator = 0;
    function tick(now) {
      accumulator += Math.min(now - previous, 100); previous = now;
      while (accumulator >= P.C.step && !sim.done) { P.step(sim); accumulator -= P.C.step; }
      draw();
      if (!sim.done) { frame = requestAnimationFrame(tick); return; }
      const result = P.snapshot(sim), error = sim.error; sim = null;
      if (error) game.phase = 'error'; else game.settle(result);
      update(); if (!$('continue').hidden) $('continue').focus();
    }
    frame = requestAnimationFrame(tick);
  }
  document.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { mode = b.dataset.mode; update(); });
  for (const id of ['lateral', 'angle', 'power']) $(id).oninput = update;
  $('launch').onclick = () => launch(shot());
  $('cancel').onclick = () => { defaults(); update(); };
  $('measure').onclick = () => { measuring = !measuring; update(); };
  $('resign').onclick = () => { game.resign(); update(); $('continue').focus(); };
  $('continue').onclick = () => {
    if (game.phase === 'final') { $('reset-dialog').showModal(); return; }
    if (game.phase === 'ready' && game.turn === 1) { launch(P.ai(game.pieces, game.direction).shot); return; }
    game.continue(); defaults(); update(); if (game.turn === 0) $('launch').focus(); else $('continue').focus();
  };
  $('reset').onclick = () => $('reset-dialog').showModal();
  $('reset-dialog').onclose = () => {
    if ($('reset-dialog').returnValue !== 'reset') return;
    cancelAnimationFrame(frame); sim = null; game = new R.Game(); measuring = false; defaults(); update(); $('launch').focus();
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('reset-dialog').open && game.phase === 'ready' && game.turn === 0) { defaults(); update(); }
  });
  canvas.addEventListener('pointerdown', e => {
    if (game.phase !== 'ready' || game.turn !== 0) return;
    const rect = canvas.getBoundingClientRect();
    // object-fit may letterbox the fixed horizontal court inside its responsive box.
    const scale = Math.min(rect.width / 1200, rect.height / 300), ox = (rect.width - 1200 * scale) / 2, oy = (rect.height - 300 * scale) / 2;
    const x = (e.clientX - rect.left - ox) / scale, y = (e.clientY - rect.top - oy) / scale;
    if (x < 0 || x > 1200 || y < 0 || y > 300) return;
    const start = P.origin(game.direction, +$('lateral').value), dx = (x - start.x) * game.direction;
    if (dx > 0) { $('angle').value = Math.max(-18, Math.min(18, Math.atan2(y - start.y, dx) * 180 / Math.PI)); update(); }
  });
  update();
})();
