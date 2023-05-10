import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Global from '../../api/Global';

const PantallasTable = ({ role_Id }) => {
  const [pantallas, setPantallas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(Global.url + `RolPantallas/ListarPantallas/${role_Id}`)
      .then(response => {
        setPantallas(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [role_Id]);

  if (loading) {
    return <p>Cargando...</p>;
  }
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
};
  const actionBodyTemplate = (rowData) => {
    return (
        <>
           <Button
        type="button"
        label="Quitar Acceso"
        severity="danger"
        className="ml-4"
        icon="pi pi-trash"
        //onclick
      />
        </>
    );
};

  return (
    <DataTable value={pantallas} responsiveLayout="scroll">
      <Column field="ropa_Pantalla" header="Id" sortable></Column>
      <Column field="panta_Descripcion" header="Nombre" sortable></Column>
      <Column header="Acción" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
    </DataTable>
  );
};

export default PantallasTable;
