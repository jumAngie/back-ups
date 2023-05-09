import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import Select from "react-select";
import { Button } from "primereact/button";

import Global from "../../api/Global";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";

const EditEmpleado = () => {

  const router = useRouter();

 const id = router.query.id;
 
  let EmpleadoModel = {
    empl_Id: null,
    empl_DNI: "",
    empl_Nombre: "",
    empl_Apellidos: "",
    empl_Sexo: "",
    empl_Estadocivil: null,
    muni_depId: null,
    empl_Muni: null,
    empl_Cargo: null,
    empl_Sucursal: null,
    empl_DireccionExacta: "",
  };
  
  const [emple, setemple] = useState(EmpleadoModel);
 
  

   const [ddlDisabled, setDdlDisabled] = useState(true);

  //Valores de mis Inputs
   const [empl_Id, setempl_Id] = useState("");
   const [empl_DNI, setempl_DNI] = useState("");
  const [empl_Nombre, setempl_Nombre] = useState("");
  const [empl_Apellidos, setempl_Apellidos] = useState("");
  const [empl_Sexo, setempl_Sexo] = useState("");
  const [empl_FechaNacimiento, setempl_FechaNacimiento] = useState("");
  const [empl_Telefono, setempl_Telefono] = useState("");
  const [empl_DireccionExacta, setempl_DireccionExacta] = useState("");
  const [empl_UsuarioCreador, setempl_UsuarioCreador] = useState("");

  //Se asigna los datos al dropDown
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [estadoCivilSeleccionado, setEstadoCivilSeleccionado] = useState(null);

  //ddl de cargo
  const [cargoOptions, setCargoOptions] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState(null);

  //ddl de sucursal
  const [sucursalOptions, setSucursalOptions] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  //ddl de Departamento
  const [DepartamentoOptions, setDepartamentoOptions] = useState([]);
  const [selectedDepartamento, setselectedDepartamento] = useState(null);

  //ddl de Municipio
  const [MunicipioOptions, setMunicipioOptions] = useState([]);
  const [selectedMunicipio, setselectedMunicipio] = useState(null);
  //radio buton

  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);
   useEffect(() => {

    axios.get(Global.url + `Empleado/Find/${id}`)
    .then(response => {
      const data = response;

        setempl_Id(response.data.empl_Id)
        setempl_DNI(response.data.empl_DNI)
        setempl_Nombre(response.data.empl_Nombre)
        setempl_Apellidos(response.data.empl_Apellidos)
        setempl_Sexo(response.data.empl_Sexo)
        var fecha = new Date(response.data.empl_FechaNacimiento)

        setempl_FechaNacimiento(fecha)
        setempl_Telefono(response.data.empl_Telefono)
        setempl_DireccionExacta(response.data.empl_DireccionExacta)
        setempl_UsuarioCreador(response.data.empl_UsuarioModificado)
        setEstadoCivilSeleccionado(response.data.empl_Estadocivil)
        setSelectedCargo(response.data.empl_Cargo)
        setSelectedSucursal(response.data.empl_Sucursal)
        setselectedDepartamento(response.data.muni_depId)
        ddlMunicipio(response.data.muni_depId, response.data.empl_Muni);
         
       
     })
  .catch(error => console.error(error));

}, []);

  useEffect(() => {
    //Sucursal DDL
    fetch(Global.url + "Sucursal/List")
      .then((response) => response.json())
      .then((data) =>
        setSucursalOptions(
          data.data.map((s) => ({ value: s.sucu_Id, label: s.sucu_Nombre }))
        )
      )
      .catch((error) => console.error(error));

    //Estado Cuvil DDL
    fetch(Global.url + "EstadoCivil/List")
      .then((response) => response.json())
      .then((data) =>
        setEstadosCiviles(
          data.data.map((e) => ({
            value: e.estc_Id,
            label: e.estc_Descripcion,
          }))
        )
      )
      .catch((error) => console.error(error));

    //Cargo DDL
    fetch(Global.url + "Cargo/List")
      .then((response) => response.json())
      .then((data) =>
        setCargoOptions(
          data.data.map((c) => ({ value: c.carg_Id, label: c.carg_Cargo }))
        )
      )
      .catch((error) => console.error(error));

    //Departamento DDL
    fetch(Global.url + "Departamento/List")
      .then((response) => response.json())
      .then((data) =>
        setDepartamentoOptions(
          data.map((d) => ({ value: d.dept_Id, label: d.dept_Descripcion }))
        )
      )
      .catch((error) => console.error(error));
  }, []);

  const onDNIChange = (e) => {
    const value = e.target.value;
    const regex = /^(\d{4})-(\d{4})-(\d{5})$/;
    if (regex.test(value)) {
      setempl_DNI(value);
    } else {
      const formattedValue = value
        .replace(/[^0-9]/g, "")
        .replace(/(\d{4})(\d{4})(\d{5})/, "$1-$2-$3");
      setempl_DNI(formattedValue);
      e.target.value = formattedValue;
    }
  };

  const onEstadoCivilChange = (e, empl_Estadocivil) => {

    setEstadoCivilSeleccionado(e.value);

  };

  function ddlMunicipio(departamento_Id,Muncipio_Id){
     var codigo;
     console.log(departamento_Id)
    axios
        .get(`${Global.url}Municipio/FindState/${departamento_Id}`) // Usa el nuevo valor seleccionado
        .then((response) => {
            codigo = response.empl_Muni;
          setMunicipioOptions(
            response.data.map((c) => ({
              value: c.muni_Id,
              label: c.muni_Descripcion,
            }))
          );
          setDdlDisabled(false);
          console.log("dentro en el departamento")
          
        })
        .catch((error) => {
          console.error(error);
          console.log("Error en el servidor");
        });
        
        setselectedMunicipio(Muncipio_Id);
  }

  const onDepartamentoChange = (e) => {
    setselectedDepartamento(e.value);
    console.log(e.value);

    if (e.value != 0 && e.value != null) {
      // Verifica el nuevo valor seleccionado
      ddlMunicipio(e.value);
    } else {
      setMunicipioOptions([]); // si no hay valor seleccionado, vacía las opciones del dropdown
      setDdlDisabled(true); // deshabilita dropdown
    }
  };

  
  
  const onMunicipioChange = (e) => {
    setselectedMunicipio(e.value);
  };

  const onCargoChange = (e) => {
    var empl_Cargo;
    let _Empleado = { ...empleado };
    _Empleado[`${empl_Cargo}`] = e.value;
    setSelectedCargo(e.value);

    setEmpleado(_Empleado);
  };

  const onSucursalChange = (e) => {
 
    setSelectedSucursal(e.value);

 
  };

  const saveProduct = () => {
    setSubmitted(true);
    setempl_UsuarioCreador(1);
    var parameters = {
      empl_Id:empl_Id,
      empl_DNI: empl_DNI,
      empl_Nombre: empl_Nombre,
      empl_Apellidos: empl_Apellidos,
      empl_Sexo: empl_Sexo,
      muni_depId: selectedDepartamento,
      empl_Muni: selectedMunicipio,
      empl_Telefono:empl_Telefono,
      empl_FechaNacimiento: empl_FechaNacimiento,
      empl_Estadocivil: estadoCivilSeleccionado,
      empl_Cargo: selectedCargo,
      empl_Sucursal: selectedSucursal,
      empl_DireccionExacta: empl_DireccionExacta,
      empl_UsuarioModificado: 1,
    };

    let parametrosValidos = true;

    Object.keys(parameters).forEach((key) => {
      if (!parameters[key]) {
        console.log(`Falta el parametro ${key}`);
        parametrosValidos = false;
      }
    });

    if (parametrosValidos) {
      console.log(parameters);
      axios
        .put(Global.url + `Empleado/Update`, parameters)
        .then((response) => {
          if (response.data.codeStatus == 1) {
            toast.current.show({
              severity: "success",
              summary: "Felicidades",
              detail: "Editaste un registro",
              life: 1500,
            });

            router.push("/uikit/Empleados");
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Vuelva Ingresar los datos Nuevamente",
            life: 1500,
          });
        });
    }
  };

  return (
    <div className="card">
      {" "}
      <Toast ref={toast} />
      <h5>Editar Empleado</h5>
      <div className="grid p-fluid">
        <div className="col-6">
          <div className="field">
            <label htmlFor="DNI">DNI</label>
            <InputText
              id="inputnumber"
              onChange={onDNIChange}
              maxLength={13}
              value={empl_DNI}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !empl_DNI,
              })}
            />

            {submitted && !empl_DNI && (
              <small className="p-invalid">EL DNI es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Nombre">Nombre</label>
            <InputText
              type="text"
              id="Nombre"
              value={empl_Nombre}
              onChange={(e) => setempl_Nombre(e.target.value)}
              autoFocus
              className={classNames({
                "p-invalid": submitted && !empl_Nombre,
              })}
            />
            {submitted && !empl_Nombre && (
              <small className="p-invalid">EL Nombre es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Apellido">Apellido</label>
            <InputText
              type="text"
              id="Apellido"
              value={empl_Apellidos}
              onChange={(e) => setempl_Apellidos(e.target.value)}
              autoFocus
              className={classNames({
                "p-invalid": submitted && !empl_Apellidos,
              })}
            />
            {submitted && !empl_Apellidos && (
              <small className="p-invalid">EL Apellido es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field ">
            <label htmlFor="Sexo">Sexo</label>
            <div className="grid">
              <div className="col-12 md:col-4">
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="option1"
                    name="option"
                    value="M"
                    checked={empl_Sexo === "Masculino"}
                    onChange={(e) => setempl_Sexo(e.target.value)}
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !empl_Sexo,
                    })}
                  />
                  <label htmlFor="option1">Masculino</label>
                </div>
              </div>
              <div className="col-12 md:col-4">
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="option2"
                    name="option"
                    value="F"
                    checked={empl_Sexo === "Femenino"}
                    onChange={(e) => setempl_Sexo(e.target.value)}
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !empl_Sexo,
                    })}
                  />
                  <label htmlFor="option2">Femenino</label>
                </div>
              </div>
            </div>
            {submitted && !empl_Sexo && (
              <small className="p-invalid">EL Sexo es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="empl_FechaNacimiento">Fecha de Nacimiento</label>
            <Calendar
              id="empl_FechaNacimiento"
              value={empl_FechaNacimiento}
              showIcon
              showButtonBar
              onChange={(e) => setempl_FechaNacimiento(e.target.value)}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !empl_FechaNacimiento,
              })}
            />
            {submitted && !empl_FechaNacimiento && (
              <small className="p-invalid">
                Fecha de Nacimiento es requerido.
              </small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Numero">Numero De Telefono</label>
            <InputText
              id="empl_Telefono"
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^(\d{4})(\d{4})?$/;
                if (regex.test(value)) {
                  setempl_Telefono(value.replace(/(\d{4})(\d{4})/, "$1-$2"));
                } else {
                  e.target.value = value.replace(/[^0-9]/g, "").substring(0, 8);
                  setempl_Telefono(
                    e.target.value.replace(/(\d{4})(\d{4})/, "$1-$2")
                  );
                }
              }}
              maxLength={9}
              value={empl_Telefono}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !empl_Telefono,
              })}
            />

            {submitted && !empl_Telefono && (
              <small className="p-invalid">EL DNI es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="estadoCivil">Estado Civil</label>
            <Dropdown
              value={estadoCivilSeleccionado}
              onChange={onEstadoCivilChange}
              options={estadosCiviles}
              placeholder="Seleccionar"
              autoFocus
              className={classNames({
                "p-invalid": submitted && !estadoCivilSeleccionado,
              })}
            />
            {submitted && !estadoCivilSeleccionado && (
              <small className="p-invalid">EL Estado Civil es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Departamento">Departamento</label>
            <Dropdown
              value={selectedDepartamento}
              onChange={onDepartamentoChange}
              options={DepartamentoOptions || []} // inicialmente null, pero en renderizado, si es null usará el array vacío
              placeholder="Seleccionar"
              autoFocus
              className={classNames({
                "p-invalid": submitted && !selectedDepartamento,
              })}
            />
            {submitted && !selectedDepartamento && (
              <small className="p-invalid">EL Estado Civil es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Municipio">Municipio</label>
            <Dropdown
              value={selectedMunicipio}
              onChange={onMunicipioChange || []}
              options={MunicipioOptions}
              placeholder="Seleccionar"
              autoFocus
              className={classNames({
                "p-invalid": submitted && !selectedMunicipio,
              })}
              disabled={ddlDisabled} // agregar propiedad disabled
            />
            {submitted && !selectedMunicipio && (
              <small className="p-invalid">EL Municipio es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="cargo">Cargo</label>
            <Dropdown
              value={selectedCargo}
              onChange={onCargoChange}
              options={cargoOptions}
              placeholder="Seleccionar"
              autoFocus
              className={classNames({
                "p-invalid": submitted && !selectedCargo,
              })}
            />
            {submitted && !selectedCargo && (
              <small className="p-invalid">EL Cargo es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="sucursal">Sucursal</label>
            <Dropdown
              value={selectedSucursal}
              onChange={onSucursalChange}
              options={sucursalOptions}
              placeholder="Seleccionar"
              autoFocus
              className={classNames({
                "p-invalid": submitted && !selectedSucursal,
              })}
            />
            {submitted && !selectedSucursal && (
              <small className="p-invalid">La Sucursal es requerido.</small>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="field">
            <label htmlFor="Direccion">Direccion</label>
            <InputTextarea
              placeholder="Direccion Exacta"
              onChange={(e) => setempl_DireccionExacta(e.target.value)}
              autoResize
              value={empl_DireccionExacta}
              rows="3"
              cols="30"
              className={classNames({
                "p-invalid": submitted && !empl_DireccionExacta,
              })}
            />
            {submitted && !empl_DireccionExacta && (
              <small className="p-invalid">
                La DireccionExacta es requerido.
              </small>
            )}
          </div>
        </div>
      </div>
      <Button
        label="Canselar"
        severity="danger"
        icon="pi pi-times"
        onClick={() => router.push("/uikit/Empleados")}
      />
      <Button
        type="button"
        label="Save"
        severity="success"
        className="ml-4"
        icon="pi pi-check"
        onClick={saveProduct}
      />
    </div>
  );
};

export default EditEmpleado;
