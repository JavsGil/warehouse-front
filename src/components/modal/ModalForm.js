import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/ModalForm.css";
import { validationRulesByTitle } from "./errors";
import { validateForm } from "../../utils/validationUtils";
const ModalForm = ({
  show,
  setShow,
  cargarDatos,
  handleInputChange,
  formValues,
  setFormValues,
  create,
  inputFields,
  titleModal,
  setErrors,
  errors,
}) => {

  
  const handleClose = () => {
    setFormValues(formValues);
    setErrors({})
    setShow(false)
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = validateForm(
        formValues,
        validationRulesByTitle[titleModal]
      );

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const res = await create(formValues);
      cargarDatos();
      setShow(false);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            {inputFields.map((input, index) => {
              return (
                <div className="form-group">
                  <label htmlFor={input}>
                    <h5>{input.charAt(0).toUpperCase() + input.slice(1)}</h5>
                  </label>
                  <input
                    key={index}
                    type="text"
                    id={input}
                    name={input}
                    className="form-control"
                    value={formValues[input]}
                    onChange={handleInputChange}
                    placeholder={`Ingrese ${input}`}
                    autoComplete="off"
                  />
                  {errors[input] && (
                    <div className="error">{errors[input]}</div>
                  )}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForm;
