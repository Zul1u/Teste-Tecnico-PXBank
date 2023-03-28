const { Router } = require('express');
const controller = require('../controller/employees.controller');

const employeeRoute = Router();

employeeRoute.get('/', controller.getAllEmployees);

employeeRoute.get('/:id', controller.getOneEmployees);

employeeRoute.post('/', controller.addNewEmployee);

employeeRoute.put('/:id', controller.updateEmployee);

employeeRoute.delete('/:id', controller.deleteEmployee);

module.exports = employeeRoute;
