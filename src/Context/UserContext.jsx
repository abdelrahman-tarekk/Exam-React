import { useState, createContext, useEffect } from "react";

export let UserContext =createContext(0)

export default function UserContextProvider(props) {

    const [userLogin, setuserLogin] = useState(null)
    function logout(){
      localStorage.removeItem('usertoken');
      setuserLogin(null);
    }

    useEffect(() => {
      if(localStorage.getItem('usertoken') !== null){
        setuserLogin(localStorage.getItem('usertoken'));
      }
    }, [])



  return (
    <UserContext.Provider value={{userLogin, setuserLogin , logout}}>
      {props.children}
    </UserContext.Provider>
  );
}