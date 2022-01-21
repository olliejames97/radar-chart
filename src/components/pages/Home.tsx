import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <h1>
        Head to the{" "}
        <Link className="underline" to="/new">
          NEW
        </Link>{" "}
        page to create a new chart.
      </h1>
    </div>
  );
};
