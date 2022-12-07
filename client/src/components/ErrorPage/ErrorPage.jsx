import React from "react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>Error 404 Página no encontrada, coloque una URL correcta</h1>
      <NavLink to="/home">Ir a Home</NavLink>
    </div>
  );
}
