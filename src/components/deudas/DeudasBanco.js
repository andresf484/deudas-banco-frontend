import React, { useContext, useEffect, useState }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';

import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

const DeudasBanco = () => {

        const [deudas, setDeudas] = useState([{}]);

        const { setAuth } = useContext(AuthContext);

        let params = useParams();
        //console.log(params.slug);

        const navigate = useNavigate();

        useEffect(()=>{

            let data = { 
                    banco_slug: params.slug 
            };
            //console.log(data);

            fetch(`${server}/deudas-por-banco`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            }).then(async (resp)=>{ 

                //console.log(resp);

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

                    setDeudas(json);
                }
            }).catch(error=>{
                console.error(error);
            })

        }, []);

    return(

        <div>

            <h2>Deudas con el banco: {params.slug}</h2>    

            <br />

            <Container fluid="md">

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th># Deuda</th>
                        <th>Total</th>
                        <th>Deuda pendiente</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>

                {

                    deudas.map((e, index) => {
                    //console.log(e);

                    return (
                        <tr key={index}>
                            <td>{e._id}</td>
                            <td>{e.deuda_total}</td>
                            <td>{e.deuda_pendiente}</td>
                            <td>
                                <Button variant="primary" href={'/deudas/detalle/'+e._id}> Detalle de esta deuda</Button>
                            </td>
                        </tr>
                    )

                    })

                }

                </tbody>
                </Table>

            </Container>

        </div>

    );

};

export default DeudasBanco;