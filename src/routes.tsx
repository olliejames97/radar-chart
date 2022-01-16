import React from "react";
import { NewPage } from "./components/pages/New";

export const routes: {
  label: string;
  route: string;
  component: React.ReactNode;
}[] = [
  {
    label: "Home",
    route: "/",
    component: <div>Home</div>,
  },
  {
    label: "New",
    route: "/new",
    component: <NewPage />,
  },
];
