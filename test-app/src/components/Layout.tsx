import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav
        style={{
          padding: "1rem",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link to="/">Test App</Link>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <main style={{ width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
}
