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


const Clientes = () => {
    let emptyClientes = {

        clie_Id: 0,
        clie_Nombres: "",
        clie_Apellidos: "",
        clie_RTN: "",
        clie_Estado: true,
        clie_UserCrea: 0,
        clie_FechaCrea: "",
        clie_UserModifica: null,
        clie_FechaModifica: null

    };

    const [clientes, setClientes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {

        axios.get(Global.url + 'Cliente/List')
            .then(response => {
                setClientes(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [clientes]);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
 <img src='https://www.pngkit.com/png/full/358-3586266_clientes-png.png' width={'100px'}></img>

            </React.Fragment>
        );
    };

    const filterByNameOrAddress = (value, data) => {
        if (!value) {
            return data;
        }
        return data.filter(
            (item) =>
                item.clie_Nombres.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                item.clie_Apellidos.toLowerCase().indexOf(value.toLowerCase()) !== -1 
        );
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" style={{backgroundImage: 'linear-gradient(to right, #fff, #FFF84C, #FFA600)',color: '#fff'}}   center={<h2 className="m-0" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Clientes</h2>} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        value={filterByNameOrAddress(globalFilter, clientes)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No hay Clientes."
                        header={header}
                        responsiveLayout="scroll"
                    >



                        <Column field="clie_Id" header="ID" sortable />
                        <Column field="clie_Nombres" header="Nombres" sortable />
                        <Column field="clie_Apellidos" header="Apellidos" sortable />
                        <Column field="clie_RTN" header="RTN" sortable />

                    </DataTable>
                    
                    </div>
                    </div>
                    </div>
    );
}

export default Clientes;
