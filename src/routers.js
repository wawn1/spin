import React from "react";
import {Route} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    loadData: Home.loadData,
    key: "home",
  },
  {
    path: "/login",
    exact: true,
    component: Login,
    key: "login",
  },
];

export default (
  <div>
    {routes.map((route) => (
      <Route {...route} />
    ))}
  </div>
);
