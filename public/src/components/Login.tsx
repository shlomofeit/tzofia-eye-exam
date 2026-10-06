import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useAuthStore((state) => state.token);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const setLogin = useAuthStore((state) => state.setLogin);

  if (token) return <Navigate to="/" replace />;

  return (
    <main className="main">
      <h1>Welcome!</h1>
      <br />
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          setLogin(username, password);
        }}
      >
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLoading ? "logging..." : "Login"}</button>
      </form>
    </main>
  );
};

export default Login;
