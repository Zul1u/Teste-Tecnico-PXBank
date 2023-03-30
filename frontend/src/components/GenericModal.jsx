import PropTypes from 'prop-types';

export default function GenericModal({
  children,
  isOpen,
  isClosed,
  saveEmployee,
  exclude,
  disabled,
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
            <button
              type="button"
              className="save-employee"
              onClick={saveEmployee}
              disabled={!exclude ? disabled : false}
            >
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
  disabled: PropTypes.bool,
};

GenericModal.defaultProps = {
  exclude: false,
  disabled: false,
};
