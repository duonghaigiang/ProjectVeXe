const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models/index");
const cors = require("cors");
const { rootRouter } = require("./router/index");
const app = express();
const port = 7000;
// cài đặt ứng dụng kiểu
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:7000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//cài đặt static file
app.use("/api/v1/", rootRouter);
const publicDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicDirectory));
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("connected database");
  } catch (error) {
    console.log("unable", error);
  }
  console.log("app listen", port);
});
