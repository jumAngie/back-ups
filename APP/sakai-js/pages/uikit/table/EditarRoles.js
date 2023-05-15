import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { PickList } from 'primereact/picklist';
import { Button } from "primereact/button";
import Global from "../../api/Global";
import axios from "axios";


const EditarRoles = () => {
    const router = useRouter();
    const id = router.query.id;
    const role_Name = router.query.nombre;
    console.log(id, role_Name);

    let RolModel = {
        role_Id: id,
        role_Nombre: role_Name,
        role_UsuModificacion: null
      };

        const [roles, setRoles] = useState(RolModel);
        const [submitted, setSubmitted] = useState(false);
        const toast = useRef(null);
        const [picklistSourceValue, setPicklistSourceValue] = useState();
        const [picklistTargetValue, setPicklistTargetValue] = useState([]);
        const [listValue, setListValue] = useState([]);

        useEffect(()=>{
          if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
              router.push('/auth/login');
          }
          
      }, [])

        useEffect(() => {
            localStorage.setItem('targetValue', JSON.stringify(picklistTargetValue));
          }, [picklistTargetValue]);

        useEffect(() => { 
            async function fetchPantallas() {
              try { 
                const response = await fetch(Global.url + `Pantallas/ListarPantallasNoAsociadas/${roles.role_Id}`);
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
                 if(!roles.role_Nombre)
                 {
                        var mensaje = "La Descripción es obligatoria."
                        toast.current.show({ 
                            severity: 'error', 
                            summary: 'Campos Vacíos', 
                            detail: mensaje, 
                            life: 3000 });
                 }
                 else
                 {
              roles.role_UsuModificacion = 1;
              var rol_Id = parseInt(roles.role_Id); 
              roles.role_Id = rol_Id;
              console.log(roles);
              const response = await axios.put(Global.url + 'Roles/Update', roles);
          
              if (response.data.codeStatus !== 0 && picklistTargetValue.length !== 0) {
                const roleId = roles.role_Id;
                console.log(roleId);
                // Enviar petición para cada pantalla seleccionada en el picklist
                picklistTargetValue.forEach(async (pantalla) => {
                  await axios.post(Global.url + 'RolPantallas/Insert', {
                    ropa_Rol: roleId,
                    ropa_Pantalla: pantalla.value,
                    ropa_UserCrea: 1
                  });
                });
          
                toast.current.show({ severity: 'success', summary: 'Rol Actualizado', detail: 'Se ha actualizado el rol correctamente.', life: 3000 });
                setTimeout(() => {
                  router.push('/uikit/table');
                }, 1002);
              } else {
                toast.current.show({ severity: 'success', summary: 'Rol Actualizado', detail: 'Se ha actualizado el rol correctamente.', life: 3000 });
                setTimeout(() => {
                    router.push('/uikit/table');
                  }, 990);
            }
                 }
              
            } catch (error) {
              console.error(error);
              toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al actualizar el rol.', life: 3000 });
            }
          };

        return(
            <div className="grid crud-demo">
            <div className="col-12">
                <div className='card'>
                <div className="card-header">
            <Toast ref={toast} />
               <center><h2>Editar Rol</h2></center>
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
          <center><Button label="Guardar" icon="pi pi-check" severity="warning" className="mr-2" onClick={handleSubmit}/>
          <Button label="Cancelar" icon="pi pi-times" severity="danger" className="mr-2"  onClick={() => router.push('/uikit/table')} /></center>
            </div>
                </div>
                </div>
        )
    
}

export default EditarRoles;