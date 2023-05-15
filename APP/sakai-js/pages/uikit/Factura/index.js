import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

//Importo la url de la api
import Global from "../../api/Global";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

const Factura = () => {
  const router = useRouter();
  const toast = useRef(null);
  const dt = useRef(null);

    let emptyFactura = {
      "fade_Id": null,
      "fade_Factura": null,
      "clie_RTN": "",
      "clie_Nombres": "",
      "clie_Apellidos": "",
      "fade_Proyeccion": null,
      "peli_Titulo": "",
      "sala_Id": null,
      "casa_Categoria": "",
      "fade_Tickets":null,
      "casa_Precio": null,
      "fade_Combo_Id": "",
      "fade_Combo_Cantidad": "",
      "comb_Descripcion": "",
      "fade_ComboDetalle": "",
      "fade_ComboDetalle_Cantidad": "",
      "fade_Pago": null,
      "pago_Descripcion": "",
      "fade_Total_Tickets": null,
      "fade_Total_Combo": null,
      "fade_Total": null,
      "fade_Estado": null,
      "fade_UsuCrea": null
    };

  const [product, setProduct] = useState(emptyFactura);

  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [Factura, setFactura] = useState();

  useEffect(() => {
    axios
      .get(Global.url + "FacturaDetalles/List")
      .then((response) => {
        setFactura(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Factura]);

  //cofirmacionde eliminacion de registros
  const confirmDeleteEmpleado = (product) => {
    setempl_Id(product.empl_Id);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    console.log("dentro en el 1");

    axios
      .post(Global.url + `Empleado/Delete/${empl_Id}`)
      .then((response) => {
        if (response.data.codeStatus == 1) {
          toast.current.show({
            severity: "success",
            summary: "Felicidades",
            detail: "Eliminaste un registro",
            life: 1500,
          });
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
    setDeleteProductDialog(false);
  };

  useEffect(()=>{
    if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
        router.push('/auth/login');
    }
    
}, [])
  //activa el modal
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

  const [llevar , setllevar] = useState(false);
  //acciones de los botones
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-paperclip"
          severity="success"
          rounded
          className="mr-2"
          onClick={() => {
            setllevar(true)
            router.push({
              pathname: "/uikit/Factura/FacturaFinal",
              query: { RTN:rowData.clie_RTN, Factura_Id: rowData.fade_Factura, Nombre:rowData.clie_Nombres, Apellido:rowData.clie_Apellidos},
            })

          }}
        />
        <Button
          icon="pi pi-trash"
          severity="warning"
          rounded
          onClick={() => confirmDeleteEmpleado(rowData)}
        />
      </>
    );
  };

  //envabezado
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Factura</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  //Buscador
  const filterByName = (value, data) => {
    if (!value) {
      return data;
    }
    return data.filter(
      (item) =>
        item.clie_Nombres.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        item.peli_Titulo.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        item.clie_Apellidos.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  };

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
         <img src='https://s3.amazonaws.com/static-s3.clickbus.com.mx/lp-facturacion/img/invoice.png' width={'100px'}></img>
        </React.Fragment>
    );
};


  //uncabezado
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            severity="warning"
            className="mr-2"
            onClick={() => router.push("/uikit/Factura/CreateFactura")}
          />
        </div>
      </React.Fragment>
    );
  };

  //Acciones
  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductDialog}
      />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid crud-demo">
            <div className="col-12">
              <div className="card">
                <Toast ref={toast} />
                <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Facturas</h2>} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                  ref={dt}
                  value={filterByName(globalFilter, Factura)}
                  selection={selectedFactura}
                  onSelectionChange={(e) => setSelectedFactura(e.value)}
                  dataKey="id"
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  className="datatable-responsive"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                  globalFilter={globalFilter}
                  emptyMessage="No hay Facturas."
                  header={header}
                  responsiveLayout="scroll"
                >
                  <Column field="clie_RTN" header="RTN" sortable />
                  <Column field="clie_Nombres" header="Nombre" sortable />
                  <Column field="clie_Apellidos" header="Apellido" sortable />
                  <Column field="peli_Titulo" header="Pelicula" sortable />
                  <Column
                    body={actionBodyTemplate}
                    headerStyle={{ minWidth: "10rem" }}
                  ></Column>
                </DataTable>

                <Dialog
                  visible={deleteProductDialog}
                  style={{ width: "450px" }}
                  header="Confirm"
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
                        Are you sure you want to delete <b>{product.name}</b>?
                      </span>
                    )}
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factura;
