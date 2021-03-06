require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";

import userRouter from "./route/user.route";
import indexRouter from "./route/index.route";
import postRouter from "./route/post.route";
import activityRouter from "./route/activity.route";
import commentRouter from "./route/comment.route";
import db from "./db/connectDB";

const app = express();
const port = process.env.PORT || 4000;

db;
app.use(cors());
app.use(logger("dev"));
app.use(
  bodyParser.json({
    type: "application/json",
    extended: true,
    parameterLimit: 100000,
    limit: "10mb",
  })
);
app.use(helmet());

app.use(express.static("public"));
app.use("/images", express.static(__dirname + "/images"));

app.use("/profile", userRouter);
app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/activity", activityRouter);
app.use("/comment", commentRouter);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
