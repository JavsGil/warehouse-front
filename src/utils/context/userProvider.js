import React, { useState } from 'react';
import UserContext from './userContext';
import SessionProvider from '../provider/sessionProvider';

const UserProvider = ({ children }) => {

  const [ userDetails, setUserDetails ] = useState({});
  
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <SessionProvider />
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider
