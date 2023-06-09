const departmentService = require('../service/department.service');
const CustomError = require('./errors/customError');

async function checksDepartmentId(req, _res, next) {
  const { department_id: departmentId } = req.body;
  if (typeof departmentId !== 'number') throw CustomError.departmentIdTypeError;
  const department = await departmentService.getOneDepartment(departmentId);
  if (department === null) throw CustomError.notFoundDepartment;
  next();
}

async function checksBodyData(req, _res, next) {
  const {
    name, salary, birth, cpf,
  } = req.body;
  const REGEX_DATE = /(\d{2})[-./](\d{2})[-./](\d{4})/;
  if (typeof salary !== 'number') throw CustomError.salaryTypeError;
  if (typeof name !== 'string' || name.length <= 3) throw CustomError.nameTypeError;
  if (typeof birth !== 'string' || !REGEX_DATE.test(birth)) throw CustomError.birthTypeError;
  if (typeof cpf !== 'string' || cpf.length !== 14) throw CustomError.invalidCpf;

  next();
}

module.exports = {
  checksDepartmentId,
  checksBodyData,
};
