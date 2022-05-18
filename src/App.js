// Importar dependencias
import react, { useContext } from 'react';

//Importar Assets
import './App.css';

import { ProtectedRoutes } from './routers/ProtectedRoutes';
import { PublicRoutes } from './routers/PublicRoutes';

import AuthContext from './context/AuthContext';

function App() {

    const { auth } = useContext(AuthContext);
    //const auth = false;
    //console.log('Auth status: ' +auth);

    return (
        <div>
            {auth ? <ProtectedRoutes /> : <PublicRoutes />}
        </div>
    );
}

export default App;
