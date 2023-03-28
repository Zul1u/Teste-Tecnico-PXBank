const service = require('../service/employees.service');

async function getAllEmployees(_req, res) {
  const allEmployees = await service.getAllEmployees();
  return res.status(200).json(allEmployees);
}

async function getOneEmployees(req, res) {
  const { id } = req.params;
  const employee = await service.getOneEmployees(Number(id));
  return res.status(200).json(employee);
}

async function addNewEmployee(req, res) {
  const emplyeeData = req.body;
  const newEmployee = await service.addNewEmployee(emplyeeData);
  return res.status(201).json(newEmployee);
}

async function updateEmployee(req, res) {
  const { id } = req.params;
  const emplyeeData = req.body;
  const updatedEmployee = await service.updateEmployee(Number(id), emplyeeData);
  return res.status(200).json(updatedEmployee);
}

async function deleteEmployee(req, res) {
  const { id } = req.params;
  const deletedEmployee = await service.deleteEmployee(Number(id));
  return res.status(204).json(deletedEmployee);
}

module.exports = {
  getAllEmployees,
  getOneEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
