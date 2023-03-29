const departmentService = require('../service/department.service');
const CustomError = require('./errors/customError');

async function checksDepartmentId(req, _res, next) {
  const { department_id: departmentId } = req.body;
  if (typeof departmentId !== 'number') throw CustomError.department_idTypeError;
  const department = await departmentService.getOneDepartment(departmentId);
  if (department === null) throw CustomError.notFoundDepartment;
  next();
}

async function checksBodyData(req, _res, next) {
  const { name, salary, birth } = req.body;
  if (typeof salary !== 'number') throw CustomError.salaryTypeError;
  if (typeof name !== 'string' || name.length <= 3) throw CustomError.nameTypeError;
  if (typeof birth !== 'string' || birth.length !== 10) throw CustomError.birthTypeError;

  next();
}

module.exports = {
  checksDepartmentId,
  checksBodyData,
};
