import PropTypes from 'prop-types';

export default function GenericModal({
  children, isOpen, isClosed, saveEmployee, exclude,
}) {
  return (
    isOpen && (
      <div className="bg-modal">
        <div className="modal-container">
          {children}
          <div className="buttons-modal-container">
            <button type="button" onClick={isClosed} className="close-modal">
              Cancelar
            </button>
            <button type="button" className="save-employee" onClick={saveEmployee}>
              {exclude ? 'Excluir' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    )
  );
}

GenericModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isClosed: PropTypes.func.isRequired,
  saveEmployee: PropTypes.func.isRequired,
  exclude: PropTypes.bool,
};

GenericModal.defaultProps = {
  exclude: false,
};
