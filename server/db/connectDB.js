import mongoose from "mongoose";
const { MONGO_URL, MONGO_OPTIONS } = process.env;

const url = MONGO_URL || "mongodb://localhost/cultural-and-sports-center";
const options = MONGO_OPTIONS
  ? JSON.parse(MONGO_OPTIONS)
  : {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

module.exports = mongoose
  .connect(url, options)
  .then(() => {
    console.log("Connect database successfully!");
    return mongoose;
  })
  .catch((error) => {
    console.log(error);
  });
