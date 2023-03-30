import { useContext, useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import GenericModal from '../components/GenericModal';
import SearchBar from '../components/SearchBar';
import Context from '../contexts/Context';
import {
  getAllEmployees,
  getAllDepartments,
  postNewEmployee,
  getOneEmployees,
  putEditEmployee,
  deleteEmployee,
} from '../helpers/apiConsumption';
import { americanDate, brasilianDate, dateClassPattern } from '../helpers/dateConverter';
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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [employeeId, setEmployeeId] = useState(0);

  const { setDepartmentList } = useContext(Context);

  const EXCLUDE = true;

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
    const sortedListEmployees = employeesList.sort((a, b) => (
      a.name.localeCompare(b.name, 'fr', { ignorePunctuation: true })
    ));

    setFilterEmployees(sortedListEmployees);
  }, [employeesList]);

  const sortBySearchName = (employees, searchedName) => {
    const filteredEmployees = employees.filter(({ name }) => (
      name.toLowerCase().startsWith(searchedName)
    ));

    const nonFilteredEmployees = employees.filter(({ name }) => (
      !name.toLowerCase().startsWith(searchedName)
    ));
    return filteredEmployees.concat(nonFilteredEmployees);
  };

  useEffect(() => {
    const { inputName, selectedValue } = searchBarFormValue;
    const lowercaseInputName = inputName.toLowerCase();

    if (selectedValue === '0') {
      const filteredEmployeesList = employeesList.filter(({ name }) => (
        name.toLowerCase().includes(lowercaseInputName)
      ));

      const sortedList = sortBySearchName(filteredEmployeesList, lowercaseInputName);

      return setFilterEmployees(sortedList);
    }

    const filteredEmployeesList = employeesList.filter(({ name, department: { id } }) => (
      name.toLowerCase().includes(lowercaseInputName) && id === +selectedValue
    ));

    const sortedList = sortBySearchName(filteredEmployeesList, lowercaseInputName);

    return setFilterEmployees(sortedList);
  }, [searchBarFormValue, employeesList]);

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

  const formatSalary = (salary) => salary.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const handleChangeEmployeeFormState = ({ target: { value, name } }) => {
    if (name === 'employeeCPF') {
      return setEmployeeFormValue((pvState) => ({ ...pvState, [name]: formatCPF(value) }));
    }
    if (name === 'employeeSalary') {
      const numbersInput = value.replace(/\D/g, '');
      const decimalSalary = Number(numbersInput) / 100;
      return setEmployeeFormValue((pvState) => ({
        ...pvState, [name]: decimalSalary, formattedSalary: formatSalary(decimalSalary),
      }));
    }
    return setEmployeeFormValue((pvState) => ({ ...pvState, [name]: value }));
  };

  const handleOpenEditModal = async ({ target: { name: id } }) => {
    setEmployeeId(id);
    const { data } = await getOneEmployees(id);
    const {
      name,
      department,
      salary,
      birth,
      cpf,
    } = data;
    setOpenEditModal(true);
    setEmployeeFormValue({
      employeeName: name,
      employeeCPF: cpf,
      selectedValue: String(department.id),
      formattedSalary: formatSalary(Number(salary)),
      employeeSalary: Number(salary),
      employeeBirth: americanDate(birth),
    });
  };

  const handleDeleteEmployeeModal = async ({ target: { name: id } }) => {
    setEmployeeId(id);
    const { data } = await getOneEmployees(id);
    const { name, cpf } = data;
    setDeleteEmployeeModal(true);
    setEmployeeFormValue((pvState) => ({
      ...pvState,
      employeeName: name,
      employeeCPF: cpf,
    }));
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
    setOpenEditModal(false);
    setDeleteEmployeeModal(false);
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

  const submitEditEmployee = async () => {
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
    await putEditEmployee(employeeData, employeeId);
    const { data: allEmployess } = await getAllEmployees();
    setEmployeesList(allEmployess);
    closeModal();
  };

  const submitDeletEmployee = async () => {
    await deleteEmployee(employeeId);
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
        <EmployeeTable
          employeesList={filterEmployees}
          handleOpenEditModal={handleOpenEditModal}
          handleDeleteEmployeeModal={handleDeleteEmployeeModal}
        />
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

        <GenericModal
          isOpen={openEditModal}
          isClosed={closeModal}
          disabled={disabledBtn}
          saveEmployee={submitEditEmployee}
        >
          <h1 className="modal-title">Editar Funcionário</h1>
          <EmployeeForm
            employeeFormState={employeeFormValue}
            handleChange={handleChangeEmployeeFormState}
          />
        </GenericModal>

        <GenericModal
          isOpen={deleteEmployeeModal}
          isClosed={closeModal}
          saveEmployee={submitDeletEmployee}
          exclude={EXCLUDE}
        >
          <section>
            <h1 className="modal-title">Deseja excluir o funcionário abaixo?</h1>
            <div className="employee-infos">
              <p>{employeeFormValue.employeeName}</p>
              <p>
                <span>CPF: </span>
                {employeeFormValue.employeeCPF}
              </p>
            </div>
          </section>
        </GenericModal>
      </div>
    )
  );
}
