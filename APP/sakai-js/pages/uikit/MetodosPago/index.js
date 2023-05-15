import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from "primereact/dropdown";
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from "primereact/calendar";
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

//Importo la url de la api
import Global from '../../api/Global';


const Metodo = () => {
    let emptyMetodo = {

        pago_Id: null,
        pago_Descripcion: "",
        pago_UsuarioCreador: null,
        pago_UsuarioModificador: null,

    };
    
    //products son los datos
    const [metodo, setMetodo] = useState([]);
    
    //products son los datos
    const [calendarValue, setCalendarValue] = useState(null);
    const [RadioValue, setRadioValue] = useState("");
    //Ni idea aun
    const [products, setProducts] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [detalleProductDialog, setDetalleProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [headerDialog, setheaderDialog] = useState("");

    //es mi model
    const [product, setProduct] = useState(emptyMetodo);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    //Buscar
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //el ProductService esta trallendo los datos de los productos
    useEffect(() => {

        axios.get(Global.url + 'MetodoPago/List')
            .then(response => {
                setMetodo(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [metodo]);


    //abre el modal
    const openNew = () => {
        setProduct(emptyMetodo);
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

        if (test.pago_Id != "" && test.pago_Id != 0 && test.pago_Id != null) {

            console.log("siiiiiiii");

            //Tomo los datos de mi modelo
            var parameterEdit = {
                "pago_Id": test.pago_Id,
                "pago_Descripcion": test.pago_Descripcion,
                "pago_UsuarioModificador": 1,
            }

            axios.put(Global.url + `MetodoPago/Update`, parameterEdit)
                .then((response) => {

                    if (response.data.codeStatus == 1) {
                        toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Editaste un registro', life: 1500 });
                        setProductDialog(false);
                        setRadioValue("");
                        console.log(response.data)
                    } else {
                        console.log(response.data)
                    }

                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });

                });
        }
        else if (test.pago_Descripcion != "" ) {

            
            //Tomo los datos de mi modelo
            var parameterInsert = {
                "pago_Descripcion": test.pago_Descripcion,
                "pago_UsuarioCreador": 1,
            }

            axios.post(Global.url + 'MetodoPago/Insert', parameterInsert)
                .then((response) => {
                    if (response.data.code == 200) {
                        toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Ingresaste un nuevo registro', life: 1500 });
                        setProductDialog(false);
                        product.pago_Id = "";
                        console.log("hola")
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });
                });
        } else {
            console.log(test);
        }
    };

    const editProduct = (product) => {
        setheaderDialog(2);
        axios.get(Global.url + `MetodoPago/Find/${product.pago_Id}`)
            .then((response) => {
                const product = response.data;
                setProduct({ ...product });
            })
            .catch((error) => {

                console.log(error.response.data.errors);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });

            });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = product;
        console.log(_products);
        setProducts(_products);

        //setDeleteProductDialog(false);
        setProduct(emptyMetodo);

        if (_products.pago_Id != "") {


            axios.post(Global.url + `MetodoPago/Delete/${_products.pago_Id}`)
                .then((response) => {

                    if (response.data.codeStatus == 1) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Método de pago eliminado', life: 3000 });
                        setDeleteProductDialog(false);
                    }

                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });

                });


        }
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Método de pago eliminado', life: 3000 });
    };



    const pago_DescripcionChange = (e, pago_Descripcion) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${pago_Descripcion}`] = val;

        setProduct(_product);
    };


    //abre el modal para crear un nuevo usuario y eliminar
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    //redimenciona la  imagen
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
               
            </React.Fragment>
        );
    };


    //Botones de editar y eliminar
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    //Hederrrr
    if (headerDialog == "1") {
        var Titulo = "Registrar un Método de Pago"
    } else if (headerDialog == "2") {
        var Titulo = "Editar un Método de Pago"
    }



    //Encabezado
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Método de Pago</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />

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
                item.pago_Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    };

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Sí" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Sí" icon="pi pi-check" text onClick={deleteSelectedProducts} />
        </>
    );
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={filterByNameOrAddress(globalFilter, metodo)}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No hay Métodos de pago."
                        header={header}
                        responsiveLayout="scroll"
                    >



                        <Column field="pago_Id" header="ID" sortable />
                        <Column field="pago_Descripcion" header="Descripción" sortable />
                        <Column header="Acciones" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '700px' }} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <h1>{Titulo}</h1>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Descripción</label>
                                <InputText id="name" value={product.pago_Descripcion} autoFocus onChange={(e) => pago_DescripcionChange(e, 'pago_Descripcion')} required className={classNames({ 'p-invalid': submitted && !product.pago_Descripcion })} />
                                {submitted && !product.pago_Descripcion && <small className="p-invalid">La descripción es requerida.</small>}
                            </div>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    ¿Está seguro que dese eliminar este registro? <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Metodo;
