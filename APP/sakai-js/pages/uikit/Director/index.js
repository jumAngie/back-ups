import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
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

const Director = () => {

    
    let emptyDirector = {

        dire_Id: null,
        dire_Nombres: '',
        dire_Apellidos: '',
        dire_FechaNacimiento:'',
        dire_Sexo: '',
          
    };

    //products son los datos
    const [director, setdirector] = useState([]);
    const [calendarValue, setCalendarValue] = useState(null);
    const [RadioValue,setRadioValue] = useState("");
    //Ni idea aun
    const [products, setProducts] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [headerDialog, setheaderDialog] = useState("");

    //es mi model
    const [product, setProduct] = useState(emptyDirector);
    //const [DirectorEdit, setDirectorEdit] = useState(emptyDirector);


    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);

     //Buscar
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //el ProductService esta trallendo los datos de los productos
    useEffect(() => {

        axios.get(Global.url + 'Director/List')
            .then(response => {
                setdirector(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [director ]);


    //abre el modal
    const openNew = () => {
        setProduct(emptyDirector);
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

        if(test.dire_Id != "" && test.dire_Id != 0 && test.dire_Id != null){

            console.log("siiiiiiii");
            var fecha = new Date(test.dire_FechaNacimiento)
            var dire_FechaNacimiento = test.dire_FechaNacimiento = fecha;
             //Tomo los datos de mi modelo
            var parameter = {
                "dire_Id": test.dire_Id,
                "dire_Nombres": test.dire_Nombres,
                "dire_Apellidos":test.dire_Apellidos,
                "dire_FechaNacimiento": dire_FechaNacimiento,
                "dire_Sexo":test.dire_Sexo,
                "dire_UsuMofica": 1
            }

            axios.put(Global.url + `Director/Update`, parameter)
            .then((response) => {

                 if(response.data.codeStatus == 1){
                    toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Editaste un registro', life: 1500 });
                    setProductDialog(false);
                    setRadioValue("");
                    console.log(response.data)
                }else{
                    console.log(response.data)
                }
 
            })
            .catch((error) => {
                console.log(error.response.data.errors);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva Ingresar los datos Nuevamente', life: 1500 });

            });
        }
        else  if(test.dire_Nombres != "" && test.dire_Apellidos != "" && test.dire_FechaNacimiento != "" && test.dire_Sexo != "" ){
            
            var fecha = new Date(test.dire_FechaNacimiento)
            var dire_FechaNacimiento = test.dire_FechaNacimiento = fecha;
             //Tomo los datos de mi modelo
            var parameter = {

                "dire_Nombres": test.dire_Nombres,
                "dire_Apellidos":test.dire_Apellidos,
                "dire_FechaNacimiento": dire_FechaNacimiento,
                "dire_Sexo":test.dire_Sexo,
                "dire_UsuCrea": 1
            }
            
            axios.post(Global.url + `Director/Insert`, parameter)
            .then((response) => {

                 if(response.data.code == 200){
                    toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Ingresaste un nuevo registro', life: 1500 });
                    setProductDialog(false);
                    product.dire_Id = "";

                    console.log("hola")
                }
                

            })
            .catch((error) => {
                console.log(error.response.data.errors);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva Ingresar los datos Nuevamente', life: 1500 });

            });

              
        }else{
            console.log(test);
        }
        
        
    };

     const editProduct = (product) => {
        setheaderDialog(2);
        axios.get(Global.url + `Director/Find/${product.dire_Id}`)
        .then((response) => {
            const product = response.data;
            // Convierte la fecha a un objeto de fecha de JavaScript
            const date = new Date(product.dire_FechaNacimiento);
            // Actualiza el estado del producto con la fecha formateada
            var setdata = product.dire_FechaNacimiento = date;
            var Sexo = product.dire_Sexo = product.dire_Sexo;
            console.log(product.dire_Sexo)
            setProduct({...product});
          })
            .catch((error) => {

                console.log(error.response.data.errors);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva Ingresar los datos Nuevamente', life: 1500 });

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
        setProduct(emptyDirector);

        if(_products.dire_Id != "" ){

            
            axios.post(Global.url + `Director/Delete/${_products.dire_Id}`)
            .then((response) => {

                 if(response.data.codeStatus == 1){
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Director Eliminado', life: 3000 });
                    setDeleteProductDialog(false);
                }
 
            })
            .catch((error) => {
                console.log(error.response.data.errors);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva Ingresar los datos Nuevamente', life: 1500 });

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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

 
    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['dire_Sexo'] = e.value;
        setProduct(_product);
    };

  

    const onNombreChange = (e, dire_Nombres) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${dire_Nombres}`] = val;

        setProduct(_product);
    };

    const onApellidoChange = (a, dire_Apellidos) => {
        const val = (a.target && a.target.value) || '';
        let _product = { ...product };
        _product[`${dire_Apellidos}`] = val;


        setProduct(_product);
    };

    const handleFechaNacimientoChange = (e) => {
        const val = e.target?.value || '';
        console.log(val);
      
        setProduct(prevProduct => ({
          ...prevProduct,
          dire_FechaNacimiento: val,
        }));
    };
      
      
    //habre el modal para crear un nuevo usuario y eliminar
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
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    //Hederrrr
    if(headerDialog == "1"){
        var Titulo = "Registrar un director"
    }else if(headerDialog == "2"){
        var Titulo = "Editar un director"

    }
    
    

    //Encabezado
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <h5 className="m-0">Directores</h5>
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
            item.dire_Nombres.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            item.dire_Apellidos.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
                        value={filterByNameOrAddress(globalFilter,director)}
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
                        emptyMessage="No hay director."
                        header={header}
                        responsiveLayout="scroll"
                    >   

                     
                        <Column field="dire_Id" header="ID" sortable />
                        <Column field="dire_Nombres" header="Nombre" sortable />
                        <Column field="dire_Apellidos" header="Apellido" sortable />
                        <Column field="dire_FechaNacimiento" header="Nacimiento" sortable />
                        <Column field="dire_Sexo" header="Sexo" sortable />
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                     <Dialog visible={productDialog} style={{ width: '700px' }} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                       
                       <h1>{Titulo}</h1>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Nombre</label>
                                <InputText id="name" value={product.dire_Nombres} onChange={(e) => onNombreChange(e, 'dire_Nombres')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.dire_Nombres })} />
                                {submitted && !product.dire_Nombres && <small className="p-invalid">Name is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="Apellido">Apellido</label>
                                <InputText id="Apellido" value={product.dire_Apellidos} onChange={(e) => onApellidoChange(e, 'dire_Apellidos')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.dire_Apellidos })} />
                                {submitted && !product.dire_Apellidos && <small className="p-invalid">Apellido is required.</small>}
                            </div>
                        </div>


                        <div className="formgrid grid">
                           <div className="field col-6 mr-2" >
                               <label htmlFor="dire_FechaNacimiento">Fecha de Nacimiento</label>
                               <Calendar value={product.dire_FechaNacimiento} id="dire_FechaNacimiento" showIcon  showButtonBar onChange={(e) => handleFechaNacimientoChange(e, 'dire_FechaNacimiento')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.dire_FechaNacimiento })} />
                               {submitted && !product.dire_FechaNacimiento && <small className="p-invalid">Fecha de Nacimiento es requerido.</small>}
                           </div>

                        
                        <div className="field">
                            <label className="mb-3" >Sexo</label>
                                <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="M" onChange={onCategoryChange} checked={product.dire_Sexo === 'Masculino'} required autoFocus className={classNames({ 'p-invalid': submitted && !product.dire_Sexo })} />
                                    <label htmlFor="category3">Masculino</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="F" onChange={onCategoryChange} checked={product.dire_Sexo === 'Femenino'} required autoFocus className={classNames({ 'p-invalid': submitted && !product.dire_Sexo })} />
                                    <label htmlFor="category4">Femenino</label>
                                </div>
                                    {submitted && !product.dire_Sexo && <small className="p-invalid">Campo requerido</small>}

                                </div>
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

export default Director;
