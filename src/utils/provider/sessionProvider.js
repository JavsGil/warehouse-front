import { useEffect, useContext } from 'react';
import UserContext from '../context/userContext';

const SessionProvider = () => {
  
   // eslint-disable-next-line
  const { setUserDetails,userDetails } = useContext(UserContext);


  useEffect(() => {
    async function verifySession() {
      try {
        const response = await fetch('api/auth/login');
        if (response.ok) {
          const { token, user } = await response.json();
          setUserDetails({ token, user });
        } else {
          console.log('Error al verificar la sesión');
        }
      } catch (error) {
        console.log('Error al verificar la sesión:', error);
      }
    }

    verifySession();
  }, [setUserDetails]);

  return null;
};

export default SessionProvider;
