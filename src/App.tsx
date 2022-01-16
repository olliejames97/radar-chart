import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/chart">Chart</Link>
        <Link to="/new">New</Link>
      </nav>
    </div>
  );
}
