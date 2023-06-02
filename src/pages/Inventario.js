import React, { useEffect,useState } from "react";

import DataTable from '../components/table/DataTable';
import { columns } from "../aplicacion/mapper/columnMapInventario";
import { useForm } from "../utils/hooks/UseformHooks";
import Select from "../components/select/Select";
import {listCompany,listProducts,listWarehouse} from '../../src/aplicacion/serives/services';

import "../css/table.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

const Inventario = () => {
  const [inputFields, setInputFields] = useState(["nombre", "articulo"]);
  const [listEmpresa, setListEmpresa] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [show, setShow] = useState(false);
  const [listInventario, setListInventario] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formValues, handleInputChange]= useForm({
    nit: "",
    nombre: "",
    direccion: "",
    telefono: "",
  });

   const cargarEmpresas = async () => {
     try {
       const empList = await listCompany();
       if (empList.status === 200) {
         setListEmpresa(empList.data);
       }
     } catch (error) {
       console.warn(error);
     }
   };

   const cargarArticulos = async () => {
     try {
       const artList = await listProducts();
       if (artList.status === 200) {
         setListArticulo(artList.data);
       }
     } catch (error) {
       console.warn(error);
     }
   };

   const cargarDatos = async () => {
     try {
       const res = await listWarehouse();
       if (res.status === 200) {
         setListInventario(res.data);
       }
     } catch (error) {
       console.warn(error);
     }
   };

  // const handleDownload = (row) => {
  //   const doc = new jsPDF();

  //   <table id="my-table"></table>;
  //   autoTable(doc, { html: "#my-table" });
  //   autoTable(doc, {
  //     head: [["Ampresa", "Articulo"]],
  //     body: [[`${row.empresa}`, `${row.articulo}`]],
  //   });

  //   doc.save("Inventario.pdf");
  // };

   useEffect(() => {
     const cargar = async () => await cargarDatos();
     const empresa = async () => await cargarEmpresas();
     const articulos = async () => await cargarArticulos();
     empresa();
     articulos();
     cargar();
   }, []);

  return (
    <div className="content">
      <DataTable
        title="Listado del Inventario"
        titleModal="Crear Inventario"
        columns={columns}
        rows={listInventario}
        setShow={setShow}
        // handleDownload={handleDownload}
      />
      {show && (
        <Select
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          setShow={setShow}
          listEmpresa={listEmpresa}
          listArticulo={listArticulo}
          cargarDatos={cargarDatos}
          // createInventario={createInventario}
          // handleDownload={handleDownload}
          titleModal="Crear Inventario"
        />
      )}
    </div>
  );
};

export default Inventario;
