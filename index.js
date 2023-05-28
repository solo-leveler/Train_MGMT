//jslint esversion :6 
require("dotenv").config();
const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect(process.env.MONGO_URL, {
    dbName: "TRAIN_MGMT",
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const ticketRoutes = require("./routes/routes")

app.use("/api/tickets", ticketRoutes)
const port = process.env.PORT || 8080
app.listen(port ,function(){
    console.log("Node Server at port " + port);
})