import React from "react";
import { ChartPage } from "./components/pages/Chart";
import { NewPage } from "./components/pages/New";

export const routes: {
  label: string;
  route: string;
  component: React.ReactNode;
  notInNav?: boolean;
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
  {
    label: "Charts",
    route: "/charts/:id",
    component: <ChartPage />,
    notInNav: true,
  },
];
