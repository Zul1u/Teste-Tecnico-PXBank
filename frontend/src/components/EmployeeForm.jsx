import PropTypes from 'prop-types';
import DepartmentSelect from './DepartmentSelect';

export default function EmployeeForm({ employeeFormState, handleChange }) {
  const FILTER = false;

  return (
    <section className="employee-form-container">
      <form className="employee-form">
        <div className="employee-form-content">
          <div className="employee-form-input employee-name-input">
            <label htmlFor="employeeName">
              Nome
              <input
                type="text"
                id="employeeName"
                placeholder="Digite o nome completo do funcionário"
                name="employeeName"
                value={employeeFormState.employeeName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="employee-form-input">
            <label htmlFor="employeeCPF">
              CPF
              <input
                type="text"
                id="employeeCPF"
                placeholder="___.___.___-__"
                name="employeeCPF"
                value={employeeFormState.employeeCPF}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="employee-form-input">
            <DepartmentSelect
              selectedValue={employeeFormState.selectedValue}
              handleChange={handleChange}
              filter={FILTER}
            />
          </div>
          <div className="employee-form-input">
            <label htmlFor="employeeSalary">
              Salário
              <input
                type="text"
                id="employeeSalary"
                placeholder="R$"
                name="employeeSalary"
                value={employeeFormState.formattedSalary}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="employee-form-input">
            <label htmlFor="employeeBirth">
              Data de Nascimento
              <input
                type="date"
                id="employeeBirth"
                name="employeeBirth"
                value={employeeFormState.employeeBirth}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

EmployeeForm.propTypes = {
  employeeFormState: PropTypes.shape({
    employeeName: PropTypes.string,
    employeeCPF: PropTypes.string,
    selectedValue: PropTypes.string,
    formattedSalary: PropTypes.string,
    employeeBirth: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
