import React from "react";
// import { Stack, Typography, Box } from "@mui/material";
import style from "./FAQ.module.css"
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import { Typography } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import './FAQ.css'
import Navbar from "../Navbar/Navbar";

const Accordion = withStyles({
  root: {
    width: '70%',
    // backgroundColor: '#3B2A43',
    // border: '2px solid lightgrey',
  },
  expanded: {}
})(MuiAccordion)
const AccordionSummary = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'grey',
    // borderRadius: '50px'
  },
  expanded: {}
})(MuiAccordionSummary)
const AccordionDetails = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  expanded: {}
})(MuiAccordionDetails)


const FAQ = () => {
  return (
    // <div className={style.cont}>
    // <Box 
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   >
    //   <Box
    //     sx={{
    //       border: "1px solid primary.dark",
    //       borderRadius:"15px",
    //       backgroundColor: "primary.dark",
    //       width: "600px",
    //       height: "400px",
    //     }}
    //   >
    //     <Typography sx={{ color: "secondary.main" }} variant="h3" gutterBottom>
    //       Frequently Asked Questions
    //     </Typography>
    //     <Stack>
    //       <Typography sx={{ color: "primary.sub" }} variant="h5" gutterBottom>
    //         ¿Puedo comprar sin registrarme?
    //       </Typography>
    //       <Typography
    //         sx={{ color: "secondary.main" }}
    //         variant="subtitle2"
    //         gutterBottom
    //       >
    //         Para hacer una compra es necesario tener una cuenta.
    //       </Typography>
    //       <Typography sx={{ color: "primary.sub" }} variant="h5" gutterBottom>
    //         ¿Hay minimo de edad?
    //       </Typography>
    //       <Typography
    //         sx={{ color: "secondary.main" }}
    //         variant="subtitle2"
    //         gutterBottom
    //       >
    //         Es necesario ser mayor de 18 años.
    //       </Typography>
    //       <Typography sx={{ color: "primary.sub" }} variant="h5" gutterBottom>
    //         ¿Que metodos de pago hay?
    //       </Typography>
    //       <Typography
    //         sx={{ color: "secondary.main" }}
    //         variant="subtitle2"
    //         gutterBottom
    //       >
    //         Trabajamos con la pasarela de pago de Mercado Pago
    //       </Typography>
    //       <Typography sx={{ color: "primary.sub" }} variant="h5" gutterBottom>
    //         ¿Hay devoluciones?
    //       </Typography>
    //       <Typography
    //         sx={{ color: "secondary.main" }}
    //         variant="subtitle2"
    //         gutterBottom
    //       >
    //         Una vez que la cripto comprada entro a tu billetera no hay forma de
    //         volver atras.
    //       </Typography>
    //     </Stack>
    //   </Box>
    // </Box>
    // </div>

    <div>
      <Navbar/>
      <div className="accordions">
        <Accordion>
          <AccordionSummary>
            <Typography variant="h5" >¿Puedo comprar sin registrarme?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary.dark">Para hacer una compra es necesario tener una cuenta.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>¿Hay mínimo de edad?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary.dark">Es necesario ser mayor de 18 años.</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>

  );
};

export default FAQ;
