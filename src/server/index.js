import express from "express";
import {render} from "./render";

const app = express();

app.use(express.static("public"));

app.get("*", function (req, res) {
  res.send(render(req));
});

const server = app.listen(3000, function () {
  console.log(`server started at http://localhost:3000`);
});
