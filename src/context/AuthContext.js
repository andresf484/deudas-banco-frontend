import { createContext, useEffect, useState } from "react";

import { server } from './Api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);

    useEffect(()=>{
        //console.log('AuthContext.js : fetch');

        // Verificar que el token siga siendo valido, al navegar por el frontend
        fetch(`${server}/verify`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        }).then(async (resp)=>{
            if(resp.status === 200){
                setAuth(true);
            }else{
                localStorage.removeItem("token");
                setAuth(false);
            }
        }).catch(error=>{
            console.error(error);
        })
    }, []);

    const data = {
        auth, setAuth
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;