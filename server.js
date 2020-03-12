const A = require("axios");
const Cors = require("cors");
const Express = require("express");

//это твой сервак - он шлет запросы на метавезер, но сначала ты с локалхоста шлешь запросы на него, а потом он уже шлет запрос на метавезер и возврашщает данные

const API_ROOT_URL = "https://www.metaweather.com/api/location/";

const app = Express();

app.set("port", process.env.PORT || 8089);

//8089 - это порт на котором он запущен, то есть локалхост 8089

app.use(Cors());

app.get("/cities/weather/:city", (req, res, next) => {
  //это твой запрос погоды для города
  //:city - это динамическая часть урла, то есть что ты туда передаешь то и будет
  A.get(API_ROOT_URL + "search/", { params: { query: req.params.city } })
    .then(response => {
      res.status(200).send({ data: response.data });
    })
    .catch(error => {
      console.warn(error);
      res.status(200).send({ error: error.message });
    })
    .then(next);
});

app.get("/city/:weather", (req, res, next) => {
  A.get(API_ROOT_URL + req.params.weather)
    .then(response => {
      res.status(200).send({ data: response.data });
    })
    .catch(error => {
      console.warn(error);
      res.status(200).send({ error: error.message });
    })
    .then(next);
});

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}, pid ${process.pid}`);
});
