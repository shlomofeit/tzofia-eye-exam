import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const nav = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  if (!user) return null;

  return (
    <header className="app-header">
      <h1>ein-tzofia</h1>
      <nav>
        <Link to="/">Alerts</Link>
        {user.role !== "general_user" && (
          <Link to="/alerts/new">Add alert</Link>
        )}
        {user.role === "admin" && <Link to="/admin/users">Users</Link>}
      </nav>
      <div className="user-info">
        <span>
          {user.username} ({user.role})
        </span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
