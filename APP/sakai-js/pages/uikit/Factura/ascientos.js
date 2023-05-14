import React, { useEffect, useRef, useState } from "react";
//import "Asiento"
import Global from "../../api/Global";
import axios from "axios";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

const Asientos = ({ salaId, ddlDisabled, Proyeccion_Id, EnviarAsientos, fact_Id, labelVisible2,submitted }) => {
  const [asientos, setAsientos] = useState([]);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [selectedAsientos, setSelectedAsientos] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    if (salaId != null) {
      const fetchAsientos = async () => {
        try {
          const response = await axios.get(
            Global.url + `Proyeccion/Asientos/${salaId}`
          );
          const asientosData = response.data.data;
          console.log(asientosData);
          setAsientos(asientosData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAsientos();
    }
  }, [salaId]);

  const selectButtonValues = asientos.map((asiento) => ({
    name: asiento.asie_Code,
    value: asiento.asie_Id,
  }));

  const itemTemplate = (option) => {
    return <div style={{ padding: "28px" }}>{option.name}</div>;
  };

  //Stilo de los Asientos
  const asientoStyles = {
    width: "calc(10% - 10px)",
    height: "40px",
    margin: "5px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  if (ddlDisabled == true) {
    var Titulo = "Seleccione una Funcion";
  } else {
    var Titulo = "Seleccione una Un Asiento";
  }

  const AsientoSeleccionado = (asiento) => {
    if (selectedAsientos.includes(asiento)) {
      // El asiento ya está en la matriz, por lo que se elimina
      setSelectedAsientos(selectedAsientos.filter((a) => a !== asiento));
      console.log(`El asiento ${asiento} fue deseleccionado.`);
    } else {
      // El asiento no está en la matriz, por lo que se agrega
      setSelectedAsientos([...selectedAsientos, asiento]);
      console.log(`El asiento ${asiento} fue seleccionado.`);
    }
    var cantidadSeleccionada = selectedAsientos.length + 1;
    localStorage.setItem('CantidadAsiento', cantidadSeleccionada);
  };
  

  if (EnviarAsientos) {

    var AsientoParametros = {
      tick_Factura: fact_Id,
      tick_Proyeccion: salaId,
      tick_Asiento: "",
      tick_UsuCrea: 1,
    };

    selectedAsientos.forEach((asiento) => {
      AsientoParametros = {
        tick_Factura: fact_Id,
        tick_Proyeccion: Proyeccion_Id,
        tick_Asiento: asiento,
        tick_UsuCrea: 1,
      };

      axios
        .post(Global.url + `FacturaDetalles/Tikect/Insert`, AsientoParametros)
        .then((response) => {
          if (response.data.code == 200) {
            
          }
        })
        .catch((error) => {
          console.log("Hubo un error = " + error)
        });

    });
  }
  return (
    <div className="sala-cine">
      <Toast ref={toast} />
  
      <Sidebar
        visible={visibleFullScreen}
        onHide={() => setVisibleFullScreen(false)}
        baseZIndex={1000}
        fullScreen
      >
        <h1 style={{ fontWeight: "normal" }}>Asientos</h1>
        <div className="sala-cine-asientos">
          {asientos.length > 0 ? (
            asientos.map((asiento) => (
              <div
                key={asiento.asie_Id}
                className={`asiento ${
                  asiento.asie_Reservado ? "asiento-reservado" : "asiento-libre"
                }`}
                onClick={() => AsientoSeleccionado(asiento.asie_Id)}
                style={{
                  ...asientoStyles,
                  backgroundColor: asiento.asie_Reservado
                    ? "gray"
                    : selectedAsientos.includes(asiento.asie_Id)
                    ? "green"
                    : "red",
                  pointerEvents: asiento.asie_Reservado ? "auto" : "none",
                }}
                
              >
                {asiento.asie_Code}
              </div>
            ))
          ) : (
            <p>Cargando asientos...</p>
          )}
        </div>
      </Sidebar>
      <Button
        label={Titulo}
        type="button"
        disabled={ddlDisabled}
        onClick={() => setVisibleFullScreen(true)}
        className={classNames({
          "p-invalid": !labelVisible2 && submitted && !selectedAsientos,
        })}
      />
    </div>
  );
};

export default Asientos;