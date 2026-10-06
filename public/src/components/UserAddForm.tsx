import { useState } from "react";
import type {
  AssignedArena,
  Role,
  UserFormErrors,
  UserInput,
} from "../types/user";

interface UserProps {
  onSubmit: (user: UserInput) => void;
}

const emptyValues: UserInput = {
  username: "",
  password: "",
  email: "",
  role: "arena_user",
  assignedArena: "North",
};

function userValidation(values: UserInput): UserFormErrors {
  const error: UserFormErrors = {};
  if (values.username.trim().length < 2)
    error.username = "Username must have at least 2 characters";
  if (values.password.trim().length < 6)
    error.username = "password must have at least 6 characters";
  if (!values.email.includes("@") || values.email.trim().length < 6)
    error.email = "Invalid email address";
  return error;
}
const UserAddForm = ({ onSubmit }: UserProps) => {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<UserFormErrors>({});

  function handleSubmit() {
    const getErrors = userValidation(values);
    setErrors(getErrors);
    if (Object.keys(getErrors).length > 0) return;

    onSubmit({
      username: values.username,
      password: values.password,
      email: values.email,
      role: values.role,
      assignedArena:
        values.role === "arena_user" ? values.assignedArena : "All",
    });
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          setValues(emptyValues);
        }}
        className="form"
      >
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="text"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Role</label>
          <select
            value={values.role}
            onChange={(e) =>
              setValues({ ...values, role: e.target.value as Role })
            }
          >
            <option value="arena_user">arena_user</option>
            <option value="general_user">general_user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        {values.role === "arena_user" && (
          <div className="field">
            <label>Assigned arena</label>
            <select
              value={values.assignedArena}
              onChange={(e) =>
                setValues({
                  ...values,
                  assignedArena: e.target.value as AssignedArena,
                })
              }
            >
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Center">Center</option>
            </select>
          </div>
        )}

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default UserAddForm;
