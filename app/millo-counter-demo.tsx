"use client";

import { useState } from "react";

type Team = "A" | "B";
type Rail = "envites" | "manos";
type Score = Record<Team, Record<Rail, number>>;

const initialScores: Score = {
  A: { envites: 0, manos: 0 },
  B: { envites: 0, manos: 0 },
};

const railLabels: Record<Rail, string> = {
  envites: "Envites",
  manos: "Manos",
};

export function MilloCounterDemo() {
  const [scores, setScores] = useState<Score>(initialScores);
  const [lastAction, setLastAction] = useState("La mesa está lista para arrayar.");

  const markMillo = (team: Team, rail: Rail) => {
    setScores((current) => ({
      ...current,
      [team]: {
        ...current[team],
        [rail]: Math.min(current[team][rail] + 1, 9),
      },
    }));
    setLastAction(`Equipo ${team}: arráyate un millo en ${railLabels[rail].toLowerCase()}.`);
  };

  const reset = () => {
    setScores(initialScores);
    setLastAction("Marcador reiniciado para una nueva partida.");
  };

  return (
    <aside className="millo-counter-demo" aria-label="Demo del Marcador de Millos">
      <div className="millo-demo-heading">
        <span>Marcador de Millos</span>
        <button type="button" onClick={reset}>
          Reiniciar
        </button>
      </div>
      <div className="millo-rails" aria-live="polite">
        {(["A", "B"] as Team[]).map((team) => (
          <div className="millo-team" key={team}>
            <strong>Equipo {team}</strong>
            {(["envites", "manos"] as Rail[]).map((rail) => (
              <div className="millo-rail" key={`${team}-${rail}`}>
                <span>{railLabels[rail]}</span>
                <div
                  className="millo-track"
                  aria-label={`Equipo ${team}, ${scores[team][rail]} millos en ${railLabels[rail].toLowerCase()}`}
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <i className={index < scores[team][rail] ? "is-marked" : ""} key={index} />
                  ))}
                </div>
                <button type="button" onClick={() => markMillo(team, rail)}>
                  Arrayar
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>{lastAction}</p>
    </aside>
  );
}
