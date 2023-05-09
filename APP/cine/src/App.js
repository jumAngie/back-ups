import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import InsertModal from "./InsertModal";
import EditDepartmentModal from "./UpdateModal";

import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isUpdateModalOpen: true,
      isModalOpen: false, // estado del modal
      deleteId: null, // id del registro que se eliminará
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const url = "https://localhost:44312/api/Departamento/List";
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ posts: json }));
  }

  //llamo mi modal eliminar
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      deleteId: null,
    });
  }

  //llamo mi modal Actualizar
  toggleUpdateModal = (id) => {
    // nuevo método para el modal de actualización
    this.setState({
      isUpdateModalOpen: !this.state.isUpdateModalOpen,
      selectedDeptId: id,
    });
  };

  handleViewClick = (dept_Id) => {
    // Lógica para manejar el clic en el botón "Vista"
    console.log(`Vista: ${dept_Id}`);
  };

  handleUpdateClick = (dept_Id) => {
    <EditDepartmentModal />;

    console.log(`Actualizar: ${dept_Id}`);
  };

  handleDelete = () => {
    let id = this.state.deleteId;
    let idString = id.toString();
    console.log(id);
    const url = `https://localhost:44312/api/Departamento/Departamento/Delete/${idString}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza la lista de registros
        const updatedPosts = this.state.posts.filter(
          (post) => post.dept_Id !== this.state.deleteId
        );
        this.setState({
          posts: updatedPosts,
          isModalOpen: false,
          deleteId: null,
        });
      })
      .catch((error) => {
        console.error("Error al eliminar el registro:", error);
      });
  };

  render() {
    const { posts } = this.state;

    const columns = [
      {
        name: "ID",
        selector: "dept_Id",
        sortable: true,
      },
      {
        name: "Departamento",
        selector: "dept_Descripcion",
        sortable: true,
      },
      {
        name: "Estado",
        selector: "dept_Estado",
        sortable: true,
        cell: (row) => (
          <Badge color={row.dept_Estado === "Activo" ? "success" : "danger"}>
            {row.dept_Estado}
          </Badge>
        ),
      },
      {
        name: "Acciones",
        cell: (row) => (
          <div>
            <Button
              color="primary"
              size="sm"
              onClick={() => this.handleViewClick(row.dept_Id)}
            >
              Vista
            </Button>{" "}
            <Button
              color="warning"
              size="sm"
              onClick={() => this.handleUpdateClick(row.dept_Id)}
            >
              Actualizar
            </Button>{" "}
            <Button
              color="danger"
              size="sm"
              onClick={() =>
                this.setState({
                  isModalOpen: true,
                  deleteId: row.dept_Id,
                })
              }
            >
              Eliminar
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div className="container">
        <h1>Mi Primera App RT</h1>

        <div className="text-end">
          <input type="text" placeholder="Buscar" />
        </div>

        <div className="text-begin">
          <InsertModal />
        </div>
        <DataTable
          className="table"
          id="myTable"
          title="Departamento"
          columns={columns}
          data={posts}
          search
          pagination
          striped
        />

        <div></div>

        {/* Modal para confirmar la eliminación */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Confirmar eliminación
          </ModalHeader>
          <ModalBody>¿Estás seguro de querer eliminar este registro?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancelar
            </Button>

            <Button color="danger" onClick={this.handleDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
