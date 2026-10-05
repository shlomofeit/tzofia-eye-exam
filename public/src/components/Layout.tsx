import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="app-header">
        <h1>ein-tzofia</h1>
        <nav>
          <Link to="/">Alerts</Link>
          <Link to="/alerts/new">Add alert</Link>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
