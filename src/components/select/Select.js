import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "../../utils/hooks/UseformHooks";


const Select = ({ show, setShow,listEmpresa,listArticulo,createInventario,titleModal,cargarDatos }) => {

    const [formValues, handleInputChange] = useForm({
        articulo_id: "",
        empresa_id: "",

      });
    
  const handleClose = () => setShow(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createInventario(formValues);
      cargarDatos();
      setShow(false);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
      <Modal.Title>{titleModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Empresa: </label>
          <select 
          name="empresa_id" 
          className="form-control"
          onChange={handleInputChange}
          >
          <option value="">Seleccione</option>
            {listEmpresa.map((emp) => {
              return (
              <option key={emp.id} value={emp.nit}>
                {emp.nombre} - {emp.nit}
              </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Articulo: </label>
          <select name="articulo_id" 
          className="form-control"
          onChange={handleInputChange}
          >
          <option value="">Seleccione</option>
            {listArticulo.map((art) => {
              return (
              <option key={art.id} value={art.id}>
                {art.nombre}
              </option>
              );
            })}
          </select>
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
  );
};

export default Select;
