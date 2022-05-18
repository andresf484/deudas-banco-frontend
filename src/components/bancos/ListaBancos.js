import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

const ListaBancos = () => {

    const [bancos, setBancos] = useState([{}]);

    const { setAuth } = useContext(AuthContext);

    //Redireccionar luego de enviar los datos al backend
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${server}/bancos-usuario`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify()
        }).then(async (resp)=>{

            // Middleware - Inicio

            if(resp.status === 401){
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
            }

            if(resp.status === 404){
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
            }

            if(resp.status === 403){
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
            }
            
            // Middleware - Fin

            if(resp.status === 500){
                window.alert("500");
                navigate("/");
            } 

            if(resp.status === 200){
                // Se retorna el json con la información
                let json = await resp.json();

                //console.log(json);

                setBancos(json);

            }
        }).catch(error=>{
            console.error(error);
        })

    }, [])

    return (

    <Container fluid="md">

        <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre banco</th>
                <th>Detalle deudas</th>
            </tr>
        </thead>
        <tbody>

        {

            bancos.map((e, index) => {

                //console.log(e);

                return (
                    <tr key={index}>
                        <td>{e.usuario_id}</td>
                        <td>{e.banco_slug}</td>
                        <td>

                        <Button variant="primary" href={'/deudas/'+e.banco_slug}> Deudas con este banco</Button>

                        </td>
                    </tr>
                )

            })

            
        }
        </tbody>
        </Table>

    </Container>

    );
};

export default ListaBancos;