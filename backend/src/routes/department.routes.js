const { Router } = require('express');
const controller = require('../controller/department.controller');

const departmentRoute = Router();

departmentRoute.get('/', controller.getAllDepartment);
departmentRoute.post('/', controller.createNewDepartment);
departmentRoute.put('/:id', controller.updateDepartment);
departmentRoute.delete('/:id', controller.deleteDepartment);

module.exports = departmentRoute;
