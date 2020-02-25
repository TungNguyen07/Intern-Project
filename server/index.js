require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import userRoute from "./route/user.route";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(logger("dev"));
app.use(
  bodyParser.json({
    type: "application/json",
    extended: true,
    parameterLimit: 100000,
    limit: "10mb"
  })
);
app.use(helmet());

app.use("/user", userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
