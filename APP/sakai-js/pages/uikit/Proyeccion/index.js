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
import { useRouter } from 'next/router';
//Importo la url de la api
import Global from "../../api/Global";

const Proyecciones = () => {
  const router = useRouter();
  let emptyProyecciones = {
    proy_Id: null,
    proy_Pelicula: null,
    proy_Sala: null,
    proy_Horario: null,
  };

  //products son los datos
  const [Proyecciones, setProyecciones] = useState([]);
  const [ddlDisabled, setDdlDisabled] = useState(true);
  const [headerDialog, setheaderDialog] = useState("");

  useEffect(()=>{
    if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
        router.push('/auth/login');
    }
    
}, [])
  //Ni idea aun
  const [products, setProducts] = useState(null);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  //es mi model
  const [product, setProduct] = useState(emptyProyecciones);

  //ddl de Peliculas
  const [PeliculasOptions, setPeliculasOptions] = useState([]);
  const [selectedPeliculas, setselectedPeliculas] = useState(null);

  //ddl de Sala
  const [SalaOptions, setSalaOptions] = useState([]);
  const [selectedSala, setselectedSala] = useState(null);

  //ddl de Horaio
  const [HoraioOptions, setHoraioOptions] = useState([]);
  const [selectedHoraio, setselectedHoraio] = useState(null);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  //Buscar
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  //el ProductService esta trallendo los datos de los productos

  useEffect(() => {
    fetch(Global.url + "Proyeccion/List")
      .then((response) => response.json())
      .then((data) => setProyecciones(data.data))
      .catch((error) => console.error(error));

    //Peliculas DDL
    fetch(Global.url + "Peliculas/List")
      .then((response) => response.json())
      .then((data) =>
        setPeliculasOptions(
          data.data.map((p) => ({ value: p.peli_Id, label: p.peli_Titulo }))
        )
      )
      .catch((error) => console.error(error));

    //Sala DDL
    fetch(Global.url + "Sala/List")
      .then((response) => response.json())
      .then((data) =>
        setSalaOptions(
          data.data.map((d) => ({
            value: d.sala_Id,
            label: `Sala N° ${d.sala_Id}  ${d.casa_Categoria}`,
          }))
        )
      )
      .catch((error) => console.error(error));

    //Horairo DDL
    fetch(Global.url + "Proyeccion/Horaio")
      .then((response) => response.json())
      .then((data) =>
        setHoraioOptions(
          data.data.map((d) => ({
            value: d.hor_Id,
            label: `Hora Inicio ${d.horaInicio} ~  Hora Fin ${d.horaFin}`,
          }))
        )
      )
      .catch((error) => console.error(error));
  }, [Proyecciones]);

  const onPeliculasChange = (e) => {
    setselectedPeliculas(e.value);
    console.log(e.value);
  };

  const onSalaChange = (e) => {
    setselectedSala(e.value);
    console.log(e.value);
  };

  const onHorarioChange = (e) => {
    setselectedHoraio(e.value);
    console.log(e.value);
  };

  //abre el modal
  const openNew = () => {
    setselectedPeliculas("");
            setselectedSala("");
            setselectedHoraio("");
    setProduct(emptyProyecciones);
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

    if (selectedPeliculas > 0 && selectedSala > 0 && selectedHoraio > 0) {
      //Tomo los datos de mi modelo
      var parameter = {
        proy_Id: test.proy_Id,
        proy_Pelicula: parseInt(selectedPeliculas),
        proy_Sala: parseInt(selectedSala),
        proy_Horario: parseInt(selectedHoraio),
      };
      console.log(parameter);
      axios
        .put(Global.url + `Proyeccion/Update`, parameter)
        .then((response) => {
          if (response.data.codeStatus == 1) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Editaste un registro",
              life: 1500,
            });
            setProductDialog(false);
            setselectedPeliculas("");
            setselectedSala("");
            setselectedHoraio("");
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
      selectedPeliculas > 0 &&
      selectedSala > 0 &&
      selectedHoraio > 0
    ) {
      console.log("Dentro al insertar");

      var parameter = {
        proy_Pelicula: parseInt(selectedPeliculas),
        proy_Sala: parseInt(selectedSala),
        proy_Horario: parseInt(selectedHoraio),
      };

      axios
        .post(Global.url + `Proyeccion/Insert`, parameter)
        .then((response) => {
          if (response.data.code == 200) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Ingresaste un nuevo registro",
              life: 1500,
            });
            setProductDialog(false);
            product.proy_Id = "";

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
    console.log(product.proy_Id);
    setheaderDialog(2);
    axios
      .get(Global.url + `Proyeccion/Find/${product.proy_Id}`)
      .then((response) => {
        const product = response.data;
        setselectedPeliculas(response.data.proy_Pelicula);
        setselectedSala(response.data.proy_Sala);
        setselectedHoraio(response.data.proy_Horario);
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
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = product;
    setProducts(_products);

    //setDeleteProductDialog(false);
    setProduct(emptyProyecciones);

    if (_products.proy_Id != "") {
      axios
        .post(Global.url + `Proyeccion/Delete/${_products.proy_Id}`)
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
                   <img src='https://th.bing.com/th/id/R.852516d3cb3bba41307210ee0b5ad5af?rik=mHOh4GrC0DOuLg&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f6%2fTicket-PNG-Free-Download.png&ehk=1dCr1FEPLnhx1tU8a1AFqJ%2bl2fJfdFBzPvAt2XMm5fg%3d&risl=&pid=ImgRaw&r=0' width={'100px'}></img>
    </React.Fragment>;
  };

  if (headerDialog == "1") {
    var Titulo = "Ingresar una Proyeccion";
  } else if (headerDialog == "2") {
    var Titulo = "Editar una Proyeccion";
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
        severity="danger"
        text
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        severity="warning"
        text
        onClick={deleteProduct}
      />
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
          <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Proyecciones</h2>} right={rightToolbarTemplate}></Toolbar>


          <DataTable
            value={filterByNameOrAddress(globalFilter, Proyecciones)}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="proy_Id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            emptyMessage={`No hay Proyeccioneses que coincidan con "${globalFilter}".`}
            header={header}
            responsiveLayout="scroll"
            globalFilter={globalFilter}
          >
            <Column field="proy_Id" header="ID" sortable />
            <Column field="peli_Titulo" header="Proyecciones" sortable />
            <Column
              field="sala_Butacas"
              header="Cantidad de Asinetos"
              sortable
            />
            <Column field="casa_Categoria" header="Categoria" sortable />
            <Column field="hor_HoraInicio" header="Inicia" sortable />
            <Column field="hor_HoraFin" header="Finaliza" sortable />
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
                  <label htmlFor="Peliculas">Peliculas</label>
                  <Dropdown
                    value={selectedPeliculas}
                    onChange={onPeliculasChange}
                    options={PeliculasOptions || []} // inicialmente null, pero en renderizado, si es null usará el array vacío
                    placeholder="Seleccionar"
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !selectedPeliculas,
                    })}
                  />
                  {submitted && !selectedPeliculas && (
                    <small className="p-invalid">
                      La pelicula es requerido.
                    </small>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="field">
                  <label htmlFor="Sala">Sala</label>
                  <Dropdown
                    value={selectedSala}
                    onChange={onSalaChange}
                    options={SalaOptions || []} // inicialmente null, pero en renderizado, si es null usará el array vacío
                    placeholder="Seleccionar"
                    className={classNames({
                      "p-invalid": submitted && !selectedSala,
                    })}
                  />
                  {submitted && !selectedSala && (
                    <small className="p-invalid">La Sala es requerido.</small>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="field">
                  <label htmlFor="Horario">Horario</label>
                  <Dropdown
                    value={selectedHoraio}
                    onChange={onHorarioChange}
                    options={HoraioOptions || []} // inicialmente null, pero en renderizado, si es null usará el array vacío
                    placeholder="Seleccionar"
                    className={classNames({
                      "p-invalid": submitted && !selectedHoraio,
                    })}
                  />
                  {submitted && !selectedHoraio && (
                    <small className="p-invalid">
                      EL Horario es requerido.
                    </small>
                  )}
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirmar"
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
                <span>
                 ¿Está seguro de querer eliminar esta proyección?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Proyecciones;
