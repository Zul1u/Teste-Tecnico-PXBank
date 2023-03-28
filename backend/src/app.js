const express = require('express');
const employeeRoute = require('./routes');

const app = express();
app.use(express.json());

app.use('/employee', employeeRoute);

module.exports = app;
