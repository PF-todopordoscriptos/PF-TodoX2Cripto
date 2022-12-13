import React from "react";
import { NavLink } from "react-router-dom";
import DinoError404 from "../../Images/DinoError404.jpg";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="main-Error">
      <NavLink className="boton-Home" to="/home">
        Home
      </NavLink>
      <h1 className="title-Error">
        Página no encontrada
        <div></div>
      </h1>
      <img src={DinoError404} alt="error" />
    </div>
  );
}
