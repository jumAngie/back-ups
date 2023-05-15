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


const Insumo = () => {
    let emptyInsumo = {
        insu_Id: null,
        insu_Descripcion: '',
        insu_Precio: null,
        insu_href: '',
        insu_src: null,
        insu_alt: null,
        insu_UserCrea: null,
        insu_UsuarioModifica: null
    };

    const [Insumo, setInsumo] = useState([]);
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [headerDialog, setheaderDialog] = useState("");
    const [product, setProduct] = useState(emptyInsumo);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    //Buscar
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //el ProductService esta trallendo los datos de los productos
    useEffect(() => {
        fetch(Global.url + 'Insumo/List')
            .then(response => response.json())
            .then(data => setInsumo(data.data))
            .catch(error => console.error(error));
    }, [Insumo]);


    //abre el modal
    const openNew = () => {
        setProduct(emptyInsumo);
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

        if (test.insu_Id != "" && test.insu_Id != 0 && test.insu_Id != null) {

            console.log("Editar");

            //Tomo los datos de mi modelo
            var parameterEdit = {
                "insu_Id": test.insu_Id,
                "insu_Descripcion": test.insu_Descripcion,
                "insu_Precio": test.insu_Precio,
                "insu_UsuarioModifica": 1
            }

            axios.put(Global.url + `Insumo/Update`, parameterEdit)
                .then((response) => {
                    if (response.data.codeStatus == 1) {
                        toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Editaste un registro', life: 1500 });
                        setProductDialog(false);
                        console.log(response.data)
                    } else {
                        console.log(response.data)
                    }

                })
                .catch((error) => {
                    console.log(error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });

                });
        }
        else if (test.insu_Descripcion != ""  &&  parseInt(test.insu_Precio ) > 0 ) {

           
            
            //Tomo los datos de mi modelo
            var parameterInsert = {
                "insu_Descripcion": test.insu_Descripcion,
                "insu_Precio": parseInt(test.insu_Precio),
                "insu_UserCrea": 1
            }

            console.log(parameterInsert)

            axios.post(Global.url + 'Insumo/Insert', parameterInsert)
                .then((response) => {
                    if (response.data.code == 200) {
                        toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Ingresaste un nuevo registro', life: 1500 });
                        setProductDialog(false);
                        product.insu_Id = "";
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
        axios.get(Global.url + `Insumo/Find/${product.insu_Id}`)
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
        setProduct(emptyInsumo);

        if (_products.insu_Id != "") {


            axios.post(Global.url + `Insumo/Delete/${_products.insu_Id}`)
                .then((response) => {

                    if (response.data.codeStatus == 1) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Insumo eliminado', life: 3000 });
                        setDeleteProductDialog(false);
                    }

                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });

                });


        }
    };
    
    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Insumo eliminado', life: 3000 });
    };



    const insu_DescripcionChange = (e, insu_Descripcion) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${insu_Descripcion}`] = val;

        setProduct(_product);
    };

    const insu_PrecioChange = (e, insu_Precio) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${insu_Precio}`] = e.value;
        setProduct(_product);
    };

    const botonStyle = {
        backgroundImage: `url(/layout/images/combo-button-2.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '10px 20px',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };

    //abre el modal para crear un nuevo usuario y eliminar
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" severity="warning" className="mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    //redimenciona la  imagen
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <img src='/layout/images/PALOMITAS.png' width={'100px'}></img>
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
        var Titulo = "Registrar un Insumo"
    } else if (headerDialog == "2") {
        var Titulo = "Editar un Insumo"
    }



    //Encabezado
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
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
                item.insu_Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    };

    const productDialogFooter = (
        <>
            <Button label="Cancelar" severity="danger"  className="mr-2" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" severity="warning"  icon="pi pi-check" text onClick={saveProduct} />
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
                    <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Insumos</h2>} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={filterByNameOrAddress(globalFilter,Insumo)}
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
                        emptyMessage="No hay Insumo."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        
                       
                        <Column field="insu_Id" header="ID" sortable />
                        <Column field="insu_Descripcion" header="Nombre" sortable />
                        <Column field="insu_Precio" header="Precio" sortable />
                         <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '700px' }} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <h1>{Titulo}</h1>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Descripción</label>
                                
                                <InputText id="name" value={product.insu_Descripcion} autoFocus onChange={(e) => insu_DescripcionChange(e, 'insu_Descripcion')} required className={classNames({ 'p-invalid': submitted && !product.insu_Descripcion })} />
                                {submitted && !product.insu_Descripcion && <small className="p-invalid">La descripción es requerida.</small>}
                            </div>
                             <div className="field">
                            <label htmlFor="insu_Precio">Precio</label>
                            <div class="p-inputgroup">
                            <InputNumber id="name" value={product.insu_Precio} onChange={(e) => insu_PrecioChange(e, 'insu_Precio')} required className={classNames({ 'p-invalid': submitted && !product.insu_Precio })}  />
                            <span class="p-inputgroup-addon">HNL</span>
                            </div>
                            {submitted && !product.insu_Precio && <small className="p-invalid">El precio es requerido.</small>}
                        </div>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    ¿Está seguro que dese eliminar este registro?<b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Insumo;
