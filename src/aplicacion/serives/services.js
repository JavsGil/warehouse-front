import api from './api';


const loginServices = async (userData) => {
   try {
     console.log(userData, 'data');
     const response = await api.post("/auth/login", userData);
     if(response.status === 201){
         return response
     }
   } catch (error) {
     
   }
 };
 

  const  createCompany = async (data)  => {
    console.log(data,'data')
    api.post("/api/crearEmpresa", data)
       .then(response => {
       
       })
       .catch(error => {
       });
  }


  const listCompany = async () => {
    try {
      const response = await api.get("/companies");
      console.log(response,'response')
      if(response.status === 201){
          return response
      }
    } catch (error) {
      
    }
  };



  const listWarehouse = async () => {
    try {
      const response = await api.get("/warehouse");
      console.log(response,'response')
      if(response.status === 201){
          return response
      }
    } catch (error) {
      
    }
  };

  const listProducts= async () => {
    try {
      const response = await api.get("/products");
      console.log(response,'response')
      if(response.status === 201){
          return response
      }
    } catch (error) {
      
    }
  };
  
  export { loginServices,createCompany,listWarehouse,listProducts,listCompany};