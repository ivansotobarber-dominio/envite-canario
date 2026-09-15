"use client";

import { useState } from "react";

const levels = ["piedras", "chicos", "partidos"];
type Score = { teams: number[][]; goals: number[] };
const initialScores: Score = { teams: [[0, 0, 0], [0, 0, 0]], goals: [12, 2, 2] };

export function MilloCounterDemo() {
  const [scores, setScores] = useState<Score>(initialScores);
  const [history, setHistory] = useState<Score[]>([]);
  const [lastAction, setLastAction] = useState("Sin anotaciones.");

  // Same manual transitions as site_src/assets/validation.js, without storage or promotion.
  const change = (team: number, level: number, value: number) => {
    value = Math.max(0, Math.min(scores.goals[level], value));
    if (scores.teams[team][level] === value) return;
    setHistory([...history, scores]);
    setScores({ ...scores, teams: scores.teams.map((row, t) => row.map((n, l) => t === team && l === level ? value : n)) });
    setLastAction(`Equipo ${team + 1}: ${value} ${levels[level]}.`);
  };
  const goal = (level: number, value: number) => {
    if (scores.teams.some(row => row[level] > value)) {
      setLastAction(`Reduce primero las anotaciones de ${levels[level]} para cambiar este objetivo.`);
      return;
    }
    if (scores.goals[level] === value) return;
    setHistory([...history, scores]);
    setScores({ ...scores, goals: scores.goals.map((n, l) => l === level ? value : n) });
    setLastAction("Objetivo provisional actualizado, sin convertir anotaciones.");
  };

  const reset = () => {
    if (!window.confirm("Reiniciar piedras, chicos y partidos de ambos equipos?")) return;
    setHistory([...history, scores]);
    setScores({ ...scores, teams: [[0, 0, 0], [0, 0, 0]] });
    setLastAction("Marcador reiniciado.");
  };

  return (
    <aside id="contador" className="millo-counter-demo" aria-label="Contador manual de piedras, chicos y partidos">
      <div className="millo-demo-heading">
        <span>Contador de piedras, chicos y partidos</span>
      </div>
      <p>Concepto de Iván · Perfil provisional</p>
      <div className="millo-profile">
        {[1, 2].map(level => <label key={level}>
          {level === 1 ? "Chicos por partido" : "Partidos por encuentro"}
          <select id={`counter-${levels[level]}-goal`} value={scores.goals[level]} onChange={e => goal(level, Number(e.target.value))}>
            <option value="2">2</option><option value="3">3</option>
          </select>
        </label>)}
      </div>
      <div className="millo-rails">
        {[0, 1].map((team) => (
          <div className="millo-team" key={team}>
            <strong>Equipo {team + 1}</strong>
            {levels.map((name, level) => {
              const value = scores.teams[team][level];
              const label = name[0].toUpperCase() + name.slice(1);
              const text = `${value}${level === 0 && value === 11 ? " · Tumbo" : level === 0 && value === 12 ? " · Chico" : ""}`;
              return <div className="millo-level" key={name}>
                <div className="millo-level-heading"><strong>{label}</strong><output aria-label={`${label} equipo ${team + 1}`}>{text}</output></div>
                <input type="range" min="0" max={scores.goals[level]} step="1" value={value} aria-label={`Corredera de ${name} equipo ${team + 1}`} aria-valuetext={text} onChange={e => change(team, level, Number(e.target.value))} />
                <div className="millo-scale" aria-hidden="true">{Array.from({ length: scores.goals[level] + 1 }, (_, n) => <span key={n}>{n}</span>)}</div>
                <div className="millo-controls">
                  <button type="button" title={`Restar ${name}`} aria-label={`Restar ${name} equipo ${team + 1}`} disabled={value === 0} onClick={() => change(team, level, value - 1)}>−</button>
                  <button type="button" title={`Sumar ${name}`} aria-label={`Sumar ${name} equipo ${team + 1}`} disabled={value === scores.goals[level]} onClick={() => change(team, level, value + 1)}>+</button>
                  <button type="button" title={`Reiniciar solo ${name}`} aria-label={`Reiniciar ${name} equipo ${team + 1}`} disabled={value === 0} onClick={() => { if (window.confirm(`Reiniciar solo ${name} del equipo ${team + 1}?`)) change(team, level, 0); }}>↺</button>
                </div>
              </div>;
            })}
          </div>
        ))}
      </div>
      <div className="millo-controls">
        <button type="button" title="Deshacer ultimo cambio" aria-label="Deshacer ultimo cambio" disabled={!history.length} onClick={() => {
          setScores(history[history.length - 1]); setHistory(history.slice(0, -1)); setLastAction("Ultimo cambio deshecho.");
        }}>↶</button>
        <button type="button" title="Reiniciar marcador" aria-label="Reiniciar marcador" disabled={!scores.teams.some(row => row.some(Boolean))} onClick={reset}>↺</button>
      </div>
      <p role="status" aria-live="polite">{lastAction}</p>
    </aside>
  );
}
