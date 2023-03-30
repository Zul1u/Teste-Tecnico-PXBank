import PropTypes from 'prop-types';

export default function EmployeeTable({ employeesList }) {
  return (
    <table className="table-container">
      <thead className="table-header">
        <tr>
          <th>Nome</th>
          <th>Departamento</th>
          <th>Salário</th>
          <th>Data de Nascimento</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {employeesList.map((emplyee) => (
          <tr key={emplyee.id}>
            <td>{emplyee.name}</td>
            <td>{emplyee.department.department_name}</td>
            <td>
              {Number(emplyee.salary).toLocaleString('pt-Br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td>{emplyee.birth}</td>
            <td className="customize-employee">
              <button type="button" className="edit-employee">Editar</button>
              <button type="button" className="exclude-employee">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

EmployeeTable.propTypes = {
  employeesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
