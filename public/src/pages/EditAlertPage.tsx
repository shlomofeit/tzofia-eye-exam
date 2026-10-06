import { useNavigate, useParams } from "react-router-dom";
import AlertAddForm from "../components/AlertAddForm";
import { useAlertsStore } from "../store/alertsStore";
import type { AlertFormValues, AlertInput } from "../types/alert";
import { useEffect } from "react";

const EditAlertPage = () => {
  const nav = useNavigate();
  const alert = useAlertsStore((state) => state.selectedAlert);
  const error = useAlertsStore((state) => state.error);
  const setSelectedAlert = useAlertsStore((state) => state.setSelectedAlert);
  const setUpdateAlert = useAlertsStore((state) => state.setUpdateAlert);
  const { id } = useParams();

  useEffect(() => {
    if (id) setSelectedAlert(id);
  }, [id, setSelectedAlert]);

  if (!id || !alert) {
    if (error) return <p className="error">{error}</p>;
    return <p>Loading...</p>;
  }

  const originalValues: AlertFormValues = {
    displayName: alert.displayName,
    description: alert.description,
    priority: alert.priority,
    arena: alert.arena,
    status: alert.status,
    lon: String(alert.lon),
    lat: String(alert.lat),
  };

  const handleSubmit = async (alert: AlertInput) => {
    await setUpdateAlert(id, alert);
    if (!error) nav("/");
  };

  return (
    <>
      <h2>Add alert</h2>
      {error && <p className="error">{error}</p>}
      <AlertAddForm
        buttonText="Save"
        fieldValue={originalValues}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditAlertPage;
