import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AlertsMap from "../components/AlertsMap";
import { useAlertsStore } from "../store/alertsStore";

const AlertPage = () => {
  const { id } = useParams();
  const alert = useAlertsStore((state) => state.selectedAlert);
  const error = useAlertsStore((state) => state.error);
  const setSelectedAlert = useAlertsStore((state) => state.setSelectedAlert);

  useEffect(() => {
    if (id) setSelectedAlert(id);
  }, [id, setSelectedAlert]);

  if (error) return <p className="error">{error}</p>;
  if (!alert || alert.id !== id) return <p>Loading...</p>;

  return (
    <>
      <h2>{alert.displayName}</h2>
      <dl className="details">
        <dt>Description</dt>
        <dd>{alert.description}</dd>
        <dt>Priority</dt>
        <dd>{alert.priority}</dd>
        <dt>Arena</dt>
        <dd>{alert.arena}</dd>
        <dt>Status</dt>
        <dd>{alert.status}</dd>
        <dt>Lon / Lat</dt>
        <dd>
          {alert.lon} / {alert.lat}
        </dd>
      </dl>
      <div className="actions">
        <Link to={`/alerts/${alert.id}/edit`}>Edit</Link>
        <Link to="/">Back</Link>
      </div>
      <AlertsMap alerts={[alert]} height={380} />
    </>
  );
};

export default AlertPage;
