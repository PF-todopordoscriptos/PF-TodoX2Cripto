import React, { Fragment } from "react";
//import { Link } from "react-router-dom";
import IMG from "../../Images/criptoLOGO.png";

import { Stack, CardMedia, Typography, Link } from "@mui/material";

import style from "./Footer.css";

const Footer = () => {
  return (
    <div className={style.cont}>
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
                height="110"
                width="35"
                image={IMG}
                alt="logoPrueba"
                sx={{
                  mt: "20px",
                }}
              />
            </Stack>
            <Stack
              sx={{
                fontWeight: "bold",
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
              <Link
                className="footer-right-section-FAQ"
                href="/FAQ"
                underline="none"
              >
                FAQ
              </Link>
              <Link
                className="footer-right-section-FAQ"
                href="/about"
                underline="none"
              >
                ABOUT
              </Link>
              <Link
                className="footer-right-section-FAQ"
                href="/developes"
                underline="none"
              >
                DEVELOPERS
              </Link>
            </Stack>
          </Stack>
          <hr></hr>
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
    </div>
  );
};

export default Footer;
