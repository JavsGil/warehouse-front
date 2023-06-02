import { createContext } from 'react';

const UserContext = createContext({
  userDetails: null,
  setUserDetails: userDetails => {}
})

export default UserContext
