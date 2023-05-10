import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';
//Importo la url de la api
import Global from '../../api/Global';
import { useRouter } from 'next/router';
import {EditEmpleado} from './EditEmpleado';
import axios from "axios";



const Empleados = () => {
    let emptyProduct = {
        empl_Id: null,
        empl_DNI: null,
        empl_Nombre: '',
        empl_Apellidos: '',
        empl_Sexo: '',
        empl_Estadocivil: null,
        empl_Cargo: null,
        empl_Sucursal:null,
         
    };

    //products son los datos
    const [empleados, setEmpleados] = useState([]);

    //Ni idea aun
    const [products, setProducts] = useState(null);
    const [empl_Id, setempl_Id] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    //es mi model
    const [product, setProduct] = useState(emptyProduct);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    //Buscar
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //el ProductService esta trallendo los datos de los productos
    useEffect(() => {
        fetch(Global.url + 'Empleado/List')
            .then(response => response.json())
            .then(data => setEmpleados(data.data))
            .catch(error => console.error(error));
    }, [empleados]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    //abre el modal
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
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
    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.code = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);axios
    };

    const confirmDeleteEmpleado = (product) => {
         setempl_Id(product.empl_Id);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        
        console.log("dentro en el 1")

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

    //Busca por el index
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };
 

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = (setempl_Id) => {
        setempl_Id(setempl_Id)
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
         

    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['empl_Nombre'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, empl_Nombre) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${empl_Nombre}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, empl_Nombre) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${empl_Nombre}`] = val;

        setProduct(_product);
    };

    const router = useRouter();

    //habre el modal para crear un nuevo usuario y eliminar
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                      <Button label="Nuevo" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={() => router.push('/uikit/Empleados/CreateEmpleado')} />
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

    //Comienzo de el head de la tabla
    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.empl_DNI}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.empl_Nombre}
            </>
        );
    };

    const ApellidoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.empl_Apellidos}
            </>
        );
    };
    const CargoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.carg_Cargo}
            </>
        );
    };
    const SucursalBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.sucu_Nombre}
            </>
        );
    };

    
    //Finall de la heda de la tabla

    //metodo para buscar
    const filterByNameOrAddress = (value, data) => {
        if (!value) {
          return data;
        }
        return data.filter(
          (item) =>
            item.empl_Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            item.empl_Apellidos.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      };

    //Botones de editar y eliminar
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => router.push({pathname:'/uikit/Empleados/EditEmpleado', query:{id: rowData.empl_Id} })} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteEmpleado(rowData)} />
            </>
        );
    };

    

    //Titulo de mi Tabla
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Empleados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
 
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
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
                         value={filterByNameOrAddress(globalFilter,empleados)}
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
                        emptyMessage="No hay Empleados."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="empl_DNI" header="DNI" sortable />
                        <Column field="empl_Nombre" header="Nombre" sortable />
                        <Column field="empl_Apellidos" header="Apellido" sortable />
                        <Column field="carg_Cargo" header="Cargo" sortable />
                        <Column field="sucu_Nombre" header="Sucursal" sortable />
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                     <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly="true" />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Empleados;
