class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static notFoundEmployee = new CustomError(404, 'Sorry! Employee not found.');

  static notFoundDepartment = new CustomError(404, 'Sorry! Department not found.');

  static departmentIdTypeError = new CustomError(400, 'department_id must be of type number');

  static salaryTypeError = new CustomError(400, 'salary must be of type number');

  static nameTypeError = new CustomError(400, 'the name must be of type string and be at least 4 characters long');

  static birthTypeError = new CustomError(400, 'birth must be of type string and have 10 characters');

  static departmentNameTypeError = new CustomError(400, 'department_name must be of type string and be at least 2 characters long');

  static invalidCpf = new CustomError(400, 'Invalid CPF');
}

module.exports = CustomError;
