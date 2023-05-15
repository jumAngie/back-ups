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
import { useRouter } from 'next/router';
//Importo la url de la api
import Global from "../../api/Global";

const Sucursal = () => {
  const router = useRouter();
  let emptySucursal = {
    sucu_Id: null,
    sucu_Nombre: "",
    sucu_Direccion: "",
  };

  //products son los datos
  const [Sucursal, setSucursal] = useState([]);
  const [ddlDisabled, setDdlDisabled] = useState(true);
  const [headerDialog, setheaderDialog] = useState("");

  //Ni idea aun
  const [products, setProducts] = useState(null);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  //es mi model
  const [product, setProduct] = useState(emptySucursal);

  //ddl de Departamento
  const [DepartamentoOptions, setDepartamentoOptions] = useState([]);
  const [selectedDepartamento, setselectedDepartamento] = useState(null);

  //ddl de Municipio
  const [MunicipioOptions, setMunicipioOptions] = useState([]);
  const [selectedMunicipio, setselectedMunicipio] = useState(null);

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
    fetch(Global.url + "Sucursal/List")
      .then((response) => response.json())
      .then((data) => setSucursal(data.data))
      .catch((error) => console.error(error));

      //Departamento DDL
      fetch(Global.url + "Departamento/List")
        .then((response) => response.json())
        .then((data) =>
          setDepartamentoOptions(
            data.map((d) => ({ value: d.dept_Id, label: d.dept_Descripcion }))
          )
        )
        .catch((error) => console.error(error));
  }, [Sucursal]);

  const onDepartamentoChange = (e) => {
    setselectedDepartamento(e.value);
    console.log(e.value);

    if (e.value != 0 && e.value != null) {
      // Verifica el nuevo valor seleccionado
      axios
        .get(`${Global.url}Municipio/FindState/${e.value}`) // Usa el nuevo valor seleccionado
        .then((response) => {
          setMunicipioOptions(
            response.data.map((c) => ({
              value: c.muni_Id,
              label: c.muni_Descripcion,
            }))
          );
          setDdlDisabled(false);
        })
        .catch((error) => {
          console.error(error);
          console.log("Error en el servidor");
        });
    } else {
      setMunicipioOptions([]); // si no hay valor seleccionado, vacía las opciones del dropdown
      setDdlDisabled(true); // deshabilita dropdown
    }
  };

  const onMunicipioChange = (e) => {
    setselectedMunicipio(e.value);
  };


  //abre el modal
  const openNew = () => {
    setselectedDepartamento(0);
    setselectedMunicipio(0);
    setProduct(emptySucursal);
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
    setDeleteProductsDialog(false);
  };

  //Guarda los datos
  const saveProduct = (e) => {
    e.preventDefault();
    var test = { ...product };

    setSubmitted(true);

    if (test.sucu_Id != "" && test.sucu_Id != 0 && test.sucu_Id != null) {
      var fecha = new Date(test.dire_FechaNacimiento);
      var dire_FechaNacimiento = (test.dire_FechaNacimiento = fecha);
      //Tomo los datos de mi modelo
      var parameter = {
        sucu_Id: test.sucu_Id,
        sucu_Nombre: test.sucu_Nombre,
        sucu_Direccion: test.sucu_Direccion,
        sucu_Ciudad: selectedMunicipio,
        sucu_UserCrea: 1,
      };
      console.log(parameter)
      axios
        .put(Global.url + `Sucursal/Update`, parameter)
        .then((response) => {
          if (response.data.codeStatus == 1) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Editaste un registro",
              life: 1500,
            });
            setProductDialog(false);
             console.log(response.data);
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
    } else if (test.sucu_Nombre.trim() !== "" ) {

      console.log("Dentro al insertar");

      var parameter = {
        sucu_Nombre: test.sucu_Nombre,
        sucu_Direccion: test.sucu_Direccion,
        sucu_Ciudad: parseInt(selectedMunicipio),
        sucu_UserCrea: 1,
      };

      axios
        .post(Global.url + `Sucursal/Insert`, parameter)
        .then((response) => {
          if (response.data.code == 200) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Ingresaste un nuevo registro",
              life: 1500,
            });
            setProductDialog(false);
            product.sucu_Id = "";

            console.log("hola");
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
    } else {
      console.log(test);
    }
  };

  const editProduct = (product) => {
    console.log(product.sucu_Id)
    setheaderDialog(2);
    axios
      .get(Global.url + `Sucursal/Find/${product.sucu_Id}`)
      .then((response) => {
        const product = response.data;
        setselectedDepartamento(response.data.dept_Id)
        console.log(response.data)
        console.log(response.data.sucu_Ciudad)

        ddlMunicipio(response.data.dept_Id, response.data.sucu_Ciudad);

        setProduct({ ...product });
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
    setProductDialog(true);
  };

  function ddlMunicipio(departamento_Id,Muncipio_Id){
    var codigo;
    console.log(departamento_Id)
   axios
       .get(`${Global.url}Municipio/FindState/${departamento_Id}`) // Usa el nuevo valor seleccionado
       .then((response) => {
           codigo = response.empl_Muni;
         setMunicipioOptions(
           response.data.map((c) => ({
             value: c.muni_Id,
             label: c.muni_Descripcion,
           }))
         );
         setDdlDisabled(false);
         console.log("dentro en el departamento")
         
       })
       .catch((error) => {
         console.error(error);
         console.log("Error en el servidor");
       });
       
       setselectedMunicipio(Muncipio_Id);
 }

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = product;
    console.log(_products);
    setProducts(_products);

    //setDeleteProductDialog(false);
    setProduct(emptySucursal);

    if (_products.sucu_Id != "") {
      axios
        .post(Global.url + `Sucursal/Delete/${_products.sucu_Id}`)
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

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product["sucu_Id"] = e.value;
    setProduct(_product);
  };

  //Seteo los valores
  const onNombreChange = (e, sucu_Nombre) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${sucu_Nombre}`] = val;
    setProduct(_product);
  };

  const onDireccionChange = (e, sucu_Direccion) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${sucu_Direccion}`] = val;

    setProduct(_product);
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
    return (
      <React.Fragment>
       <img src='https://cdn1.iconfinder.com/data/icons/e-commerce-or-online-shoping/64/01-_store-shop-_building-_commerce-finance-1024.png' width={'100px'}></img>

      </React.Fragment>
    );
  };

  if (headerDialog == "1") {
    var Titulo = "Ingresar una Sucursal";
  } else if (headerDialog == "2") {
    var Titulo = "Editar una Sucursal";
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

  const productDialogFooter = (
    <>
      <Button label="Cancelar" severity="danger" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Guardar" severity="warning" icon="pi pi-check" text onClick={saveProduct} />
    </>
  );
  const deleteProductDialogFooter = (
    <>
       <Button
        label="No"
        icon="pi pi-times"
        severity="danger"
        text
        onClick={hideDeleteProductsDialog}
      />
      <Button label="Si" severity="warning" icon="pi pi-check" text onClick={deleteProduct} />
     </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
        onClick={deleteSelectedProducts}
      />
    </>
  );

  //Encabezado
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Directores</h5>
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
        item.sucu_Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        item.sucu_Direccion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Sucursales</h2>} right={rightToolbarTemplate}></Toolbar>


          <DataTable
            value={filterByNameOrAddress(globalFilter, Sucursal)}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="sucu_Id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            emptyMessage={`No hay sucursales que coincidan con "${globalFilter}".`}
            header={header}
            responsiveLayout="scroll"
            globalFilter={globalFilter}
          >
            <Column field="sucu_Id" header="ID" sortable />
            <Column field="sucu_Nombre" header="Sucursal" sortable />
            <Column field="sucu_Direccion" header="Direccion" sortable />
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
                  <label htmlFor="name">Nombre</label>
                  <InputText
                    id="name"
                    value={product.sucu_Nombre}
                    onChange={(e) => onNombreChange(e, "sucu_Nombre")}
                    required
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !product.sucu_Nombre,
                    })}
                  />
                  {submitted && !product.sucu_Nombre && (
                    <small className="p-invalid">El nombre es requerido.</small>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="field">
                  <label htmlFor="Departamento">Departamento</label>
                  <Dropdown
                    value={selectedDepartamento}
                    onChange={onDepartamentoChange}
                    options={DepartamentoOptions || []} // inicialmente null, pero en renderizado, si es null usará el array vacío
                    placeholder="Seleccionar"
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !selectedDepartamento,
                    })}
                  />
                  {submitted && !selectedDepartamento && (
                    <small className="p-invalid">
                      El Departamento es requerido.
                    </small>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="field">
                  <label htmlFor="Municipio">Municipio</label>
                  <Dropdown
                    value={selectedMunicipio}
                    onChange={onMunicipioChange || []}
                    options={MunicipioOptions}
                    placeholder="Seleccionar"
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !selectedMunicipio,
                    })}
                    disabled={ddlDisabled} // agregar propiedad disabled
                  />
                  {submitted && !selectedMunicipio && (
                    <small className="p-invalid">
                      EL Municipio es requerido.
                    </small>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="field">
                  <label htmlFor="description">Descripción</label>
                  <InputTextarea
                    id="description"
                    value={product.sucu_Direccion}
                    onChange={(e) => onDireccionChange(e, "sucu_Direccion")}
                    required
                    rows={3}
                    cols={20}
                  />
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirmar"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
               ¿ Estas seguro de querer eliminar a <b>{product.sucu_Nombre}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sucursal;