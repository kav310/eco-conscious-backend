const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();
app.use(express.urlencoded( { extended: true } ));

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));
