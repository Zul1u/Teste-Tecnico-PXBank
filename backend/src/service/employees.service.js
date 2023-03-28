const prismaClient = require('../dataBase/prismaClient');

async function getAllEmployees() {
  const allEmployees = await prismaClient.employees.findMany();
  return allEmployees;
}

async function getOneEmployees(emplyeeId) {
  const employee = await prismaClient.employees.findFirst({ where: { id: emplyeeId } });
  return employee;
}

async function addNewEmployee(emplyeeData) {
  const newEmployee = await prismaClient.employees.create({ data: { ...emplyeeData } });
  return newEmployee;
}

async function updateEmployee(emplyeeId, emplyeeData) {
  const updatedEmployee = await prismaClient.employees.update({
    where: { id: emplyeeId }, data: { ...emplyeeData },
  });
  return updatedEmployee;
}

async function deleteEmployee(emplyeeId) {
  const deletedEmployee = await prismaClient.employees.delete({ where: { id: emplyeeId } });
  return deletedEmployee;
}

module.exports = {
  getAllEmployees,
  getOneEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
