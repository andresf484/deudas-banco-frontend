import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

function Logout() {

    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir refresco de página del evento submit

        await fetch(`${server}/logout`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        }).then(async (resp)=>{ 
            
            if(resp.status === 403){
                //console.log('No token provided');
                localStorage.removeItem("token");
                setAuth(false);
                navigate("/");
            }

            if(resp.status === 401){
                //console.log('Error al hacer logout / token invalido');
                localStorage.removeItem("token");
                setAuth(false);
                navigate("/");
            }

            if(resp.status === 200){
                // Se retorna el json con la información
                let json = await resp.json();
                
                //console.log('Ha salido correctamente del sistema');
                //console.log(json);
                localStorage.removeItem("token");
                setAuth(false);
                navigate("/");
            }

        }).catch(error=>{
            console.error(error);
        })

    }

    return (
        <Container fluid="md">
            <Form onSubmit={handleSubmit}>

                Confirmación de cierre de sesión

                <Button variant="primary" type="submit">
                    Cerrar Sesión
                </Button>
            </Form>
        </Container>
    )
}

export default Logout