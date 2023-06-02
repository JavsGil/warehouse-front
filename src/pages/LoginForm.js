import React, { useState,useContext } from "react";
import {loginServices} from '../../src/aplicacion/serives/services';
import "../css/Login.css";
import {useNavigate } from 'react-router-dom';
import UserContext from '../utils/context/userContext';

const LoginForm = ({setValidLogin}) => {

  const { setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password
    };
     const response  = await loginServices(userData);

    const user = {
      user:response.data.data,
      token:response.data.token,
      valid:true
    }
     setValidLogin(true);
     setUserDetails(user);
     navigate("/empresa");
   
  };

  const isFormValid = email !== "" && password !== "";

  return (
    <div className="App">
      <header className="header">
        <div className="card card-group opacidad">
          <div className="card-header card-img text-center">Iniciar Sesion</div>
          <div className="container-fluid">
            <form>
              <div className="form-group">
                <label htmlFor="email">
                  <h5>Usuario</h5>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Ingrese email"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <h5>Password</h5>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Ingrese contraseña"
                  autoComplete="off"
                />
              </div>

              <div className="button-loggin">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}  disabled={!isFormValid}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>

  );
};


export default LoginForm;
