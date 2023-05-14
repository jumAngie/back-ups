import { useEffect, useRef,useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Global from '../../api/Global';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const PantallasTable = ({ role_Id }) => {
  const [pantallas, setPantallas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const toast = useRef(null);

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

  const fetchData = () => {
    axios
      .get(Global.url + `RolPantallas/ListarPantallas/${role_Id}`)
      .then((response) => {
        setPantallas(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
};

const confirmDeleteProduct = (products) => {
    setProducts(products);
    setDeleteProductDialog(true);
};

const deleteProduct = () => {
    let _products = products;
    console.log(_products);
    setProducts(_products);

    if(_products.ropa_Id != "" ){

        
        axios.post(Global.url + 'RolPantallas/BorrarPantalla', products)
        .then((response) => {
             if(response.data.codeStatus == 1){
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Pantalla eliminada', life: 3000 });
                fetchData();
                setDeleteProductDialog(false);
            }

        })
        .catch((error) => {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la pantalla.', life: 1500 });

        });

          
    }
};

const deleteProductDialogFooter = (
    <>
        <Button label="No" severity='danger' icon="pi pi-times" text onClick={hideDeleteProductDialog} />
        <Button label="Si" severity='warning' icon="pi pi-check" text onClick={deleteProduct} />
    </>
);

  const actionBodyTemplate = (rowData) => {
    return (
        <>
           <Button
        type="button"
        label="Quitar Acceso"
        severity="danger"
        className="ml-4"
        icon="pi pi-trash"
        onClick={() => confirmDeleteProduct(rowData)}
      />
        </>
    );
};

  return (
    <div className="grid">
       <div className="col-12">
       <Toast ref={toast} />
    <DataTable value={pantallas} responsiveLayout="scroll">
      <Column field="ropa_Pantalla" header="Id" sortable></Column>
      <Column field="panta_Descripcion" header="Nombre" sortable></Column>
      <Column header="Acción" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
    </DataTable>
    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
    <div className="flex align-items-center justify-content-center">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        {products && (
            <span>
                ¿Está seguro de eliminar esta pantalla de este rol?
            </span>
        )}
    </div>
</Dialog>
</div>
</div>
  );
};

export default PantallasTable;
