const { Router } = require('express');
const controller = require('../controller/employees.controller');
const middleware = require('../middleware/employee.middleware');

const employeeRoute = Router();

employeeRoute.get('/', controller.getAllEmployees);
employeeRoute.get('/:id', controller.getOneEmployees);
employeeRoute.post('/', middleware.checksDepartmentId, middleware.checksBodyData, controller.addNewEmployee);
employeeRoute.put('/:id', middleware.checksDepartmentId, middleware.checksBodyData, controller.updateEmployee);
employeeRoute.delete('/:id', controller.deleteEmployee);

module.exports = employeeRoute;
