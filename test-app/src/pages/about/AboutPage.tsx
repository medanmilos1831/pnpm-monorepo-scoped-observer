import { AboutTitle, AboutDescription, AboutTeam } from "./components";

export function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>

      <div style={{ marginTop: "2rem" }}>
        <AboutTitle />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <AboutDescription />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <AboutTeam />
      </div>
    </div>
  );
}
