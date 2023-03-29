const prismaClient = require('../dataBase/prismaClient');
const CustomError = require('../middleware/errors/customError');

async function getAllEmployees() {
  const allEmployees = await prismaClient.employees.findMany({
    select: {
      id: true,
      name: true,
      salary: true,
      birth: true,
      department: true,
    },
  });
  return allEmployees;
}

async function getOneEmployees(emplyeeId) {
  const employee = await prismaClient.employees.findFirst({
    where: { id: emplyeeId },
    select: {
      id: true,
      name: true,
      salary: true,
      birth: true,
      department: true,
    },
  });
  if (employee === null) throw CustomError.notFoundEmployee;
  return employee;
}

async function addNewEmployee(emplyeeData) {
  const newEmployee = await prismaClient.employees.create({
    data: { ...emplyeeData },
  });
  return newEmployee;
}

async function updateEmployee(emplyeeId, emplyeeData) {
  try {
    const updatedEmployee = await prismaClient.employees.update({
      where: { id: emplyeeId },
      data: { ...emplyeeData },
    });
    return updatedEmployee;
  } catch (error) {
    console.log(error);
    throw CustomError.notFoundEmployee;
  }
}

async function deleteEmployee(emplyeeId) {
  try {
    const deletedEmployee = await prismaClient.employees.delete({
      where: { id: emplyeeId },
    });
    return deletedEmployee;
  } catch (error) {
    console.log(error);
    throw CustomError.notFoundEmployee;
  }
}

module.exports = {
  getAllEmployees,
  getOneEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
