import React, { useEffect, useRef, useState } from "react";
//import "Asiento"
import Global from "../../api/Global";
import axios from "axios";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";

const Asientos = ({ salaId, ddlDisabled }) => {
  const [asientos, setAsientos] = useState([]);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [selectedAsientos, setSelectedAsientos] = useState([]);

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

  if(ddlDisabled == true){
    var Titulo = "Seleccione una Funcion"
  }else{
    var Titulo = "Seleccione una Un Asiento"

  }
  return (
    <div className="sala-cine">
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
                onClick={() =>
                  console.log(
                    `Asiento ${asiento.asie_Code} ${asiento.asie_Reservado}`
                  )
                }
                style={asientoStyles}
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
      />
    </div>
  );
};

export default Asientos;
