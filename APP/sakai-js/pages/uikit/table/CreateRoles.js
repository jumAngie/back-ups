import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import axios from "axios";
import Global from "../../api/Global";
import { PickList } from 'primereact/picklist';
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";

const CreateRoles = () => {
    let RolModel = {
        role_Nombre: "",
        role_UsuCreacion: null
      };



const [roles, setRoles] = useState(RolModel);
const [submitted, setSubmitted] = useState(false);
const router = useRouter();
const toast = useRef(null);
const [picklistSourceValue, setPicklistSourceValue] = useState();
const [picklistTargetValue, setPicklistTargetValue] = useState([]);
const [listValue, setListValue] = useState([]);

useEffect(() => {
    localStorage.setItem('targetValue', JSON.stringify(picklistTargetValue));
  }, [picklistTargetValue]);
useEffect(() => { 
    async function fetchPantallas() {
      try {
        const response = await fetch(Global.url + 'Pantallas/List');
        const data = await response.json();
        const formattedData = data.data.map(item => ({
          label: item.panta_Descripcion,
          value: item.panta_Id
        }));
        setPicklistSourceValue(formattedData);
      } catch(error) {
        console.error(error);
      }
    }
  
    fetchPantallas();
  }, []);
  
const role_NombreChange = (e, role_Nombre) => {
    const val = (e.target && e.target.value) || '';
    let _Roles = { ...roles };
    _Roles[`${role_Nombre}`] = val;

    setRoles(_Roles);
};

const pantallasIds = picklistTargetValue.map((pantalla) => pantalla.value);
console.log(pantallasIds);


const handleSubmit = async () => {
    try {
         if(!roles.role_Nombre || picklistTargetValue.length === 0)
         {
            if(!roles.role_Nombre)
            {
                var mensaje = "La Descripción es obligatoria."
            }
            if(picklistTargetValue.length === 0)
            {
                if (mensaje === '' || mensaje === undefined)
                {
                    var mensaje = "Debe seleccionar al menos una pantalla."
                }
                else{
                    mensaje = "La Descripcion es obligatorio y debe seleccionar al menos una Pantalla"
                } 
            }
            toast.current.show({ 
                severity: 'error', 
                summary: 'Campos Vacíos', 
                detail: mensaje, 
                life: 3000 });
         }
         else
         {
            roles.role_UsuCreacion = 1; 
      console.log(roles);
      const response = await axios.post(Global.url + 'Roles/Insert', roles);
      var codeStatus = response.data.data.codeStatus;
  
      if (response.data.data.codeStatus !== 0) {
        const roleId = response.data.data.codeStatus;
        console.log(roleId);
        // Enviar petición para cada pantalla seleccionada en el picklist
        picklistTargetValue.forEach(async (pantalla) => {
          await axios.post(Global.url + 'RolPantallas/Insert', {
            ropa_Rol: roleId,
            ropa_Pantalla: pantalla.value,
            ropa_UserCrea: 1
          });
        });
  
        toast.current.show({ severity: 'success', summary: 'Rol Creado', detail: 'Se ha creado el rol correctamente.', life: 3000 });
        setRoles(RolModel);
        setSubmitted(false);
        setTimeout(() => {
          router.push('/uikit/table');
        }, 1002);
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al crear el rol.', life: 3000 });
      }
         }
      
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al crear el rol.', life: 3000 });
    }
  };
  


return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
            <div className="card-header">
            <Toast ref={toast} />
               <center><h2>Crear Rol</h2></center>
            </div>
            <label htmlFor="name">Descripción: </label>
            <div className="formgrid grid">
        <div className="field col-12">
            <InputText id="name" value={roles.role_Nombre} autoFocus onChange={(e) => role_NombreChange(e, 'role_Nombre')} required className={classNames({ 'p-invalid': submitted && !roles.role_Nombre})} />
            {submitted && !roles.role_Nombre && <small className="p-invalid">La descripción es requerida.</small>}
          </div>
          </div>
          <br></br>
          <div className="card">
            <center>
              <h5>Listado de Pantallas</h5>
            </center>
            <PickList
              source={picklistSourceValue || []}
              target={picklistTargetValue}
              sourceHeader="Pantallas"
              targetHeader="Selección"
              itemTemplate={(item) => <div>{item.panta_Descripcion || item.label}</div>}
              onChange={(e) => {
                setPicklistSourceValue(e.source);
                setPicklistTargetValue(e.target);
              }}
              sourceStyle={{ height: '200px' }}
              targetStyle={{ height: '200px' }}
            ></PickList>
          </div>
          <center><Button label="Guardar" icon="pi pi-check" severity="warning" className="mr-2" onClick={handleSubmit} />
          <Button label="Cancelar" icon="pi pi-times" severity="danger" className="mr-2" onClick={() => router.push('/uikit/table')}  /></center>
        </div>
      </div>
    </div>
  );
  
  

};
export default CreateRoles;