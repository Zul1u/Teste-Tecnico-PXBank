import PropTypes from 'prop-types';
import DepartmentSelect from './DepartmentSelect';

export default function SearchBar({ searchBarForm, handleChange }) {
  return (
    <section className="search-bar-container">
      <form className="search-form">
        <div className="search-form-content">
          <div className="search-input-container">
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
          </div>
          <div className="search-input-container">
            <DepartmentSelect
              selectedValue={searchBarForm.selectedValue}
              handleChange={handleChange}
            />
          </div>
        </div>
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
