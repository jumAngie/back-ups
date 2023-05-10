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


const Roles = () => {
    let emptyRoles = {

        role_Id: null,
        role_Nombre: "",
        role_UsuCreacion: 0,
        role_UsuModificacion: 0,

    };
    
    //products son los datos
    const [roles, setRoles] = useState([]);
    
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
    const [product, setProduct] = useState(emptyRoles);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    //Buscar
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //el ProductService esta trallendo los datos de los productos
    useEffect(() => {

        axios.get(Global.url + 'Roles/List')
            .then(response => {
                setRoles(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [roles]);


    //abre el modal
    const openNew = () => {
        setProduct(emptyRoles);
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

        if (test.role_Id != "" && test.role_Id != 0 && test.role_Id != null) {

            //Tomo los datos de mi modelo
            var parameterEdit = {
                "role_Id": test.role_Id,
                "role_Nombre": test.role_Nombre,
                "role_UsuCreacion": test.role_UsuCreacion,
                "role_FechaCreacion": "2023-05-10T16:44:43.339Z",
                "role_UsuModificacion": 1,
                "role_FechaModificacion": "2023-05-10T16:44:43.339Z",
                "role_Estado": true
            }

            axios.put(Global.url + `Roles/Update`, parameterEdit)
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
        else if (test.role_Nombre != "" && test.role_UsuCreacion != "") {

           
            
            //Tomo los datos de mi modelo
            var parameterInsert = {
                "role_Id": test.role_Id,
                "role_Nombre": test.role_Nombre,
                "role_UsuCreacion": 1,
                "role_FechaCreacion": "2023-05-10T16:46:21.691Z",
                "role_UsuModificacion": test.role_UsuModificacion,
                "role_FechaModificacion": "2023-05-10T16:46:21.691Z",
                "role_Estado": true
            }

            axios.post(Global.url + 'Roles/Insert', parameterInsert)
                .then((response) => {
                    if (response.data.code == 200) {
                        toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Ingresaste un nuevo registro', life: 1500 });
                        setProductDialog(false);
                        product.role_Id = "";
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
        axios.get(Global.url + `Roles/Find/${product.role_Id}`)
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
        setProduct(emptyRoles);

        if (_products.pago_Id != "") {


            axios.post(Global.url + `Roles/Delete/${_products.role_Id}`)
                .then((response) => {

                    if (response.data.codeStatus == 1) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol eliminado', life: 3000 });
                        setDeleteProductDialog(false);
                    }

                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });

                });


        }
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol eliminado', life: 3000 });
    };



    const role_NombreChange = (e, role_Nombre) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${role_Nombre}`] = val;

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
        var Titulo = "Registrar un Rol"
    } else if (headerDialog == "2") {
        var Titulo = "Editar un Rol"
    }



    //Encabezado
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Roles</h5>
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
                item.role_Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
                        value={filterByNameOrAddress(globalFilter, roles)}
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
                        emptyMessage="No hay Roles"
                        header={header}
                        responsiveLayout="scroll"
                    >



                        <Column field="role_Id" header="ID" sortable />
                        <Column field="role_Nombre" header="Descripción" sortable />
                        <Column header="Acciones" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '700px' }} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <h1>{Titulo}</h1>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Descripción</label>
                                <InputText id="name" value={product.role_Nombre} autoFocus onChange={(e) => role_NombreChange(e, 'role_Nombre')} required className={classNames({ 'p-invalid': submitted && !product.role_Nombre })} />
                                {submitted && !product.role_Nombre && <small className="p-invalid">La descripción es requerida.</small>}
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

export default Roles;
