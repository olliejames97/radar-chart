import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import "./index.css";
import { routes } from "./routes";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <div className="font-mono bg-green-200">
      <Nav />
      <div className="px-10">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.route}
              path={route.route}
              element={route.component}
            />
          ))}
        </Routes>
      </div>
    </div>
  </BrowserRouter>,
  rootElement
);
