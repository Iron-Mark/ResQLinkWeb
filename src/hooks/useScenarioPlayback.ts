import { useState, useEffect, useRef, useCallback } from "react";
import scenarioData from "../assets/data/scenarios/disaster_scenario_1.json";

export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type IncidentStatus = "Active" | "Responding" | "Contained" | "Resolved";

export interface Incident {
  id: string;
  type: string;
  severity: IncidentSeverity;
  location: string;
  lat: number;
  lng: number;
  status: IncidentStatus;
  responders: number;
  spawnAtSecond: number;
  /** Elapsed seconds since the incident appeared — drives the "X min ago" label */
  ageSeconds: number;
}

export interface KpiSnapshot {
  ongoingMissions: number;
  activeResponders: number;
  pendingCases: number;
  resolvedToday: number;
}

export interface ResourceEntry {
  name: string;
  available: number;
  deployed: number;
  total: number;
}

export interface ScenarioPlaybackState {
  isActive: boolean;
  elapsedSeconds: number;
  incidents: Incident[];
  kpis: KpiSnapshot;
  resources: ResourceEntry[];
}

const TICK_INTERVAL_MS = 1000;

function formatAgeLabel(seconds: number): string {
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  return `${Math.floor(seconds / 3600)} hr ago`;
}

/** Derives KPIs from the current live incident list. */
function computeKpis(
  incidents: Incident[],
  baseKpis: typeof scenarioData.initialKpis,
  resolvedCount: number
): KpiSnapshot {
  const active = incidents.filter(
    (i) => i.status === "Active" || i.status === "Responding"
  );
  const pending = incidents.filter(
    (i) => i.status === "Active" && i.responders === 0
  );
  const onMission = incidents.filter(
    (i) => i.status === "Responding" && i.responders > 0
  );
  const totalActiveResponders = active.reduce(
    (sum, i) => sum + i.responders,
    0
  );

  return {
    ongoingMissions: onMission.length + Math.max(0, baseKpis.ongoingMissions - 12),
    activeResponders: Math.max(baseKpis.activeResponders, totalActiveResponders),
    pendingCases: pending.length,
    resolvedToday: baseKpis.resolvedToday + resolvedCount,
  };
}

/**
 * `useScenarioPlayback` drives the Demo Mode simulation.
 *
 * Returns live-updating state: incidents, KPIs, resources, and elapsed time.
 * When `isActive` is false the hook returns a static snapshot of the initial
 * scenario so the component can render placeholder data when Demo Mode is OFF.
 */
export function useScenarioPlayback(isActive: boolean): ScenarioPlaybackState {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  const allIncidentDefs = scenarioData.incidents as Array<{
    id: string;
    type: string;
    severity: string;
    location: string;
    lat: number;
    lng: number;
    status: string;
    responders: number;
    spawnAtSecond: number;
  }>;

  const allEvents = scenarioData.events;

  const reset = useCallback(() => {
    setElapsedSeconds(0);
    setIncidents([]);
    setResolvedCount(0);
    elapsedRef.current = 0;
  }, []);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      reset();
      return;
    }

    // Start (or restart) the playback loop
    reset();

    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      const elapsed = elapsedRef.current;

      // Loop every `durationSeconds`
      const loopElapsed = elapsed % scenarioData.durationSeconds;

      setElapsedSeconds(loopElapsed);

      setIncidents((prev) => {
        // On loop reset, clear everything
        if (loopElapsed === 0) {
          setResolvedCount(0);
          return [];
        }

        let next = prev.map((i) => ({
          ...i,
          ageSeconds: i.ageSeconds + 1,
        }));

        // Spawn new incidents whose spawnAtSecond matches
        for (const def of allIncidentDefs) {
          if (def.spawnAtSecond === loopElapsed && !next.find((i) => i.id === def.id)) {
            next = [
              ...next,
              {
                ...def,
                severity: def.severity as IncidentSeverity,
                status: def.status as IncidentStatus,
                ageSeconds: 0,
              },
            ];
          }
        }

        // Apply timeline events
        for (const event of allEvents) {
          if (event.atSecond !== loopElapsed) continue;

          if (event.type === "incident_spawn") {
            const def = allIncidentDefs.find((d) => d.id === event.incidentId);
            if (def && !next.find((i) => i.id === def.id)) {
              next = [
                ...next,
                {
                  ...def,
                  severity: def.severity as IncidentSeverity,
                  status: def.status as IncidentStatus,
                  ageSeconds: 0,
                },
              ];
            }
          } else if (event.type === "status_change" && "newStatus" in event) {
            next = next.map((i) =>
              i.id === event.incidentId
                ? {
                    ...i,
                    status: event.newStatus as IncidentStatus,
                  }
                : i
            );
            if (event.newStatus === "Resolved") {
              setResolvedCount((c) => c + 1);
            }
          } else if (event.type === "responder_assign" && "responderCount" in event) {
            next = next.map((i) =>
              i.id === event.incidentId
                ? {
                    ...i,
                    status: "Responding" as IncidentStatus,
                    responders: event.responderCount as number,
                  }
                : i
            );
          }
        }

        // Remove resolved incidents after a short grace period (10s)
        next = next.filter(
          (i) => !(i.status === "Resolved" && i.ageSeconds > 10)
        );

        return next;
      });
    }, TICK_INTERVAL_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, reset, allIncidentDefs, allEvents]);

  const kpis = computeKpis(incidents, scenarioData.initialKpis, resolvedCount);

  if (!isActive) {
    // Return static initial snapshot
    return {
      isActive: false,
      elapsedSeconds: 0,
      incidents: allIncidentDefs
        .filter((d) => d.spawnAtSecond === 0)
        .map((d) => ({
          ...d,
          severity: d.severity as IncidentSeverity,
          status: d.status as IncidentStatus,
          ageSeconds: 0,
        })),
      kpis: { ...scenarioData.initialKpis },
      resources: scenarioData.resources as ResourceEntry[],
    };
  }

  // Format time label on each incident
  const incidentsWithLabel = incidents.map((i) => ({
    ...i,
    _timeLabel: formatAgeLabel(i.ageSeconds),
  }));

  return {
    isActive: true,
    elapsedSeconds,
    incidents: incidentsWithLabel,
    kpis,
    resources: scenarioData.resources as ResourceEntry[],
  };
}

/** Exposed so components can format age without re-importing. */
export { formatAgeLabel };
