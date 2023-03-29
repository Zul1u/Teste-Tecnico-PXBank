const CustomError = require('./errors/customError');

async function checksBodyData(req, _res, next) {
  const { department_name: departmentName } = req.body;
  if (typeof departmentName !== 'string' || departmentName.length < 2) throw CustomError.departmentNameTypeError;
  next();
}

module.exports = {
  checksBodyData,
};
