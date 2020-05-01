import express from "express";
import {render} from "./render";
import proxy from "express-http-proxy";

const app = express();

app.use(express.static("public"));

app.use(
  "/api",
  proxy("http://0.0.0.0:3000", {
    proxyReqPathResolver: function (req) {
      console.log(req.url);
      return req.url;
    },
  })
);

app.get("/name", function (req, res) {
  res.send({name: "qpf"});
  res.end();
});

app.get("*", function (req, res) {
  render(req, res);
});

const server = app.listen(3000, function () {
  console.log(`server started at http://localhost:3000`);
});
