
import { useState } from "react";
import { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button, ModalFooter} from "reactstrap";

const modeloContacto = {
    idcontacto : 0,
    nombre: "",
    correo: "",
    telefono: ""
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto }) => {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setContacto(
            {
                ...contacto, 
                [e.target.name] : e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (contacto.idcontacto == 0) {
            guardarContacto(contacto)
        } else {
            editarContacto(contacto)
        }

        setContacto(contacto)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modeloContacto)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }
    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idcontacto == 0 ? "Nuevo Contacto" : "Editar Contacto"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
            <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>

    )
}

export default ModalContacto;