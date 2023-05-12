import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
//Importo la url de la api
import Global from "../../api/Global";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

const Factura = () => {
  const router = useRouter();

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <h1>Factura</h1>

          <div className="my-2">
            <Button
              label="Nuevo"
              icon="pi pi-plus"
              severity="sucess"
              className="mr-2"
              onClick={() => router.push("/uikit/Factura/CreateFactura")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factura;
