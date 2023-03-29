const express = require('express');
require('express-async-errors');
const cors = require('cors');
const employeeRoute = require('./routes/employee.routes');
const departmentRoute = require('./routes/department.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/employee', employeeRoute);
app.use('/department', departmentRoute);

app.use(errorMiddleware);

module.exports = app;
