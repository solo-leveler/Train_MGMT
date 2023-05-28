//jslint esversion :6 
require("dotenv").config();
const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));

const dbConfig = require("./config/dbConfig")
const ticketRoutes = require("./routes/routes")

app.use("/api/tickets", ticketRoutes)
const port = process.env.PORT || 8080
app.listen(port ,function(){
    console.log("Node Server at port " + port);
})