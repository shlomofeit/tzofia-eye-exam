import type { Alert, FilterValues } from "../types/alert";

export function filterAlerts(alerts: Alert[], filters: FilterValues): Alert[] {
  const search = filters.search.trim().toLowerCase();

  return alerts.filter(
    (alert) =>
      alert.displayName.toLowerCase().includes(search) &&
      (filters.arena === "All" || alert.arena === filters.arena) &&
      (filters.priority === "All" || alert.priority === filters.priority),
  );
}
