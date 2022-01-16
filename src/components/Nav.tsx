import { Link } from "react-router-dom";
import { routes } from "../routes";

export const Nav = () => {
  return (
    <nav className="flex-row space-x-4 p-4 bg-green-300 border-black border-b-2 mb-8">
      {routes.map((r) => (
        <Link className="underline" to={r.route} key={r.route}>
          {r.label.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
};
