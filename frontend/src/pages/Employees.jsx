import { useContext, useEffect, useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';
import Context from '../contexts/Context';
import { getAllEmployees, getAllDepartments } from '../helpers/apiConsumption';

export default function Employees() {
  const [employeesList, setEmployeesList] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [searchBarFormValue, setSearchBarFormValue] = useState({
    inputName: '',
    selectedValue: '0',
  });

  const { setDepartmentList } = useContext(Context);

  useEffect(() => {
    const getEmployees = async () => {
      const { data: allEmployess } = await getAllEmployees();
      const { data: allDepartments } = await getAllDepartments();
      setEmployeesList(allEmployess);
      setFilterEmployees(allEmployess);
      setDepartmentList(allDepartments);
    };
    getEmployees();
  }, []);

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

  const handleChangeSearchBarFormState = ({ target: { value, name } }) => {
    setSearchBarFormValue((pvState) => ({ ...pvState, [name]: value }));
  };

  return (
    employeesList.length > 0 && (
      <div className="employee-screen-container">
        <SearchBar
          searchBarForm={searchBarFormValue}
          handleChange={handleChangeSearchBarFormState}
        />
        <EmployeeTable employeesList={filterEmployees} />
        <button type="button">Novo Funcionário</button>
      </div>
    )
  );
}
