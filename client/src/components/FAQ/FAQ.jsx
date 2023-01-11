import React from "react";
// import { Stack, Typography, Box } from "@mui/material";
import style from "./FAQ.module.css";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import "./FAQ.css";
// import Navbar from "../Navbar/Navbar";
import { HiChevronDown } from "react-icons/hi2";

const Accordion = withStyles({
  root: {
    color: "white",
    width: "70%",
    backgroundColor: " #7b27a5;",
    border: "2px solid #684477",
    margin: "0.7rem",
    borderRadius: "8px",
  },
  expanded: {},
})(MuiAccordion);
const AccordionSummary = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  expanded: {},
})(MuiAccordionSummary);
const AccordionDetails = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  expanded: {},
})(MuiAccordionDetails);

const FAQ = () => {
  return (
    <div className={style.cont}>
      <div className="accordions">
        <Accordion>
          <AccordionSummary expandIcon={<HiChevronDown />}>
            <Typography variant="h6">
              ¿Puedo comprar sin registrarme?
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="h7">
              Para hacer una compra es necesario tener una cuenta.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<HiChevronDown />}>
            <Typography variant="h6">¿Hay mínimo de edad?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h7">
              Es necesario ser mayor de 18 años.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<HiChevronDown />}>
            <Typography variant="h6">¿Que métodos de pago hay?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h7">
              Trabajamos con la plataforma de pago de MercadoPago.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<HiChevronDown />}>
            <Typography variant="h6">¿Hay devoluciones?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h7">
              Una vez que la cripto comprada entro a tu billetera no hay forma
              de volver atras.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<HiChevronDown />}>
            <Typography variant="h6">
              ¿Como contactarme con atención al cliente?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h7">
              Ante cualquier duda o consulta, escribinos a
              todox2criptos@gmail.com
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<HiChevronDown />}>
            <Typography variant="h6">
              ¿Como puedo actualizar mis datos de perfil?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h7">
              Inicia sesión en tu cuenta de "Todo por 2 Criptos" y en la parte
              superior derecha haz clic en [My Profile]
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
