import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import DinoError404 from "../../Images/DinoError404.jpg";

export default function ErrorPage() {
  return (
    <div>
      <h1>
        Error 404 Página no encontrada, coloque una URL correcta o vuelva a la
        <div></div>
        <NavLink to="/home">
          <Button variant="contained" color="secondary">
            Home
          </Button>
        </NavLink>
      </h1>
      <img src={DinoError404} />
    </div>
  );
}
