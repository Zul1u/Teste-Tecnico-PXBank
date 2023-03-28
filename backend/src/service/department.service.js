const prismaClient = require('../dataBase/prismaClient');

async function getAllDepartment() {
  const allDepartments = await prismaClient.department.findMany();
  return allDepartments;
}

async function createNewDepartment(departmentData) {
  const newDepartment = await prismaClient.department.create({
    data: { ...departmentData },
  });
  return newDepartment;
}

async function updateDepartment(departmentId, departmentData) {
  const updatedDepartment = await prismaClient.department.update({
    where: { id: departmentId }, data: { ...departmentData },
  });
  return updatedDepartment;
}

async function deleteDepartment(departmentId) {
  const deletedDepartment = await prismaClient.department.delete({ where: { id: departmentId } });
  return deletedDepartment;
}

module.exports = {
  getAllDepartment,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
};
