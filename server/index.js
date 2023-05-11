const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}).then( () => {
    console.log("Connected to mongo")
}).catch((e) => {
    console.log(e)
});

//middlewares:
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.listen(8000, () => {
    console.log("backend is running");
})