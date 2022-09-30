import React from 'react';

	
const initialState = {
    users: [],
    addUsers: (newUsers) => {}
  }
   
  export default React.createContext(initialState)
  