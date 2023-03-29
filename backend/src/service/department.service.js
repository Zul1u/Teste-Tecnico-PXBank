const prismaClient = require('../dataBase/prismaClient');
const CustomError = require('../middleware/errors/customError');

async function getAllDepartment() {
  const allDepartments = await prismaClient.department.findMany();
  return allDepartments;
}

async function getOneDepartment(departmentId) {
  const allDepartments = await prismaClient.department.findFirst({ where: { id: departmentId } });
  return allDepartments;
}

async function createNewDepartment(departmentData) {
  const newDepartment = await prismaClient.department.create({
    data: { ...departmentData },
  });
  return newDepartment;
}

async function updateDepartment(departmentId, departmentData) {
  try {
    const updatedDepartment = await prismaClient.department.update({
      where: { id: departmentId }, data: { ...departmentData },
    });
    return updatedDepartment;
  } catch (error) {
    console.log(error);
    throw CustomError.notFoundDepartment;
  }
}

async function deleteDepartment(departmentId) {
  try {
    const deletedDepartment = await prismaClient.department.delete({ where: { id: departmentId } });
    return deletedDepartment;
  } catch (error) {
    console.log(error);
    throw CustomError.notFoundDepartment;
  }
}

module.exports = {
  getAllDepartment,
  getOneDepartment,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
};
