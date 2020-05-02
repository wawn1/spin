import React from "react";
import Home from "./containers/Home";
import Login from "./containers/Login";
import {renderRoutes} from "react-router-config";
import App from "./App";
import NotFound from "./containers/NotFound";

export const routes = [
  {
    path: "/",
    exact: false,
    component: App,
    key: "root",
    routes: [
      {
        path: "/home",
        exact: false,
        component: Home,
        loadData: Home.loadData,
        key: "home",
        routes: [
          {
            path: "/home/login", // 不支持相对路径
            exact: true,
            component: Login,
            key: "home/login",
          },
        ],
      },
      {
        path: "/login",
        exact: true,
        component: Login,
        key: "login",
      },
      {
        component: NotFound,
        key: "NotFound",
      },
    ],
  },
];

export default <div>{renderRoutes(routes)}</div>;
