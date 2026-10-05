import { useState } from "react";
import AlertsMap, { type MapAlert } from "../components/AlertsMap";
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alerts, setAlerts] = useState<MapAlert[]>([]);

  return (
    <>
      <h2>Alerts map</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <AlertsMap alerts={alerts} />
    </>
  );
}
