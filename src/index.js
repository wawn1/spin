import express from "express";
import Home from "./containers/Home";
import React from "react";
import {renderToString} from "react-dom/server";

const app = express();

app.get("/", function (req, res) {
  res.send(renderToString(<Home />));
});

const server = app.listen(3000, function () {
  console.log(`server started at http://localhost:3000`);
});
