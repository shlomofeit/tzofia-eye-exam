import { useEffect } from "react";
import AlertFilters from "../components/AlertFilters";
import AlertList from "../components/AlertList";
import AlertsMap from "../components/AlertsMap";
import { useAlertsStore } from "../store/alertsStore";
import { filterAlerts } from "../utils/alertsFilter";

export default function HomePage() {
  const alerts = useAlertsStore((state) => state.alerts);
  const isLoading = useAlertsStore((state) => state.isLoading);
  const error = useAlertsStore((state) => state.error);
  const search = useAlertsStore((state) => state.search);
  const arena = useAlertsStore((state) => state.arena);
  const priority = useAlertsStore((state) => state.priority);
  const setAlerts = useAlertsStore((state) => state.setAlerts);
  const removeAlert = useAlertsStore((state) => state.removeAlert);

  useEffect(() => {
    setAlerts();
  }, [setAlerts]);

  const filteredAlerts = filterAlerts(alerts, { search, arena, priority });
  const count =
    filteredAlerts.length === alerts.length
      ? `Alerts (${alerts.length})`
      : `Alerts (${filteredAlerts.length} out of ${alerts.length})`;

  return (
    <>
      <h2>{count}</h2>
      <AlertFilters />
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <AlertsMap alerts={filteredAlerts} height={420} />
      <AlertList alerts={filteredAlerts} onDelete={removeAlert} />
    </>
  );
}
