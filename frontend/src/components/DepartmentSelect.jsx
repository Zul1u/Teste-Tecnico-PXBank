import { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../contexts/Context';

export default function DepartmentSelect({ selectedValue, handleChange }) {
  const { departmentList } = useContext(Context);

  return (
    <label htmlFor="departmentSelect">
      Departamento:
      <select
        id="departmentSelect"
        name="selectedValue"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="0">Todos os Departamentos</option>
        {departmentList.map((department) => (
          <option key={department.id} value={department.id}>
            {department.department_name}
          </option>
        ))}
      </select>
    </label>
  );
}

DepartmentSelect.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
