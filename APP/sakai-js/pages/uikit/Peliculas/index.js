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
import { useRouter } from 'next/router';
import axios from 'axios';

//Importo la url de la api
import Global from '../../api/Global';




const Peliculas = () => {
    const router = useRouter();
    let emptyPeliculas = {

        peli_Id: null,
        peli_Titulo: '',
        peli_TitulOriginal: '',
        peli_AnioEstreno: null,
        peli_Duracion: null,
        peli_Categoria: null,
        cate_Nombre: "",
        peli_Director: null,
        dire_Nombre: "",

    };
    
    //products son los datos
    const [peliculas, setPeliculas] = useState([]);
    
    //products son los datos
    const [calendarValue, setCalendarValue] = useState(null);
    const [RadioValue, setRadioValue] = useState("");
    //Ni idea aun
    const [products, setProducts] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [headerDialog, setheaderDialog] = useState("");

    //es mi model
    const [product, setProduct] = useState(emptyPeliculas);
    //const [DirectorEdit, setDirectorEdit] = useState(emptyDirector);

    ///////////////////////////////////////////////// ddl de Cates ///////////////////////////////////////////////////////////
    const [categoriaOptions, setCategoriaOptions] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    ///////////////////////////////////////////////// ddl de Director ///////////////////////////////////////////////////////////
    const [directorOptions, setDirectorOptions] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);


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

        axios.get(Global.url + 'Peliculas/List')
            .then(response => {
                setPeliculas(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [peliculas]);

    useEffect(() => {
        //Categorias DDL
        fetch(Global.url + "Categoria/List")
            .then((response) => response.json())
            .then((data) =>
                setCategoriaOptions(
                    data.data.map((s) => ({ value: s.cate_Id, label: s.cate_Nombre }))
                )
            )
            .catch((error) => console.error(error));
        
        //Director DLL
        fetch(Global.url + "Director/List")
            .then((response) => response.json())
            .then((data) =>
                setDirectorOptions(
                    data.data.map((s) => ({ value: s.dire_Id, label: s.dire_Nombres + ' ' + s.dire_Apellidos, }))
                )
            )
            .catch((error) => console.error(error));
    })
    // Funcion para seleccionar categoria
    const onCategoriaChange = (e) => {
        setSelectedCategoria(e.value);
     };

     // Funcion para seleccionar director
    const onDirectorChange = (e) => {
        setSelectedDirector(e.value);
     };


    //abre el modal
    const openNew = () => {
        setProduct(emptyPeliculas);
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

        console.log(selectedCategoria)
        console.log(selectedDirector)

        if (test.peli_Id != "" && test.peli_Id != 0 && test.peli_Id != null) {

         
            //Tomo los datos de mi modelo
            var parameterEdit = {
                "peli_Id": test.peli_Id,
                "peli_Titulo": test.peli_Titulo,
                "peli_TitulOriginal":test.peli_Titulo,
                "peli_AnioEstreno": parseInt(test.peli_AnioEstreno),
                "peli_Categoria": parseInt(selectedCategoria),
                "peli_Duracion": parseInt(test.peli_Duracion),
                "peli_Director": parseInt(selectedDirector),
                "peli_UsuMofica": 1
            }

            axios.put(Global.url + `Peliculas/Update`, parameterEdit)
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
        else if (test.peli_Titulo != ""  && parseInt(test.peli_AnioEstreno)  > 0 && parseInt(selectedCategoria)  > 0  &&  parseInt(selectedDirector) > 0  && parseInt(test.peli_Duracion) > 0 ) {

            
            //Tomo los datos de mi modelo
            var parameterInsert = {

                "peli_Titulo": test.peli_Titulo,
                "peli_TitulOriginal": test.peli_Titulo,
                "peli_AnioEstreno": parseInt(test.peli_AnioEstreno),
                "peli_Categoria": parseInt(selectedCategoria),
                "peli_Duracion": parseInt(test.peli_Duracion),
                "peli_Director": parseInt(selectedDirector),
                "peli_UsuCrea": 1
            }
            console.log
            axios.post(Global.url + `Peliculas/Insert`, parameterInsert)
                .then((response) => {
                    if (response.data.code == 200) {
                        toast.current.show({ severity: 'success', summary: 'Felicidades', detail: 'Ingresaste un nuevo registro', life: 1500 });
                        setProductDialog(false);
                        product.peli_Id = "";
                        console.log("hola")
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Vuelva a ingresar los datos nuevamente', life: 1500 });
                });
        } else {
            console.log(test);
            console.log("dentra al else")
        }
    };

    const editProduct = (product) => {
        setheaderDialog(2);
        axios.get(Global.url + `Peliculas/Find/${product.peli_Id}`)
            .then((response) => {
                const product = response.data;
                setSelectedCategoria(response.data.peli_Categoria);
                setSelectedDirector(response.data.peli_Director);
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
        setProduct(emptyPeliculas);

        if (_products.peli_Id != "") {


            axios.post(Global.url + `Peliculas/Delete/${_products.peli_Id}`)
                .then((response) => {

                    if (response.data.codeStatus == 1) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Película Eliminada', life: 3000 });
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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Película Eliminada', life: 3000 });
    };






    const peli_TituloChange = (e, peli_Titulo) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${peli_Titulo}`] = val;

        setProduct(_product);
    };

    const peli_TitulOriginalChange = (a, peli_TitulOriginal) => {
        const val = (a.target && a.target.value) || '';
        let _product = { ...product };
        _product[`${peli_TitulOriginal}`] = val;


        setProduct(_product);
    };

    const peli_AnioEstrenoChange = (a, peli_AnioEstreno) => {
        const val = (a.target && a.target.value) || '';
        let _product = { ...product };
        _product[`${peli_AnioEstreno}`] = val;


        setProduct(_product);
    };

    const peli_DuracionChange = (a, peli_Duracion) => {
        const val = (a.target && a.target.value) || '';
        let _product = { ...product };
        _product[`${peli_Duracion}`] = val;

        setProduct(_product);
    };


    //habre el modal para crear un nuevo usuario y eliminar
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
 <img src='https://www.alabamacounties.org/wp-content/uploads/2018/12/cine_icono.png' width={'100px'}></img>

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
    if (headerDialog == "1") {
        var Titulo = "Registrar una Pelicula"
    } else if (headerDialog == "2") {
        var Titulo = "Editar una Pelicula"

    }



    //Encabezado
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Peliculas</h5>
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
                item.peli_Titulo.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                item.peli_TitulOriginal.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                item.cate_Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                item.dire_Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    };

    const productDialogFooter = (
        <>
            <Button label="Cancelar" severity='danger' icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Guardar" severity='warning' icon="pi pi-check" text onClick={saveProduct} />
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
                    <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Películas</h2>} right={rightToolbarTemplate}></Toolbar>


                    <DataTable
                        ref={dt}
                        value={filterByNameOrAddress(globalFilter, peliculas)}
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
                        emptyMessage="No hay Peliculas."
                        header={header}
                        responsiveLayout="scroll"
                    >



                        <Column field="peli_Id" header="ID" sortable />
                        <Column field="peli_Titulo" header="Titulo" sortable />
                        <Column field="peli_TitulOriginal" header="Titulo Original" sortable />
                        <Column field="peli_AnioEstreno" header="Año Estreno" sortable />
                        <Column field="cate_Nombre" header="Categoria" sortable />
                        <Column field="dire_Nombre" header="Director" sortable />
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '700px' }} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <h1>{Titulo}</h1>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Titulo</label>
                                <InputText id="name" value={product.peli_Titulo} autoFocus onChange={(e) => peli_TituloChange(e, 'peli_Titulo')} required className={classNames({ 'p-invalid': submitted && !product.peli_Titulo })} />
                                {submitted && !product.peli_Titulo && <small className="p-invalid">Titulo es requerido.</small>}
                            </div>
                           
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-6 mr-2" >
                                <label htmlFor="peli_AnioEstreno">Año Estreno</label>
                                <InputText yearNavigator yearRange="1900:2130" view="year" dateFormat="yy" value={product.peli_AnioEstreno} id="peli_AnioEstreno" showIcon showButtonBar onChange={(e) => peli_AnioEstrenoChange(e, 'peli_AnioEstreno')} required className={classNames({ 'p-invalid': submitted && !product.peli_AnioEstreno })} />
                                {submitted && !product.peli_AnioEstreno && <small className="p-invalid">Año Estreno es requerido.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="categoria">Categoria</label>
                                <Dropdown value={selectedCategoria} onChange={onCategoriaChange} options={categoriaOptions} placeholder="Seleccionar Categoría" className={classNames({
                                    "p-invalid": submitted && !selectedCategoria,
                                })} /> {submitted && !selectedCategoria && (<small className="p-invalid">La Categoria es requerida.</small>)}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-6 mr-2" >
                            <label htmlFor="categoria">Director</label>
                                <Dropdown value={selectedDirector} onChange={onDirectorChange} options={directorOptions} placeholder="Seleccionar Director" className={classNames({
                                    "p-invalid": submitted && !selectedDirector,
                                })} /> {submitted && !selectedDirector && (<small className="p-invalid">El Director es requerido.</small>)}
                            </div>
                            <div className="field col">
                                <label htmlFor="duracion">Duracion -mins-</label>
                                <InputText id="Duracion" value={product.peli_Duracion} onChange={(e) => peli_DuracionChange(e, 'peli_Duracion')} required  className={classNames({ 'p-invalid': submitted && !product.peli_Duracion })} />
                                {submitted && !product.peli_Duracion && <small className="p-invalid">La duración es requerida.</small>}
                            </div>
                                </div>

                    </Dialog>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
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

export default Peliculas;
