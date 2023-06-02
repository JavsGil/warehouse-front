import React, { useContext} from "react";
import {Link} from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import UserContext from "../utils/context/userContext";
import "../css/mainComponent.css"; 

function MaimComponent({setValidLogin,validLogin}) {

  // eslint-disable-next-line 
  const { userDetails,setUserDetails } = useContext(UserContext);

  const navigate = useNavigate();
  const cerrarSesion = () => {
    setValidLogin(false);
    setUserDetails({});
    navigate("/");
  };

  return (
    <div>
    <nav>
      <Link to="/empresa" className="navbar-link">
        Almacen Test
      </Link>
      {"     "}
      {validLogin && (
        <>
          <Link to="/empresa" className="navbar-link">
            Empresas
          </Link>
          {"  "}
          <Link to="/productos" className="navbar-link">
            Productos
          </Link>
          {"  "}
          <Link to="/inventario" className="navbar-link">
            Inventario
          </Link>
          {"  "}
          <button
            onClick={cerrarSesion}
            className="navbar-button"
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </nav>
  </div>
  );
}

export default MaimComponent;
