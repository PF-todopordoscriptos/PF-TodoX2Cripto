import React from 'react';
import { Link } from 'react-router-dom';
import IMG from '../../Images/logoPrueba.png';

const Footer = () => {
  return (
    <div>
      <hr />
      <img src={IMG} alt='LOGO' />
      <h1>Todo por 2 criptos</h1>
      <h1>Derechos Reservados</h1>
      <div>
        <h2>CONTACTO</h2>
        <h3>+54 1178434342</h3>
        <h3>todox2criptos@gmail.com</h3>
        <h3>Av. Cabildo 1994</h3>
      </div>      
      <Link to='/FAQ'><h2>FAQ</h2></Link>
      <Link><h2>DEVELOPERS</h2></Link>
      <Link><h2>ABOUT</h2></Link>
    </div>
  )
}

export default Footer
