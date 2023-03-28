const service = require('../service/department.service');

async function getAllDepartment(_req, res) {
  const allDepartments = await service.getAllDepartment();
  return res.status(200).json(allDepartments);
}

async function createNewDepartment(req, res) {
  const departmentData = req.body;
  const newDepartment = await service.createNewDepartment(departmentData);
  return res.status(201).json(newDepartment);
}

async function updateDepartment(req, res) {
  const { id } = req.params;
  const departmentData = req.body;
  const updatedDepartment = await service.updateDepartment(Number(id), departmentData);
  return res.status(200).json(updatedDepartment);
}

async function deleteDepartment(req, res) {
  const { id } = req.params;
  const deletedDepartment = await service.deleteDepartment(Number(id));
  return res.status(204).json(deletedDepartment);
}

module.exports = {
  getAllDepartment,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
};
