import mongoose from 'mongoose';
import { MONGO_URL, MONGO_OPTIONS} from process.env

const url = MONGO_URL || "mongodb://localhost/cultural-and-sports-center";
const options = JSON.parse(MONGO_OPTIONS) || {useNewUrlParser: true, useUnifiedTopology: true};

module.exports = mongoose
    .connect(url, options)
    .then(() => {
        console.log("Connect database successfully!");
        return mongoose
    })
    .catch(error=>{
        console.log(error);
    })