(function () {
  const M = window.LuchaEncounter, $ = id => document.getElementById(id);
  let order = ['aro', 'bente', 'ciro'];
  function render() {
    $('roster').replaceChildren(); $('order').replaceChildren();
    for (const p of M.roster) {
      const label = document.createElement('label'); label.className = 'person';
      const check = document.createElement('input'); check.type = 'checkbox'; check.value = p.id; check.checked = order.includes(p.id); check.disabled = !check.checked && order.length === 3; check.setAttribute('aria-label', 'Convocar ' + p.name);
      const text = document.createElement('span');
      const title = document.createElement('strong'); title.textContent = p.name + ' · ' + p.age + ' años';
      const size = document.createElement('span'); size.textContent = p.weight + ' kg · ' + p.height + ' cm · Val. ' + p.rating;
      const stats = document.createElement('small'); stats.textContent = 'Fuerza ' + p.force + ' · Habilidad ' + p.skill + ' · Resistencia ' + p.stamina;
      text.append(title, size, stats); label.append(check, text); $('roster').append(label);
      check.addEventListener('change', () => { order = M.toggle(order, p.id); render(); document.querySelector('input[value="' + p.id + '"]').focus(); });
    }
    order.forEach((id, i) => {
      const li = document.createElement('li'), name = document.createElement('span'); name.textContent = M.get(id).name; li.append(name);
      for (const [offset, arrow, verb] of [[-1, '↑', 'Subir'], [1, '↓', 'Bajar']]) {
        const b = document.createElement('button'); b.textContent = arrow; b.setAttribute('aria-label', verb + ' ' + M.get(id).name); b.title = verb + ' ' + M.get(id).name; b.disabled = i + offset < 0 || i + offset >= order.length;
        b.addEventListener('click', () => { order = M.move(order, id, offset); render(); document.querySelector('input[value="' + id + '"]').focus(); }); li.append(b);
      }
      $('order').append(li);
    });
    $('count').textContent = 'Convocatoria ' + order.length + '/3';
    $('selection-status').textContent = order.length === 3 ? 'Tres convocados · Orden confirmado' : (3 - order.length) + ' plazas disponibles';
    $('start').disabled = order.length !== 3;
  }
  $('start').addEventListener('click', () => { M.create(order, $('strategy').value); const url = new URL('index.html', location.href); url.searchParams.set('equipo', order.join(',')); url.searchParams.set('estrategia', $('strategy').value); location.href = url.href; });
  render();
})();
