import axios from "axios";
import Global from "../../api/Global";
import React, { useEffect, useRef, useState } from "react";

const Peticion = () => {
  //============================== INSERT DE CLIENTE ====================================//

  axios
    .post(Global.url + `Cliente/Insert`, ClientesParametros)
    .then((response) => {
      if (response.data.code == 200) {
        var idC = parseInt(response.data.data.messageStatus);
        console.log(idC);

        setClie_Id(idC);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //============================== INSERT DE FATURA =====================================//

  axios
    .post(Global.url + `Factura/Insert`, FacturaParameter)
    .then((response) => {
      if (response.data.code == 200) {
        var idF = parseInt(response.data.data.messageStatus);
        console.log(idF);

        setFact_Id(idF);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //========================== INSERT DE FATURA DETALLE =================================//

  axios
    .post(Global.url + `FacturaDetalles/Insert`, FacturaDetalle)
    .then((response) => {
      if (response.data.code == 200) {
        toast.current.show({
          severity: "success",
          summary: "Felicidades",
          detail: "Editaste un registro",
          life: 1500,
        });
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
};
