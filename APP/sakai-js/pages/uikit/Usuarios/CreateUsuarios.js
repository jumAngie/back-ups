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
import { classNames } from "primereact/utils";
import { ToggleButton } from "primereact/togglebutton";


const CrearUsuario = () => {
    let UsuarioModel = {
            user_Id: null,
            user_NombreUsuario: "",
            user_Contrasenia: "string",
            user_Empleado: null,
            user_Rol: null,
            user_EsAdmin: false,
            user_UsuarioCrea: null,
            user_UsuarioModifica: null
      };

        const [usuarios, setUsuarios] = useState(UsuarioModel);
        // ddl empleado
        const [empleadoOptions, setEmpleadoOptions] = useState([]);
        const [selectedEmpleado, setSelectedEmpleado] = useState(null);
        // ddl roles
        const [rolOptions, setRolOptions] = useState([]);
        const [rolDisabled, setRolDisabled] = useState(false);
        const [selectedRol, setSelectedRol] = useState(null);
        //
        const [submitted, setSubmitted] = useState(false);
        const [toggleValue, setToggleValue] = useState(false);
        const router = useRouter();
        const toast = useRef(null);

        // input values
        const [user_NombreUsuario, setUser_NombreUsuario] = useState("");
        const [user_Contraseña, setUser_Contraseña] = useState("");

        useEffect(()=>{
          if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
              router.push('/auth/login');
          }
          
      }, [])

        useEffect(() => {
            // ddl Empleado
            fetch(Global.url + "Empleado/EmpleSinUsuario")
              .then((response) => response.json())
              .then((data) =>
              setEmpleadoOptions(
                  data.data.map((s) => ({ value: s.empl_Id, label: s.empl_Nombre }))
                )
              )
              .catch((error) => console.error(error));

              fetch(Global.url + "Roles/List")
              .then((response) => response.json())
              .then((data) =>
              setRolOptions(
                  data.data.map((s) => ({ value: s.role_Id, label: s.role_Nombre }))
                )
              )
              .catch((error) => console.error(error));


            }, []);

            const onUsuarioChange = (e) => {
                var user_NombreUsuario;
                let _Usuario = { ...usuarios };
                _Usuario[`${user_NombreUsuario}`] = e.value;
            
                setUsuarios(_Usuario);
              };

              const onContraseñaChange = (e) => {
                var user_Contrasenia;
                let _Usuario = { ...usuarios };
                _Usuario[`${user_Contrasenia}`] = e.value;
            
                setUsuarios(_Usuario);
              };

              const onEmpleadoChange = (e, user_Empleado) => {
                const val = (e.target && e.target.value) || "nada";
            
                let _Usuario = { ...usuarios };
                _Usuario[`${user_Empleado}`] = val;
                setSelectedEmpleado(e.value);
            
                setUsuarios(_Usuario);
              };

              const onRolChange = (e, user_Rol) => {
                const val = (e.target && e.target.value) || "nada";
            
                let _Usuario = { ...usuarios };
                _Usuario[`${user_Rol}`] = val;
                setSelectedRol(e.value);
            
                setUsuarios(_Usuario);
              };
            
              const EsAdmin = (e) => {
                var final = e.value;
                setToggleValue(final);
                if (final === true) {
                  setRolDisabled(true);
                  setSelectedRol(null); // Establece el valor seleccionado como null
                } else if (final === false) {
                  setRolDisabled(false);
                  fetch(Global.url + "Roles/List")
                    .then((response) => response.json())
                    .then((data) =>
                      setRolOptions([
                        { value: null, label: "Seleccionar" }, // Agrega una opción adicional para "Seleccionar"
                        ...data.data.map((s) => ({
                          value: s.role_Id,
                          label: s.role_Nombre,
                        })),
                      ])
                    )
                    .catch((error) => console.error(error));
                }
              }              

              const guardarUsuario = () => {
                setSubmitted(true);
                if(!toggleValue && selectedRol === null)
                {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Si no es Administrador debe seleccionar un rol.",
                        life: 1500,
                      });
                }
                else
                {
                    var rolProvisional;

                    if (selectedRol === null)
                    {
                        rolProvisional = 1;
                    }
                    else
                    {
                        rolProvisional = selectedRol
                    }
                    var parameters = {
                        "user_Id": 0,
                        "user_NombreUsuario": user_NombreUsuario,
                        "user_Contrasenia": user_Contraseña,
                        "user_Empleado": selectedEmpleado,
                        "user_Rol":  rolProvisional,
                        "user_EsAdmin": toggleValue,
                        "user_UsuarioCrea": 1,
                        "user_UsuarioModifica": 0
                    };
                
                    let parametrosValidos = true;
                    const camposRequeridos = ["user_NombreUsuario", "user_Contrasenia", "user_Empleado"];
                    camposRequeridos.forEach((campo) => {
                        if (!parameters[campo]) {
                          console.log(`Falta el campo requerido ${campo}`);
                          parametrosValidos = false;
                      }
                    });
                
                    if (parametrosValidos) {
                      console.log(parameters);
                      axios
                        .post(Global.url + `Usuario/Insert`, parameters)
                        .then((response) => {
                          if (response.data.code == 200) {
                            toast.current.show({
                              severity: "success",
                              summary: "Felicidades",
                              detail: "Creaste un registro",
                              life: 1500,
                            });
                
                            setTimeout(() => {
                                router.push('/uikit/Usuarios');
                              }, 900);
                          }
                        })
                        .catch((error) => {
                          toast.current.show({
                            severity: "error",
                            summary: "Error",
                            detail: "Vuelva a ingresar los datos nuevamente",
                            life: 1500,
                          });
                        });
                    }
                  };
                }

                

        return (
            <div className="card">
               
              <Toast ref={toast} />
              <h5>Crear Usuario</h5>
              <div className="grid p-fluid">
            <div className="col-6">
            <div className="field">
                <label htmlFor="Usuario">Usuario</label>
            <InputText
            type="text"
              id="inputUsuario"
              onChange={(e) => setUser_NombreUsuario(e.target.value)}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !user_NombreUsuario,
              })}
            />
            {submitted && !user_NombreUsuario && (<small className="p-invalid">El Usuario es requerido.</small>
            )}
          </div>
        </div>
        
        <div className="col-6">
            <div className="field">
                <label htmlFor="Contraseña">Contraseña</label>
            <InputText
            type="text"
              id="inputContraseña"
              onChange={(e) => setUser_Contraseña(e.target.value)}
              required
              className={classNames({ "p-invalid": submitted && !user_Contraseña,
              })}
            />
            {submitted && !user_Contraseña && (<small className="p-invalid">El Usuario es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Empleado">Empleado</label>
            <Dropdown
              value={selectedEmpleado}
              onChange={onEmpleadoChange}
              options={empleadoOptions}
              placeholder="Seleccionar"
            
              className={classNames({
                "p-invalid": submitted && !selectedEmpleado,
              })}
            />
            {submitted && !selectedEmpleado && (
              <small className="p-invalid">El Empleado es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Rol">Rol</label>
            <Dropdown
             disabled={rolDisabled}
              value={selectedRol}
              onChange={onRolChange}
              options={rolOptions}
              placeholder="Seleccionar"
              required={!toggleValue}
              className={classNames({
              "p-invalid": submitted && !selectedRol && !toggleValue,
            })}
            />
            {submitted && !selectedRol && !toggleValue && (
            <small className="p-invalid">El Rol es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="field">
            <label htmlFor="esAdmin">Es Administrador</label>
            <ToggleButton
              checked={toggleValue}
              onChange={EsAdmin}
              onLabel="Sí"
              offLabel="No"
              onStyle={{ backgroundColor: "darkgreen" }}
            />
          </div>
        </div>
        </div>
        <br>
        </br>
        <center>
        <Button label="Enviar" icon="pi pi-check" severity="warning" className="mr-2" onClick={guardarUsuario} />
        <Button label="Cancelar" icon="pi pi-times" severity="danger" className="mr-2" onClick={() => router.push('/uikit/Usuarios')} />
        </center>
        </div>

           
        )
}

export default CrearUsuario;