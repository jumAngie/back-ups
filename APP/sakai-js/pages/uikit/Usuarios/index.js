import { Button } from 'primereact/button';
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
//Importo la url de la api
import Global from '../../api/Global';
import { useRouter } from 'next/router';
import axios from "axios";

const Usuario = () => {
    let emptyProduct = {
        user_Id: null,
        user_NombreUsuario: '',
        nombre:"",
        role_Nombre: '',
           
    };

    //products son los datos
    const [Usuario, setUsuario] = useState([]);
    const router = useRouter();
    //Ni idea aun
    const [products, setProducts] = useState(null);

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
        fetch(Global.url + 'Usuario/List')
            .then(response => response.json())
            .then(data => setUsuario(data.data))
            .catch(error => console.error(error));
    }, []);

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

    const fetchData = () => {
        axios
          .get(Global.url + "Usuario/List")
          .then((response) => {
            setUsuario(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          })
      };

      const confirmDeleteProduct = (products) => {
        setProducts(products);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products;
        console.log(_products);
        setProducts(_products);
        setDeleteProductDialog(false);

        if(_products.user_Id !== "" ){
            axios.post(Global.url + `Usuario/Delete/${_products.user_Id}`)
        .then((response) => {
             if(response.data.codeStatus == 1){
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Usuario eliminado', life: 3000 });
                fetchData();
                setDeleteProductDialog(false);
            }

        })
        .catch((error) => {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario', life: 1500 });

        });
        }
       
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

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
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

    //habre el modal para crear un nuevo usuario y eliminar
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={() => router.push('/uikit/Usuarios/CreateUsuarios')} />
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
                {rowData.user_Id}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.user_NombreUsuario}
            </>
        );
    };

    const EmpleadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.nombre}
            </>
        );
    };

     

     
    
    //Finall de la heda de la tabla

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        );
    };

    //Botones de editar y eliminar
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => router.push({pathname:'/uikit/Usuarios/EditUsuario', query:{user_Id: rowData.user_Id} })} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    

    //Encabezado
   const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Usuarios</h5>
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
        item.user_NombreUsuario.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        item.nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1 
     );
  };

  

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" severity='danger' icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Sí" severity='warning' icon="pi pi-check" text onClick={deleteProduct} />
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
                        value={filterByNameOrAddress(globalFilter,Usuario)}
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
                        emptyMessage="No hay Usuario."
                        header={header}
                        responsiveLayout="scroll"
                    >
                         
                        
                        <Column field="user_Id" header="ID" sortable />
                        <Column field="user_NombreUsuario" header="Usuario" sortable />
                        <Column field="nombre" header="Nombre" sortable />
                         <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    ¿Está seguro de eliminar este Usuario?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
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

export default Usuario;
