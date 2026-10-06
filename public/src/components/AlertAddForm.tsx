import { useState } from "react";
import type {
  AlertFormErrors,
  AlertFormValues,
  AlertInput,
  Arena,
  Priority,
  Status,
} from "../types/alert";

interface AlertFormProps {
  fieldValue: AlertFormValues;
  buttonText: string;
  onSubmit: (alert: AlertInput) => void;
}

function alertValidation(values: AlertFormValues): AlertFormErrors {
  const error: AlertFormErrors = {};
  if (values.displayName.trim().length < 2)
    error.displayName = "Display name must have at least 2 charaterce";
  if (values.description.trim().length < 2)
    error.description = "Description name must have at least 2 charaterce";
  if (
    values.lon.trim() === "" ||
    Number(values.lon) < -180 ||
    Number(values.lon) > 180 ||
    Number.isNaN(values.lon)
  )
    error.lon = "Lon must be greater than -180 and less than 180";
  if (
    values.lat.trim() === "" ||
    Number(values.lat) < -90 ||
    Number(values.lat) > 90 ||
    Number.isNaN(values.lat)
  )
    error.lon = "Lat must be greater than -90 and less than 900";

  return error;
}

const AlertAddForm = ({ fieldValue, buttonText, onSubmit }: AlertFormProps) => {
  const [values, setValues] = useState<AlertFormValues>(fieldValue);
  const [errors, setErrors] = useState<AlertFormErrors>({});

  function handleSubmit() {
    const getErrors = alertValidation(values);
    setErrors(getErrors);
    if (Object.keys(getErrors).length > 0) return;

    onSubmit({
      displayName: values.displayName,
      description: values.description,
      priority: values.priority,
      arena: values.arena,
      status: values.status,
      lon: Number(values.lon),
      lat: Number(values.lat),
    });
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="field">
        <label>Display name</label>
        <input
          type="text"
          value={values.displayName}
          onChange={(e) =>
            setValues({ ...values, displayName: e.target.value })
          }
        />
        {errors.displayName && <p className="error">{errors.displayName}</p>}
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div className="field">
        <label>Priority</label>
        <select
          value={values.priority}
          onChange={(e) =>
            setValues({ ...values, priority: e.target.value as Priority })
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <div className="field">
        <label>Arena</label>
        <select
          value={values.arena}
          onChange={(e) =>
            setValues({ ...values, arena: e.target.value as Arena })
          }
        >
          <option value="North">Nortth</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
        </select>
      </div>

      <div className="field">
        <label>Status</label>
        <select
          value={values.status}
          onChange={(e) =>
            setValues({ ...values, status: e.target.value as Status })
          }
        >
          <option value="Active">Active</option>
          <option value="Handled">Handled</option>
        </select>
      </div>

      <div className="field">
        <label>Lon</label>
        <input
          type="text"
          value={values.lon}
          onChange={(e) => setValues({ ...values, lon: e.target.value })}
        />
        {errors.lon && <p className="error">{errors.lon}</p>}
      </div>

      <div className="field">
        <label>Lat</label>
        <input
          type="text"
          value={values.lat}
          onChange={(e) => setValues({ ...values, lat: e.target.value })}
        />
        {errors.lat && <p className="error">{errors.lat}</p>}
      </div>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AlertAddForm;
