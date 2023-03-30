import PropTypes from 'prop-types';
import DepartmentSelect from './DepartmentSelect';

export default function EmployeeForm({ employeeFormState, handleChange }) {
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
                placeholder="Digite o seu nome completo"
                name="employeeName"
                value={employeeFormState.employeeName}
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
              />
            </label>
          </div>
          <div className="employee-form-input">
            <DepartmentSelect
              selectedValue={employeeFormState.selectedValue}
              handleChange={handleChange}
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
                value={employeeFormState.employeeSalary}
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
    employeeSalary: PropTypes.string,
    employeeBirth: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
