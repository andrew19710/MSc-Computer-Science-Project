const express = require("express");
const cors = require("cors");
const dataRouters = express.Router();
const castleRouter = require("../routers/castlerouter.js");
const journeyRouter = require("../routers/journeyrouter.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(dataRouters);

app.get("/", (req, res) => {
  res.send("© Abordo - Built with ♥ by Team 11.");
});

dataRouters.get("/api/castles", function (_req, res) {
  castleRouter(res);
});

dataRouters.get("/api/journey", function (req, res) {
  const srcselected = req.query.srcselected;
  const destselected = req.query.destselected;
  const date = req.query.date;
  const time = parseInt(req.query.time, 10);
  journeyRouter(srcselected, destselected, date, time, res);
});

module.exports = app;
