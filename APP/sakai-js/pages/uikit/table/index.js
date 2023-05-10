import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ToggleButton } from 'primereact/togglebutton';
import { Rating } from 'primereact/rating';
import axios from 'axios';
import PantallasTable from "./PantallasTable";


//Importo la url de la api
import Global from '../../api/Global';


const TableDemo = () => {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [allExpanded, setAllExpanded] = useState(false);

    useEffect(() => {
            axios.get(Global.url + 'Roles/List')
                .then(response => {
                    setProducts(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                });

    }, []); 

    const toggleAll = () => {
        if (allExpanded) collapseAll();
        else expandAll();
    };

    

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

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded className="mr-2" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
          <div className="orders-subtable">
            <h5>Pantallas del rol {data.role_Nombre}</h5>
            <PantallasTable role_Id={data.role_Id} />
          </div>
        );
      };

    const header = <Button icon={allExpanded ? 'pi pi-minus' : 'pi pi-plus'} label={allExpanded ? 'Cerrar Todo' : 'Mostrar Todo'} onClick={toggleAll} className="w-11rem" />;

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Roles</h5>
                    <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} responsiveLayout="scroll" rowExpansionTemplate={rowExpansionTemplate} dataKey="role_Id" header={header}>
                        <Column expander style={{ width: '3em' }} />
                        <Column field="role_Id" header="ID" sortable />
                        <Column field="role_Nombre" header="Nombre" sortable />
                        <Column header="Acciones" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default TableDemo;
