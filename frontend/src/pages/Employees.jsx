import { useContext, useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import GenericModal from '../components/GenericModal';
import SearchBar from '../components/SearchBar';
import Context from '../contexts/Context';
import { getAllEmployees, getAllDepartments, postNewEmployee } from '../helpers/apiConsumption';
import { brasilianDate, dateClassPattern } from '../helpers/dateConverter';
import { formatCPF, validateCPF } from '../helpers/validateCPF';

export default function Employees() {
  const [employeesList, setEmployeesList] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [searchBarFormValue, setSearchBarFormValue] = useState({
    inputName: '',
    selectedValue: '0',
  });
  const [employeeFormValue, setEmployeeFormValue] = useState({
    employeeName: '',
    employeeCPF: '',
    selectedValue: '1',
    formattedSalary: 'R$ 0,00',
    employeeSalary: 0,
    employeeBirth: '',
  });
  const [openNewEmployee, setOpenNewEmployee] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const { setDepartmentList } = useContext(Context);

  useEffect(() => {
    const getEmployees = async () => {
      const { data: allEmployess } = await getAllEmployees();
      const { data: allDepartments } = await getAllDepartments();
      setEmployeesList(allEmployess);
      setDepartmentList(allDepartments);
    };
    getEmployees();
  }, []);

  useEffect(() => {
    setFilterEmployees(employeesList);
  }, [employeesList]);

  useEffect(() => {
    const { inputName, selectedValue } = searchBarFormValue;
    if (selectedValue === '0') {
      const filteredEmployeesList = employeesList.filter(({ name }) => (
        name.toLowerCase().includes(inputName.toLowerCase())
      ));
      return setFilterEmployees(filteredEmployeesList);
    }

    const filteredEmployeesList = employeesList.filter(({ name, department: { id } }) => (
      name.toLowerCase().includes(inputName.toLowerCase()) && id === +selectedValue
    ));
    return setFilterEmployees(filteredEmployeesList);
  }, [searchBarFormValue]);

  const validateEmployeeForm = () => {
    const {
      employeeName, employeeCPF, employeeSalary, employeeBirth,
    } = employeeFormValue;
    const REGEX_DATE = /(\d{4})[-./](\d{2})[-./](\d{2})/;
    const year = dateClassPattern(employeeBirth);
    const nowYear = new Date().getFullYear();

    const checksIfAllInputsAreFilled = [
      employeeName.length > 3,
      validateCPF(employeeCPF),
      employeeSalary > 0,
      REGEX_DATE.test(employeeBirth),
      year > 1900,
      year <= nowYear,
    ];
    const validateTheArray = checksIfAllInputsAreFilled.every((item) => item);
    return setDisabledBtn(!validateTheArray);
  };

  useEffect(() => {
    validateEmployeeForm();
  }, [employeeFormValue]);

  const handleChangeSearchBarFormState = ({ target: { value, name } }) => {
    setSearchBarFormValue((pvState) => ({ ...pvState, [name]: value }));
  };

  const handleChangeEmployeeFormState = ({ target: { value, name } }) => {
    if (name === 'employeeCPF') {
      return setEmployeeFormValue((pvState) => ({ ...pvState, [name]: formatCPF(value) }));
    }
    if (name === 'employeeSalary') {
      const numbersInput = value.replace(/\D/g, '');
      const decimalSalary = Number(numbersInput) / 100;
      const formatSalary = decimalSalary
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      return setEmployeeFormValue((pvState) => ({
        ...pvState, [name]: decimalSalary, formattedSalary: formatSalary,
      }));
    }
    return setEmployeeFormValue((pvState) => ({ ...pvState, [name]: value }));
  };

  const closeModal = () => {
    setEmployeeFormValue({
      employeeName: '',
      employeeCPF: '',
      selectedValue: '1',
      formattedSalary: 'R$ 0,00',
      employeeSalary: 0,
      employeeBirth: '',
    });
    setOpenNewEmployee(false);
  };

  const submitNewEmployee = async () => {
    const {
      employeeBirth,
      employeeName,
      employeeCPF,
      employeeSalary,
      selectedValue,
    } = employeeFormValue;

    const employeeData = {
      name: employeeName,
      department_id: Number(selectedValue),
      salary: employeeSalary,
      birth: brasilianDate(employeeBirth),
      cpf: employeeCPF,
    };
    await postNewEmployee(employeeData);
    const { data: allEmployess } = await getAllEmployees();
    setEmployeesList(allEmployess);
    closeModal();
  };

  return (
    employeesList.length > 0 && (
      <div className="employee-screen-container">
        <SearchBar
          searchBarForm={searchBarFormValue}
          handleChange={handleChangeSearchBarFormState}
        />
        <EmployeeTable employeesList={filterEmployees} />
        <div className="add-new-employee">
          <button type="button" onClick={() => setOpenNewEmployee(true)}>Novo Funcionário</button>
        </div>
        <GenericModal
          isOpen={openNewEmployee}
          isClosed={closeModal}
          disabled={disabledBtn}
          saveEmployee={submitNewEmployee}
        >
          <h1 className="modal-title">Novo Funcionário</h1>
          <EmployeeForm
            employeeFormState={employeeFormValue}
            handleChange={handleChangeEmployeeFormState}
          />
        </GenericModal>
      </div>
    )
  );
}
