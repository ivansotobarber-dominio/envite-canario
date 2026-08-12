"use client";

import { useState } from "react";

type Team = "A" | "B";

export function MilloCounterDemo() {
  const [scores, setScores] = useState<Record<Team, number>>({ A: 0, B: 0 });
  const [lastAction, setLastAction] = useState("La mesa está lista.");

  const markMillo = (team: Team) => {
    setScores((current) => ({ ...current, [team]: Math.min(current[team] + 1, 9) }));
    setLastAction(`Equipo ${team}: arráyate un millo.`);
  };

  const reset = () => {
    setScores({ A: 0, B: 0 });
    setLastAction("Marcador reiniciado para una nueva partida.");
  };

  return (
    <aside className="millo-counter-demo" aria-label="Demo del Marcador de Millos">
      <div className="millo-demo-heading">
        <span>Demo de tanteo</span>
        <button type="button" onClick={reset}>Reiniciar</button>
      </div>
      <div className="millo-rails" aria-live="polite">
        {(["A", "B"] as Team[]).map((team) => (
          <div className="millo-rail" key={team}>
            <strong>Equipo {team}</strong>
            <div className="millo-track" aria-label={`Equipo ${team}, ${scores[team]} millos`}>
              {Array.from({ length: 10 }, (_, index) => (
                <i className={index < scores[team] ? "is-marked" : ""} key={index} />
              ))}
            </div>
            <button type="button" onClick={() => markMillo(team)}>Arrayar</button>
          </div>
        ))}
      </div>
      <p>{lastAction}</p>
    </aside>
  );
}
