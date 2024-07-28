import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Row, Container, Col, Card, CardHeader,CardBody, Button } from "reactstrap";
import './App.css';
import TablaContacto from './componentes/TablaContacto';
import ModalContacto from './componentes/ModalContacto';

function App() {

    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null)

    const mostrarContactos = async () => {

        const response = await fetch("api/contacto/lista");

        if (response.ok) {
            const data = await response.json();
            setContactos(data)
        } else {
            console.log("error en la lista")
        }
    }
    useEffect(() => {
        mostrarContactos()
    }, [])

    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();

        }
    }

    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();

        }
    }

    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("Desea eliminar el contacto?")

        if (!respuesta) {
            return;
        }
        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: "DELETE",
        })

        if (response.ok) {
            mostrarContactos();            
        }
    }

    return (
        <Container fluid="lg">
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success"
                                onClick={() => setMostrarModal(!mostrarModal)}
                            >Nuevo Contacto</Button>                          
                            <hr></hr>
                            <TablaContacto data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarContacto={eliminarContacto }
                            >
                            </TablaContacto>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}

                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            ></ModalContacto>
        </Container>
    )
}

export default App;