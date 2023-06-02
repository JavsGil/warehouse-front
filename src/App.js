import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../src/pages/LoginForm";
import Empresa from "../src/pages/Empresa";
import Inventario from "../src/pages/Inventario";
import Productos from "../src/pages/Articulos";
import MaimComponent from "../src/components/MaimComponent";
import UserProvider from "../src/utils/context/userProvider";

import "./App.css";

const App = () => {
   

  // eslint-disable-next-line 
  const [validLogin,setValidLogin] = useState(false);

  const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  return (
    <UserProvider>
    <BrowserRouter>
      <div className="app-container">
        <header className="App-header">
          {<MaimComponent setValidLogin={setValidLogin} validLogin={validLogin} />}
        </header>
        <Routes>
          <Route
            path="/"
            element={<LoginForm setValidLogin={setValidLogin} />}
          />
          <Route
            path="/empresa"
            element={
              <ProtectedRoute user={validLogin}>
                <Empresa />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <ProtectedRoute user={validLogin}>
                <Productos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventario"
            element={
              <ProtectedRoute user={validLogin}>
                <Inventario />
              </ProtectedRoute>
            }
          />
           <Route path="*" element={<p className="not-found">There's nothing here: 404!</p>} />
        </Routes>
      </div>
    </BrowserRouter>
    </UserProvider>
  );
};

export default App;
