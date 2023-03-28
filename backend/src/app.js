const express = require('express');
const employeeRoute = require('./routes/employee.routes');
const departmentRoute = require('./routes/department.routes');

const app = express();
app.use(express.json());

app.use('/employee', employeeRoute);
app.use('/department', departmentRoute);

module.exports = app;
