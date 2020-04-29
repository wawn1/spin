import express from "express";
import Home from "../containers/Home";
import React from "react";
import {renderToString} from "react-dom/server";

const app = express();
const content = renderToString(<Home />);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send(`
  <html>
  <body>
  <div id='root'>${content}</div>
  <script src='/index.js'></script>
  </body>
  </html>
  `);
});

const server = app.listen(3000, function () {
  console.log(`server started at http://localhost:3000`);
});
