const express = require('express');
const cors = require("cors");
require("dotenv").config();
// const swaggerOptions = require('./swagger.json');
const swaggerUi = require("swagger-ui-express");
const app = express();
const port = process.env.PORT || 5000;

const faunadb = require('faunadb'),
  q = faunadb.query;

const myAPIKey = process.env.MYAPIKEY;

var serverClient = new faunadb.Client({ secret: 'MYAPIKEY' });


app.use(cors());
app.use(express.json());
const accountDetails = require("./routes/account/account");
const userData = require("./routes/account/users");


app.use("/account", accountDetails)
app.use("/user", userData)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

