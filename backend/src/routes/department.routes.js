const { Router } = require('express');
const controller = require('../controller/department.controller');
const middleware = require('../middleware/department.middleware');

const departmentRoute = Router();

departmentRoute.get('/', controller.getAllDepartment);
departmentRoute.post('/', middleware.checksBodyData, controller.createNewDepartment);
departmentRoute.put('/:id', middleware.checksBodyData, controller.updateDepartment);
departmentRoute.delete('/:id', controller.deleteDepartment);

module.exports = departmentRoute;
