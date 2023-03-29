import PropTypes from 'prop-types';
import DepartmentSelect from './DepartmentSelect';

export default function SearchBar({ searchBarForm, handleChange }) {
  return (
    <section>
      <form>
        <label htmlFor="searchByName">
          Nome:
          <input
            type="text"
            id="searchByName"
            placeholder="Procura por nome"
            onChange={handleChange}
            name="inputName"
            value={searchBarForm.inputName}
          />
        </label>
        <DepartmentSelect selectedValue={searchBarForm.selectedValue} handleChange={handleChange} />
      </form>
    </section>
  );
}

SearchBar.propTypes = {
  searchBarForm: PropTypes.shape({
    inputName: PropTypes.string,
    selectedValue: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
