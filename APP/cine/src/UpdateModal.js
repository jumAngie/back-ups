import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class EditDepartmentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dept_Id: null,
      dept_Descripcion: null,
    };
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      deleteId: null,
    });
  }
  componentDidMount(id) {
    const url = `https://localhost:44312/api/Departamento/Departamento/Find/16`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dept_Id: data.dept_Id,
          dept_Descripcion: data.dept_Descripcion,
        });
      })
      .catch((error) => console.error(error));
  }

  handleSaveClick = () => {
    const url = `https://localhost:44312/api/Departamento/Departamento/Update/${this.state.dept_Id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dept_Descripcion: this.state.dept_Descripcion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Departamento actualizado:", data);
        // Lógica para cerrar el modal y actualizar la lista de departamentos
      })
      .catch((error) => console.error(error));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
          

        <Modal isOpen={true}>
          <ModalHeader>Editar departamento</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="dept_Descripcion">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="dept_Descripcion"
                name="dept_Descripcion"
                value={this.state.dept_Descripcion || ""}
                onChange={this.handleInputChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary">Cancelar</Button>
            <Button color="primary" onClick={this.handleSaveClick}>
              Guardar cambios
            </Button>
          </ModalFooter>
        </Modal>
     );
  }
}

export default EditDepartmentModal;
