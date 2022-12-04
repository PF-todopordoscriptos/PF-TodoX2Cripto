import React, { Fragment } from "react";
//import { Link } from "react-router-dom";
import IMG from "../../Images/logoPrueba.png";

import { Stack, CardMedia, Typography, Link  } from "@mui/material";



const Footer = () => {
  return (
    <Fragment>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          bgcolor: "primary.dark",
          color: "secondary.main",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={25}
        >
          <Stack>
            <CardMedia
              component="img"
              // height="20"
              // width="35"
              image={IMG}
              alt="logoPrueba"
              sx={{
                mt: "20px",
              }}
            />
          </Stack>
          <Stack
            sx={{
              
              fontWeight: 'bold'
            }}
            >
            <Typography variant="subtitle1" gutterBottom>
              CONTACTO
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              +54 1178434342
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              todox2criptos@gmail.com
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Av. Cabildo 1994
            </Typography>
          </Stack> 
          <Stack>
            <Link href="/FAQ" underline="none">
              <Typography variant="subtitle1" gutterBottom>
                FAQ
              </Typography>
            </Link>
            <Link href="#" underline="none">
              <Typography variant="subtitle1" gutterBottom>
                ABOUT
              </Typography>
            </Link>
            <Link href="#" underline="none">
              <Typography variant="subtitle1" gutterBottom>
                DEVELOPERS
              </Typography>
            </Link>
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="subtitle1" gutterBottom>
            Todo por 2 criptos©
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Derechos Reservados
          </Typography>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default Footer;
