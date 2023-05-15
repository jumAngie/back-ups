import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import PantallasTable from "./PantallasTable";
import { useRouter } from 'next/router';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

//Importo la url de la api
import Global from '../../api/Global';


const TableDemo = () => {
    const [eliminarRol, setEliminarRol] = useState([]);
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [allExpanded, setAllExpanded] = useState(false);
    const toast = useRef(null);
    const router = useRouter();
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    
    useEffect(()=>{
        if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
            router.push('/auth/login');
        }
        
    }, [])
    useEffect(() => {
            axios.get(Global.url + 'Roles/List')
                .then(response => {
                    setProducts(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                });

    }, []); 

    const fetchData = () => {
        axios
          .get(Global.url + "Roles/List")
          .then((response) => {
            setProducts(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          })
      };

    const toggleAll = () => {
        if (allExpanded) collapseAll();
        else expandAll();
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    
    const confirmDeleteProduct = (eliminarRol) => {
        setEliminarRol(eliminarRol);
        setDeleteProductDialog(true);
    };
    
    const deleteProduct = () => {
        let _eliminar = eliminarRol;
        console.log(_eliminar);
        setEliminarRol(_eliminar);
    
        if(_eliminar.role_Id != "" ){
    
            
            axios.post(Global.url + `Roles/Delete/${eliminarRol.role_Id}`)
            .then((response) => {
                 if(response.data.codeStatus == 1){
                    toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Rol eliminado', life: 3000 });
                    fetchData();
                    setDeleteProductDialog(false);
                }
    
            })
            .catch((error) => {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el rol.', life: 1500 });
    
            });
    
              
        }
    };
    
    const deleteProductDialogFooter = (
        <>
            <Button label="No" severity='danger' icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Si" severity='warning' icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach((p) => (_expandedRows[`${p.role_Id}`] = true));

        setExpandedRows(_expandedRows);
        setAllExpanded(true);
    };

    const collapseAll = () => {
        setExpandedRows(null);
        setAllExpanded(false);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => router.push({pathname:'/uikit/table/EditarRoles', query:{id: rowData.role_Id, nombre: rowData.role_Nombre} })}/>
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() =>  confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
          <div className="orders-subtable">
            <center><h5>Pantallas del rol {data.role_Nombre}</h5></center>
            <PantallasTable role_Id={data.role_Id} />
          </div>
        );
      };

      const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" severity="warning" className="mr-2" onClick={() => router.push('/uikit/table/CreateRoles')} />
                </div>
            </React.Fragment>
        );
    };

    //redimenciona la  imagen
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
               <img src='https://www.iconshock.com/image/Impressions/Networking/role' width={'100px'}></img>
            </React.Fragment>
        );
    };

    const header2 = <Button icon={allExpanded ? 'pi pi-minus' : 'pi pi-plus'} label={allExpanded ? 'Cerrar Todo' : 'Mostrar Todo'} onClick={toggleAll} className="w-11rem" />;
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h1></h1>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                
            </span>
        </div>
    );

    const filterByNameOrAddress = (value, data) => {
        if (!value) {
          return data;
        }
        return data.filter(
          (item) =>
            item.role_Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <Toast ref={toast} />
                <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}  left={leftToolbarTemplate} center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Roles</h2>} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                    globalFilter={globalFilter}
                    emptyMessage="No hay Roles."
                    header={header}
                    value={filterByNameOrAddress(globalFilter, products)} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} responsiveLayout="scroll" rowExpansionTemplate={rowExpansionTemplate} dataKey="role_Id">
                        <Column expander style={{ width: '3em' }} />
                        <Column field="role_Id" header="ID" sortable />
                        <Column field="role_Nombre" header="Nombre" sortable />
                        <Column header="Acciones" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {products && (
                                <span>
                                    ¿Está seguro de eliminar este rol?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default TableDemo;
