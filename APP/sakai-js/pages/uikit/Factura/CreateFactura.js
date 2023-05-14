import React, { useEffect, useRef, useState } from "react";
import { Message } from "primereact/message";

import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import Global from "../../api/Global";
import { useRouter } from "next/router";
import Asientos from "./ascientos";

//Elementos de el formulario
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { ToggleButton } from "primereact/togglebutton";

import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

const CreateFactura = () => {
  const router = useRouter();
  const toast = useRef(null);

  const [Clie_Id, setClie_Id] = useState(null);
  const [Clie_RTN, setClie_RTN] = useState("");
  const [Clien_Nombre, setClien_Nombre] = useState("");
  const [Clie_Apellido, setClie_Apellido] = useState("");
  const [Fact_Id, setFact_Id] = useState(null);

  //ddl de Proyeccion
  const [ProyeccionOptions, setProyeccionOptions] = useState([]);
  const [selectedProyeccion, setSelectedProyeccion] = useState(null);

  //ddl de Cambo
  const [ComboOptions, setComboOptions] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [cantidadPorItem, setCantidadPorItem] = useState({});

  //ddl de CamboDetalle
  const [insumoOptions, setInsumoOptions] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [cantidadPorInsumo, setCantidadPorInsumo] = useState({});

  //ddl de Metodo De pagp
  const [MetodoPagoOptions, setMetodoPagoOptions] = useState([]);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);

  //Desabilito el boton de los asinetos
  const [ddlDisabled, setDdlDisabled] = useState(true);
  const [RTNDisabled, setRTNDisabled] = useState(false);
  const [NameDisabled, setNameDisabled] = useState(false);
  const [ApellidoDisabled, setApellidoDisabled] = useState(false);

  const [toggleInsumoValue, setToggleInsumoValue] = useState(false);
  const [labelVisible1, setLabelVisible1] = useState(false);
  const [labelVisible2, setLabelVisible2] = useState(false);

  //validar combo
  const [validarComida, setvalidarComida] = useState(false);
  const [validarCombo, setvalidarCombo] = useState(false);
  const [validarInsumo, setvalidarInsumo] = useState(false);

  //Sala
  const [Sala, setSala] = useState(null);
  const [EnviarAsientos, SetEnviarAsientos] = useState(false);

  //boton de enviar
  const [submitted, setSubmitted] = useState(false);
  const [AsientosCantidad, setAsientosCantidad] = useState(null);

  //traigo datos
  useEffect(() => {
    //Proyeccion  DDL
    fetch(Global.url + "Proyeccion/List")
      .then((response) => response.json())
      .then((data) => {
        setProyeccionOptions(
          data.data.map((s) => ({
            value: s.proy_Id,
            label:
              s.peli_Titulo +
              " - Sala " +
              s.sala_Butacas +
              " - " +
              s.casa_Categoria +
              " - " +
              s.hor_HoraInicio,
            proy_Sala: s.proy_Sala,
          }))
        );
      })
      .catch((error) => console.error(error));

    fetch(Global.url + "Combos/List")
      .then((response) => response.json())
      .then((data) => {
        setComboOptions(
          data.data.map((c) => ({
            value: c.comb_Id,
            label: c.comb_Descripcion,
          }))
        );
      })
      .catch((error) => console.error(error));

    //Lista de Insumos
    fetch(Global.url + "Insumo/List")
      .then((response) => response.json())
      .then((data) => {
        setInsumoOptions(
          data.data.map((i) => ({
            value: i.insu_Id,
            label: i.insu_Descripcion,
          }))
        );
      })
      .catch((error) => console.error(error));

    fetch(Global.url + "MetodoPago/List")
      .then((response) => response.json())
      .then((data) => {
        setMetodoPagoOptions(
          data.data.map((m) => ({
            value: m.pago_Id,
            label: m.pago_Descripcion,
          }))
        );
      })
      .catch((error) => console.error(error));
  }, []);

  //Seteo Datos
  const onProyeccionChange = (e) => {
    const { value, proy_Sala } = ProyeccionOptions.find(
      (option) => option.value === e.value
    );

    setSelectedProyeccion(value);
    setSala(proy_Sala);

    //Habilito el boton
    setDdlDisabled(false); // deshabilita dropdown
  };

  const onMetodoPagoChange = (e) => {
    setSelectedMetodoPago(e.value);
  };

  //const onComboChange = (e) => {
  //  setSelectedCombo(e.value);
  //};

  //Filtra las peliculas
  const onProyeccionFilter = (event) => {
    setTimeout(() => {
      let results = ProyeccionOptions.filter((option) =>
        option.label.toLowerCase()
      );
    }, 250);
  };

  const [cantidadPorItemSeleccionado, setCantidadPorItemSeleccionado] =
    useState({});

  //imput de cantidad del ddl Combo
  const valor = (e) => {
    setSelectedCombo(e.value);

    // Obtiene la cantidad para la opción seleccionada actualmente
    const optionsWithCantidad = ComboOptions.map((option) => ({
      ...option,
      cantidad: cantidadPorItem[option.value] || "",
    }));

    // Actualiza el estado de cantidadPorItemSeleccionado
    setCantidadPorItemSeleccionado(cantidadPorItem);

    if (selectedCombo != null) {
      // Si se deselecciona una opción, limpiar la cantidad correspondiente
      selectedCombo.forEach((value) => {
        if (!e.value.includes(value)) {
          limpiarCantidad(value);
        }
      });
    }
  };

  const limpiarCantidad = (value) => {
    setCantidadPorItem({
      ...cantidadPorItem,
      [value]: "",
    });
  };

  const optionsWithCantidad = ComboOptions.map((option) => ({
    ...option,

    cantidad: cantidadPorItem[option.value] || "",
  }));

  const itemTemplate = (option) => (
    <div className="multiselect-item">
      <span>{option.label}</span>
      <br></br>
      <InputNumber
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Cantidad"
        value={option.cantidad}
        onChange={(e) => {
          setCantidadPorItem({
            ...cantidadPorItem,
            [option.value]: e.value,
          });
        }}
        min="0"
        step="1"
      />
    </div>
  );
  //imput de cantidad del ddl

  const limpiarCantidad2 = (value) => {
    setCantidadPorInsumo({
      ...cantidadPorInsumo,
      [value]: "",
    });
  };
  const valorInsumo = (e) => {
    setSelectedInsumo(e.value);

    // Obtiene la cantidad para la opción seleccionada actualmente
    const optionsWithCantidad2 = insumoOptions.map((option) => ({
      ...option,
      cantidad: cantidadPorInsumo[option.value] || "",
    }));

    if (selectedInsumo != null) {
      // Si se deselecciona una opción, limpiar la cantidad correspondiente
      selectedInsumo.forEach((value) => {
        if (!e.value.includes(value)) {
          limpiarCantidad2(value);
        }
      });
    }
  };

  const optionsWithCantidad2 = insumoOptions.map((option) => ({
    ...option,
    cantidad: cantidadPorInsumo[option.value] || "",
  }));

  const itemTemplate2 = (option) => (
    <div className="multiselect-item">
      <span>{option.label}</span>
      <br></br>
      <InputNumber
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Cantidad"
        value={option.cantidad}
        onChange={(e) => {
          setCantidadPorInsumo({
            ...cantidadPorInsumo,
            [option.value]: e.value,
          });
        }}
        min="0"
        step="1"
      />
    </div>
  );
  //imput de cantidad del ddl

  //envio los datos
  const SubmitValues = async () => {
    const cantidadFiltrada = Object.entries(cantidadPorItem)
      .filter(([_, valor]) => valor !== "")
      .map(([clave, valor]) => ({
        id: parseInt(clave),
        cantidad: parseInt(valor),
      }));

    const cantidadFiltradaDetalle = Object.entries(cantidadPorInsumo)
      .filter(([_, valor]) => valor !== "")
      .map(([clave, valor]) => ({
        id: parseInt(clave),
        cantidad: parseInt(valor),
      }));

    if (validarComida == true) {

      if(cantidadFiltrada.length !== 0 || cantidadFiltradaDetalle.length !== 0 ){
        setvalidarComida(false);
      }else{
        toast.current.show({
          severity: "warn",
          summary: "Cuidado",
          detail: "Aun no has ingresado un insumo ",
          life: 3000,
        });
      }

    } else if (validarComida == false) {
      //setvalidarCombo(false);
      //setvalidarInsumo(false);

      if (
        Clie_RTN.trim() !== "" &&
        Clien_Nombre.trim() !== "" &&
        Clie_Apellido.trim() !== "" &&
        (selectedProyeccion !== null || labelVisible1 == true) &&
        selectedMetodoPago !== null &&
        (parseInt(localStorage.getItem("CantidadAsiento")) > 0 ||
          validarComida == false)
      ) {
        setAsientosCantidad(parseInt(localStorage.getItem("CantidadAsiento")));
        console.log(AsientosCantidad);
        //============================== INSERT DE CLIENTE ====================================//
        var ClientesParametros = {
          clie_Id: 0,
          clie_Nombres: Clien_Nombre,
          clie_Apellidos: Clie_Apellido,
          clie_RTN: Clie_RTN,
          clie_UserCrea: 1,
        };

        const response = await axios.post(
          Global.url + `Cliente/Insert`,
          ClientesParametros
        );
        if (response.data.code == 200) {
          var idC = parseInt(response.data.data.messageStatus);

          //============================== INSERT DE FATURA =====================================//
          if (idC != null || idC != undefined) {
            var FacturaParameter = {
              fact_Id: 0,
              fact_Cliente: idC,
              fact_UsuCrea: 1,
            };

            const response = await axios.post(
              Global.url + `Factura/Insert`,
              FacturaParameter
            );
            if (response.data.code == 200) {
              var idF = parseInt(response.data.data.messageStatus);
              //========================== INSERT DE FATURA DETALLE =================================//
              setFact_Id(idF);
              SetEnviarAsientos(true);
              if (idF != null || idF != undefined) {
                var FacturaDetalle = {
                  fade_Id: 0,
                  fade_Factura: idF,
                  fade_Proyeccion: selectedProyeccion,
                  fade_Tickets: parseInt(
                    localStorage.getItem("CantidadAsiento")
                  ),
                  fade_ContenidoComboS: cantidadFiltrada,
                  fade_ContenidoInsumoS: cantidadFiltradaDetalle,
                  fade_Pago: selectedMetodoPago,
                  fade_Total: 1,
                  fade_UsuCrea: 1,
                };
                console.log(FacturaDetalle);

                try {
                  const response = await axios.post(
                    Global.url + `FacturaDetalles/Insert`,
                    FacturaDetalle
                  );

                  if (response.data.code == 200) {
                    toast.current.show({
                      severity: "success",
                      summary: "Felicidades",
                      detail: "Editaste un registro",
                      life: 1500,
                    });
                  }
                  localStorage.clear("CantidadAsiento");
                  setTimeout(() => {
                    router.push("/uikit/Factura");
                  }, 1500);

                  idC = null;
                  idF = null;
                } catch (error) {
                  toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Vuelva Ingresar los datos Nuevamente",
                    life: 1500,
                  });
                }

                console.log("Están llenos");
              } else {
                setSubmitted(true);
              }
            }
          }
        }
      } else {
        console.log("Algo anda mal en factura detalle");
        setSubmitted(true);
      }
    }
  };
  //envio los datos

  const [toggleValue, setToggleValue] = useState(false);
  const UsuarioFinal = (e) => {
    var final = e.value;
    console.log(final);
    setToggleValue(final);
    if (final) {
      setClie_RTN("1234-1234-12345");
      setClien_Nombre("Consumidor");
      setClie_Apellido("Final");
      setRTNDisabled(true);
      setNameDisabled(true);
      setApellidoDisabled(true);
    } else if (!final) {
      setClie_RTN("");
      setClien_Nombre("");
      setClie_Apellido("");
      setRTNDisabled(false);
      setNameDisabled(false);
      setApellidoDisabled(false);
    }
  };

  const SoloInsumo = (e) => {
    var Insumo = e.value;
    setToggleInsumoValue(Insumo);
    console.log(validarComida);
    if (Insumo) {
      setLabelVisible2(true);
      setLabelVisible1(true);
      setvalidarComida(true);
    } else {
      setvalidarComida(true);
      setLabelVisible1(false);
      setLabelVisible2(false);
    }
  };

  return (
    <div className="card">
      <Toast ref={toast} />

      <h1>Crear Factura</h1>
      <div className="grid p-fluid">
        <div className="col-6">
          <div className="field">
            <label htmlFor="Usuario">Usuario FInal</label>
            <br></br>
            <ToggleButton
              checked={toggleValue}
              onChange={UsuarioFinal}
              onLabel="SI"
              offLabel="NO"
              onStyle={{ backgroundColor: "darkgreen" }}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Usuario">Solo Insumo</label>
            <br></br>
            <ToggleButton
              checked={toggleInsumoValue}
              onChange={SoloInsumo}
              onLabel="SI"
              offLabel="NO"
              onStyle={{ backgroundColor: "darkgreen" }}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="RTN">RTN</label>

            <InputMask
              disabled={RTNDisabled}
              id="inputmask"
              value={Clie_RTN}
              mask="9999-9999-99999"
              onChange={(e) => setClie_RTN(e.value)}
              className={classNames({
                "p-invalid": submitted && !Clie_RTN,
              })}
            ></InputMask>

            {submitted && !Clie_RTN && (
              <small className="p-invalid">EL DNI es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Nombre">Nombre</label>
            <InputText
              disabled={NameDisabled}
              type="text"
              id="Nombre"
              value={Clien_Nombre}
              onChange={(e) => setClien_Nombre(e.target.value)}
              className={classNames({
                "p-invalid": submitted && !Clien_Nombre,
              })}
            />
            {submitted && !Clien_Nombre && (
              <small className="p-invalid">EL Nombre es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Apellido">Apellido</label>
            <InputText
              disabled={ApellidoDisabled}
              value={Clie_Apellido}
              type="text"
              id="Apellido"
              onChange={(e) => setClie_Apellido(e.target.value)}
              className={classNames({
                "p-invalid": submitted && !Clie_Apellido,
              })}
            />
            {submitted && !Clie_Apellido && (
              <small className="p-invalid">EL Apellido es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Funciones">Funciones</label>
            <Dropdown
              disabled={labelVisible1}
              value={selectedProyeccion}
              onChange={onProyeccionChange}
              options={ProyeccionOptions}
              placeholder="Seleccionar"
              filter
              filterPlaceholder="Buscar"
              onFilter={(e) => onProyeccionFilter(e, ProyeccionOptions)}
              className={classNames({
                "p-invalid": !labelVisible1 && submitted && !selectedProyeccion,
              })}
            />
            {!labelVisible1 && submitted && !selectedProyeccion && (
              <small className="p-invalid">EL Funciones es requerido.</small>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Funciones">Asientos</label>
            <Asientos
              salaId={Sala}
              labelVisible2={labelVisible2}
              ddlDisabled={ddlDisabled}
              EnviarAsientos={EnviarAsientos}
              fact_Id={Fact_Id}
              submitted={submitted}
              Proyeccion_Id={selectedProyeccion}
            />
          </div>
          {submitted && !AsientosCantidad && (
            <small className="p-invalid">
              Tiene que seleccionar un Asiento.
            </small>
          )}
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Combos">Combos</label>
            <MultiSelect
              id="multiselect"
              filter
              value={selectedCombo}
              onChange={valor}
              options={optionsWithCantidad}
              placeholder="Seleccione un Combo"
              optionLabel="label"
              itemTemplate={itemTemplate}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Extra">Extra</label>
            <MultiSelect
              id="multiselect"
              filter
              value={selectedInsumo}
              onChange={valorInsumo}
              options={optionsWithCantidad2}
              placeholder="Seleccione un Insumo"
              optionLabel="label"
              itemTemplate={itemTemplate2}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="field">
            <label htmlFor="Pagp">Metodo de pago</label>
            <Dropdown
              value={selectedMetodoPago}
              onChange={onMetodoPagoChange}
              options={MetodoPagoOptions}
              placeholder="Seleccionar"
              filter
              filterPlaceholder="Buscar"
              className={classNames({
                "p-invalid": submitted && !selectedMetodoPago,
              })}
            />
            {submitted && !selectedMetodoPago && (
              <small className="p-invalid">
                EL Metodo de pago es requerido.
              </small>
            )}
          </div>
        </div>
        <Button label="Enviar" icon="pi pi-check" text onClick={SubmitValues} />
      </div>
    </div>
  );
};

export default CreateFactura;