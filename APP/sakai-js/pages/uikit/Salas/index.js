import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { ProductService } from "../../../demo/service/ProductService";
//Importo la url de la api
import Global from "../../api/Global";
import { useRouter } from 'next/router';

const options = [
  { label: "Normal", value: 1 },
  { label: "VIP", value: 2 },
];

const Salas = () => {
  const router = useRouter();
  let emptySalas = {
    proy_Id: null,
    proy_Pelicula: null,
    proy_Sala: null,
    proy_Horario: null,
  };

  //products son los datos
  const [Salas, setSalas] = useState([]);
  const [ddlDisabled, setDdlDisabled] = useState(true);
  const [headerDialog, setheaderDialog] = useState("");

  //Ni idea aun
  const [products, setProducts] = useState(null);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  //es mi model
  const [product, setProduct] = useState(emptySalas);

  //ddl de Categoria
  const [selectedOption, setSelectedOption] = useState(null);
  const [sala_Butacas, setsala_Butacas] = useState(null);
  const [sala_Id, setsala_Id] = useState(null);

  //ddl de sucursal
  const [sucursalOptions, setSucursalOptions] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  //Buscar
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(()=>{
    if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
        router.push('/auth/login');
    }
    
}, [])

  //el ProductService esta trallendo los datos de los productos

  useEffect(() => {
    fetch(Global.url + "Sala/List")
      .then((response) => response.json())
      .then((data) => setSalas(data.data))
      .catch((error) => console.error(error));

    //Sucursal DDL
    fetch(Global.url + "Sucursal/List")
      .then((response) => response.json())
      .then((data) =>
        setSucursalOptions(
          data.data.map((s) => ({ value: s.sucu_Id, label: s.sucu_Nombre }))
        )
      )
      .catch((error) => console.error(error));
  }, [Salas]);

  const onSucursalChange = (e) => {
    setSelectedSucursal(e.value);
  };

  const onOptionChange = (e) => {
    setSelectedOption(e.value);
  };

  //abre el modal
  const openNew = () => {
    setSelectedOption("");
    setsala_Id("");
    setsala_Butacas("");
    setSelectedSucursal("");
    setProduct(emptySalas);
    setSubmitted(false);
    setProductDialog(true);
    setheaderDialog(1);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductDialog(false);
  };

  //Guarda los datos
  const saveProduct = (e) => {
    e.preventDefault();
    var test = { ...product };

    setSubmitted(true);

    if (sala_Id > 0 && sala_Butacas > 0 && selectedOption > 0 && selectedSucursal > 0) {
      //Tomo los datos de mi modelo
      var parameter = {
        sala_Id:sala_Id,
        sala_Butacas:parseInt(sala_Butacas) ,
        sala_Tipo: parseInt(selectedOption),
        sala_Sucursal: parseInt(selectedSucursal) ,
        sala_UserMofica: 1,
      };
      console.log(parameter);
      axios
        .put(Global.url + `Sala/Update`, parameter)
        .then((response) => {
          if (response.data.codeStatus == 1) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Editaste un registro",
              life: 1500,
            });
            setProductDialog(false);
          } else {
            toast.current.show({
              severity: "Warning",
              summary: "Felicidades",
              detail: "Editaste un registro",
              life: 1500,
            });
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Vuelva Ingresar los datos Nuevamente",
            life: 1500,
          });
        });
    } else if (
      sala_Butacas > 0 &&
      selectedOption > 0 &&
      selectedSucursal > 0
    ) {
      var parameter = {
        sala_Butacas:parseInt(sala_Butacas) ,
        sala_Tipo: parseInt(selectedOption),
        sala_Sucursal: parseInt(selectedSucursal) ,
        sala_UserCrea: 1,
      };

      axios
        .post(Global.url + `Sala/Insert`, parameter)
        .then((response) => {
          console.log(response.data)
          if (response.data.code == 200) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Ingresaste un nuevo registro",
              life: 1500,
            });
            setProductDialog(false);
 
            console.log("hola");
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Vuelva Ingresar los datos Nuevamente",
            life: 1500,
          });
        });
    } else {
      console.log(test);
    }
  };

  const editProduct = (product) => {
    console.log(product.sala_Id);
    setheaderDialog(2);
    axios
      .get(Global.url + `Sala/Find/${product.sala_Id}`)
      .then((response) => {
        const product = response.data;
        console.log(product)
        setsala_Id(response.data.sala_Id);
        setsala_Butacas(response.data.sala_Butacas);
        setSelectedOption(response.data.sala_Tipo);
        setSelectedSucursal(response.data.sala_Sucursal);
        console.log(response.data.sala_Sucursal);
        setProduct({ ...product });
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "El dato que escogio no esta disponible en estos momentos",
          life: 1500,
        });
      });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setsala_Id(product.sala_Id)
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = product;
    setProducts(_products);

    //setDeleteProductDialog(false);
    setProduct(emptySalas);

    if (sala_Id != "") {
      axios
        .post(Global.url + `Sala/Delete/${sala_Id}`)
        .then((response) => {
          if (response.data.codeStatus == 1) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Registro Eliminado",
              life: 3000,
            });
            setDeleteProductDialog(false);
          }
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Intente De Nuevo",
            life: 1500,
          });
        });
    }
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  //habre el modal para crear un nuevo usuario y eliminar
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            severity="warning"
            className="mr-2"
            onClick={openNew}
          />
        </div>
      </React.Fragment>
    );
  };

  //redimenciona la  imagen
  const rightToolbarTemplate = () => {
    return <React.Fragment>
      <img src='https://th.bing.com/th/id/R.bcc38aab2cb03164fd9674904351c744?rik=enobop4YZHVvEA&pid=ImgRaw&r=0' width={'100px'}></img>
    </React.Fragment>;
  };

  if (headerDialog == "1") {
    var Titulo = "Ingresar una Sala";
  } else if (headerDialog == "2") {
    var Titulo = "Editar una Sala";
  }

  //Botones de editar y eliminar
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          severity="success"
          rounded
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="warning"
          rounded
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductsDialog}
      />
      <Button label="Si" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  );

  const productDialogFooter = (
    <>
      <Button label="Cancelar" severity="danger" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Guardar" severity="warning" icon="pi pi-check" text onClick={saveProduct} />
    </>
  );

  //Encabezado
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  //metodo para buscar
  const filterByNameOrAddress = (value, data) => {
    if (!value) {
      return data;
    }
    return data.filter(
      (item) =>
        item.casa_Categoria.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    );
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Salas</h2>} right={rightToolbarTemplate}></Toolbar>


          <DataTable
            value={filterByNameOrAddress(globalFilter, Salas)}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="proy_Id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            emptyMessage={`No hay Salases que coincidan con "${globalFilter}".`}
            header={header}
            responsiveLayout="scroll"
            globalFilter={globalFilter}
          >
            <Column field="sala_Id" header="ID" sortable />
            <Column field="sala_Id" header="Salas" sortable />
            <Column field="casa_Categoria" header="Categoria" sortable />
            <Column field="casa_Precio" header="Precio de Ticket" sortable />
            <Column
              body={actionBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <h1>{Titulo}</h1>

            <div className="grid p-fluid">
              <div className="col-6">
                <div className="field">
                  <label htmlFor="Butacas">Numero de Butacas</label>
                  <InputText
                    id="Butacas"
                    onChange={(e) => {
                      setsala_Butacas(e.target.value)
                    }}
                    maxLength={2}
                    value={sala_Butacas}
                    required
                    className={classNames({
                      "p-invalid": submitted && !sala_Butacas,
                    })}
                  />

                  {submitted && !sala_Butacas && (
                    <small className="p-invalid">
                      El numero de Butacas es requerido.
                    </small>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="field">
                  <label htmlFor="Butacas">Categoria</label>
                  <Dropdown
                    value={selectedOption}
                    options={options}
                    onChange={onOptionChange}
                    placeholder="Seleccione una opción"
                    className={classNames({
                      "p-invalid": submitted && !selectedOption,
                    })}
                  />

                  {submitted && !selectedOption && (
                    <small className="p-invalid">
                     La categoria es requerido.
                    </small>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="field">
                  <label htmlFor="sucursal">Sucursal</label>
                  <Dropdown
                    value={selectedSucursal}
                    onChange={onSucursalChange}
                    options={sucursalOptions}
                    placeholder="Selecione una Sucursal"
                    
                    className={classNames({
                      "p-invalid": submitted && !selectedSucursal,
                    })}
                  />
                  {submitted && !selectedSucursal && (
                    <small className="p-invalid">
                      La Sucursal es requerido.
                    </small>
                  )}
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>Estas seguro de querer eliminar este regiostro?</span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Salas;
