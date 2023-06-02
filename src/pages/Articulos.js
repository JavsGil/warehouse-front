import React, { useState,useEffect } from "react";
import DataTable from '../components/table/DataTable';
import { columns } from "../aplicacion/mapper/columnMapEmpresas";
import  ModalForm  from '../components/modal/ModalForm';
import { useForm } from "../utils/hooks/UseformHooks";
import {listProducts} from '../../src/aplicacion/serives/services';

import "../css/table.css";

const Articulos = () => {
  const [inputFields, setInputFields] = useState(['nombre','talla'])
  const [show, setShow] = useState(false);
  const [listArticles, setListArticles] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState({});
  const [formValues,setFormValues, handleInputChange] = useForm({
    nombre: "",
    talla: "",
  },setErrors);

   const cargarDatos =async()=>{
     try {
       const res = await listProducts();
       if(res.status == 200){
         setListArticles(res.data);
      
       }
     } catch (error) {
       console.warn(error)
     }
   }

    useEffect(()=>{
     const cargar =async () => await cargarDatos();
     cargar();
    },[])
  return (
    <div className="content">
       <DataTable 
       title='Listado de Articulos'
       titleModal='Crear Articulo'
       columns={columns}
       rows={listArticles}
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
        // create={createArticles}
        inputFields={inputFields}
        titleModal='Crear Articulo'
        errors={errors}
        setErrors={setErrors}
       />)}
    </div>
  );
};

export default Articulos;
