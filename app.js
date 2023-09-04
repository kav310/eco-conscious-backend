const express = require('express');
const dotenv = require('dotenv')
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config()
app.use(express.urlencoded( { extended: true } ));
app.use(cors());
app.use(express.json());


const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));
