import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import style from "./NewFAQ.module.css"

const NewFAQ = () => {
  return (
    <div className={style.contAccordion}>

      <Accordion sx={{color: "white",width: "70%", backgroundColor: " #7b27a5;", border: "2px solid #684477", margin: "0.7rem", borderRadius: "8px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            ¿Puedo comprar sin registrarme?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography>
          Para hacer una compra es necesario tener una cuenta.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{color: "white",width: "70%", backgroundColor: " #7b27a5;", border: "2px solid #684477", margin: "0.7rem", borderRadius: "8px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            ¿Hay mínimo de edad?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography>
            Es necesario ser mayor de 18 años.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{color: "white",width: "70%", backgroundColor: " #7b27a5;", border: "2px solid #684477", margin: "0.7rem", borderRadius: "8px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            ¿Que métodos de pago hay?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography>
            Trabajamos con la plataforma de pago de MercadoPago.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{color: "white",width: "70%", backgroundColor: " #7b27a5;", border: "2px solid #684477", margin: "0.7rem", borderRadius: "8px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            ¿Hay devoluciones?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography>
            Una vez que la cripto comprada entro a tu billetera no hay forma de volver atras.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{color: "white",width: "70%", backgroundColor: " #7b27a5;", border: "2px solid #684477", margin: "0.7rem", borderRadius: "8px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            ¿Como contactarme con atención al cliente?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography>
            Ante cualquier duda o consulta, escribinos a todox2criptos@gmail.com
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{color: "white",width: "70%", backgroundColor: " #7b27a5;", border: "2px solid #684477", margin: "0.7rem", borderRadius: "8px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            ¿Como puedo actualizar mis datos de perfil?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Typography>
            Inicia sesión en tu cuenta de "Todo por 2 Criptos" y en la parte superior derecha haz clic en [My Profile]
          </Typography>
        </AccordionDetails>
      </Accordion>
      

    </div>

  )
}

export default NewFAQ