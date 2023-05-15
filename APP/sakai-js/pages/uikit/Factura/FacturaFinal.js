import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import Global from "../../api/Global";
import { useRouter } from "next/router";
import { Button } from "primereact/button";

function PDFDocument() {
  const router = useRouter();

  const Factura_Id = router.query.Factura_Id;
  const RTN = router.query.RTN;
  const [nombre, setNombre] = useState("");
  const [apellido, setapellido] = useState("");
   // creamos el documento PDF
  const doc = new jsPDF();
  const [data, setData] = useState([]);
  const [cargarPaguina, SetcargarPaguina] = useState(false);
   useEffect(() => {
    const Parametro = {
      fade_Factura: parseInt(Factura_Id),
      clie_RTN: RTN,
    };
        
    axios
      .post(Global.url + "FacturaDetalles/Factura", Parametro)
      .then((response) => response.data)
      .then((data) => {
        setData(data.data);
        setNombre(data.data[0].clie_Nombres);
        setapellido(data.data[0].clie_Apellidos);

        console.log(nombre + " " + apellido)
        SetcargarPaguina(true);
      })
      .catch((error) => {
        console.log("Error en la solicitud Axios:", error);
      });
  }, [Factura_Id, RTN]);

  if (cargarPaguina) {
    const header = function (data) {
      doc.setFontSize(18);
      const pageWidth = doc.internal.pageSize.width;
      doc.setTextColor(40);

      // Agregar texto
    };

    const footer = function (data) {
      const pageCount = doc.internal.getNumberOfPages();
      const currentPage = data.pageNumber;
      const pageWidth = doc.internal.pageSize.width;
      const date = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const text = `Documento informatico de MegaFilms ${date}`;
      const textWidth = doc.getTextWidth(text);
      const textX = pageWidth * 1.3 - textWidth;
      doc.setFontSize(10);
      doc.text(
        `      Página ${1}`,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
      doc.text(text, textX, doc.internal.pageSize.height - 10);
    };

    // Agregamos el encabezado y pie de página
    doc.autoPageBreak = true;
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setTextColor(0);
    header({ settings: { margin: { left: 0 } } });
    footer({ settings: { margin: { left: 0 } } });

    // Agregamos la información de la factura
    doc.setFontSize(12);
    //doc.setFontStyle("bold");
    doc.text("FACTURA DE CINE", 80, 50);
    doc.text(
      "----------------------------------------------------------------------------------------------------------------------",
      10,
      55
    );
    doc.setFontSize(10);
    //doc.setFontStyle("normal");
    doc.text(`Número de factura: ${Factura_Id}`, 20, 70);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 80);
    doc.text(`RTN: ${RTN}`, 20, 90);
    doc.text(
      `Nombre: ${ nombre + " " + apellido }`,
      20,
      100
    );

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // formato de fecha dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;
    const FormateHore = `${hours}:${minutes}`;

    doc.text(`Fecha: ${formattedDate}         Hora: ${FormateHore}`, 20, 110);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------------------------------`,
      10,
      115
    );

    // Agregamos los detalles de los servicios
    doc.setFontSize(12);
    //doc.setFontStyle("bold");
    doc.text("SERVICIOS", 80, 125);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------`,
      10,
      130
    );
    doc.text("Producto", 20, 135);
     doc.text(`Cantida`, 84, 135);
    doc.text(`Total`, 150, 135);
    doc.text(
      `------------------------------------------------------------------------------------------------------------------------------`,
      10,
      140
    );
    doc.text(`${data[0].fade_Tickets != null && data[0].fade_Tickets !== undefined ? "Tickets" : ""}`, 20, 150);
    doc.text(`${data[0].fade_Tickets != null && data[0].fade_Tickets !== undefined ? data[0].fade_Tickets : ""}`, 90, 150);
    doc.text(`${data[0].fade_Total_Tickets != null && data[0].fade_Total_Tickets !== undefined ? "L" +data[0].fade_Total_Tickets : ""}`, 150, 150);
    

    doc.setFontSize(10);
    //doc.setFontStyle("normal");
    let y = 160;
    let total = 0;
    data.forEach((servicio, index) => {
      doc.text(
        `${
          isNaN(servicio.comb_Descripcion)
            ? servicio.comb_Descripcion ?? ""
            : servicio.fade_ComboDetalle ?? ""
        }`,
        20,
        y
      );
      doc.text(
        `${
          servicio.fade_Combo_Cantidad === "N/A"
            ? servicio.fade_ComboDetalle_Cantidad ?? ""
            : servicio.fade_Combo_Cantidad ?? ""
        }`,
        90,
        y
      );
      doc.text(`${servicio.fade_Total_Combo ?? "N/A"}`, 150, y);
      total += servicio.fade_Total_Combo ?? 0;
      y += 10;
      
      
    });

    // Agregamos el total de la factura
    doc.setFontSize(12);
    //doc.setFontStyle("bold");
    doc.text(
      `${data[0].pago_Descripcion}      Total: L ${
        total + data[0].fade_Total_Tickets
      }`,
      116,
      y + 20
    );

    // Obtenemos una URL del PDF para mostrarlo en un iframe
    const pdfUrl = doc.output("dataurl");

    // Mostramos el documento PDF en un iframe
    return (
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            <center>
          <Button
                  label="Volver"
                  severity="danger"
                  icon="pi pi-times"
                  onClick={() =>{router.push("/uikit/Factura")}}
                />
                
            <div style={{ height: "100vh" }}>
            <br>
                </br>
              <iframe src={pdfUrl} style={{ width: "100%", height: "100%" }} />
            </div>
            </center>
          </div>
        </div>
      </div>
    );
  } else {
    console.log("Cagaste");
    console.log(cargarPaguina)
  }
}

export default PDFDocument;
