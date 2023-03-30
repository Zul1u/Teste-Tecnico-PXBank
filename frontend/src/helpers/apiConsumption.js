import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081',
});

const getAllEmployees = async () => {
  try {
    const response = await instance.get('/employee');
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getAllDepartments = async () => {
  try {
    const response = await instance.get('/department');
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const postNewEmployee = async (employeeData) => {
  try {
    const response = await instance.post('/employee', employeeData);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export {
  getAllEmployees,
  getAllDepartments,
  postNewEmployee,
};
