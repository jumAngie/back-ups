import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: "",
      name: "",
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name } = this.state;

    // Construye los datos a enviar en formato JSON
    const data = JSON.stringify({ dept_Id: id, dept_Descripcion: name });

    // Realiza la petición POST a la URL correspondiente
    fetch("https://localhost:44312/api/Departamento/Insertar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza la lista de registros
        const updatedPosts = [...this.state.posts, data];
        this.setState({
          posts: updatedPosts,
          isModalOpen: false,
          id: "",
          name: "",
        });
      })
      .catch((error) => {
        console.error("Error al insertar el registro:", error);
      });
  };

  render() {
    const { modal, id, name } = this.state;

    return (
      <div>
        <Button color="btn btn-success" onClick={this.toggle}>
          Crear
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Insertar Departamento</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="id">ID</Label>
                <Input
                  type="text"
                  name="id"
                  id="id"
                  value={id}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Nombre</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancelar
            </Button>{" "}
            <Button color="primary" onClick={this.handleSubmit}>
              Insertar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InsertModal;
