import React, { useState,useEffect } from "react";
import DataTable from '../components/table/DataTable';
import { columns } from "../aplicacion/mapper/columnMapEmpresas";
import  ModalForm  from '../components/modal/ModalForm';
import { useForm } from "../utils/hooks/UseformHooks";
import {createCompany,listCompany} from '../../src/aplicacion/serives/services';

import "../css/table.css";


const Empresas = () => {


// eslint-disable-next-line
  const [inputFields, setInputFields] = useState(['nit','nombre','direccion','telefono'])
  const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [listEmpresa, setListEmpresa] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState({});
  
  const [formValues,setFormValues, handleInputChange] = useForm({
    nit: "",
    nombre: "",
    direccion: "",
    telefono: "",
  },setErrors);


   const cargarDatos = async () => {
     try {
       const res = await listCompany();
       if(res.status === 200){
         setListEmpresa(res.data);
      
       }
     } catch (error) {
       console.warn(error)
     }
   }

    useEffect(()=>{
     const cargar = async () => await cargarDatos();
     cargar();
    },[])

  return  (
    <div className="content">
      <DataTable 
      title='Listado de Empresas'
      titleModal='Crear Empresa'
      columns={columns} 
      rows={listEmpresa}
      setShow={setShow}
      />
      {show &&(<ModalForm
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        setShow={setShow}
        cargarDatos={cargarDatos}
        handleInputChange={handleInputChange}
        formValues={formValues}
        setFormValues={setFormValues}
        create={createCompany}
        inputFields={inputFields}
        titleModal='Crear Empresa'
        errors={errors}
        setErrors={setErrors}
       />)}
      
    </div>

  );
};

export default Empresas;
