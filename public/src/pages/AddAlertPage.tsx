import { useNavigate } from "react-router-dom";
import { useAlertsStore } from "../store/alertsStore";
import type { AlertFormValues, AlertInput } from "../types/alert";
import AlertAddForm from "../components/AlertAddForm";

const emtyValues: AlertFormValues = {
  displayName: "",
  description: "",
  priority: "Low",
  arena: "North",
  status: "Active",
  lon: "",
  lat: "",
};

const AddAlertPage = () => {
  const nav = useNavigate();
  const error = useAlertsStore((state) => state.error);
  const setNewAlert = useAlertsStore((state) => state.setNewAlert);

  const handleSubmit = async (alert: AlertInput) => {
    await setNewAlert(alert);
    if (!error) nav("/");
  };

  return (
    <>
      <h2>Add alert</h2>
      {error && <p className="error">{error}</p>}
      <AlertAddForm
        buttonText="Add"
        fieldValue={emtyValues}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddAlertPage;
