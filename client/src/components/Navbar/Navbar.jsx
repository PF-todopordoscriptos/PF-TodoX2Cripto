import React from 'react'
import { Link } from 'react-router-dom';
import IMG from "../../Images/logoPrueba.png";
import style from "./Navbar.module.css"
import { useAuth0 } from "@auth0/auth0-react"

import MaterialUISwitch from './Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Navbar = () => {

    const {user, isAuthenticated} = useAuth0()

  return (
    <div className={style.nav}>
        <div>
            <Link to ="/home">
            <img src={IMG} alt="logo" className={style.logo}/>
            </Link>
        </div>

        <FormGroup>
            <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
            />
        </FormGroup>

        {
        isAuthenticated ? (
            <div className={style.profile}>
                
                <img src={user.picture} alt="picture" />
                {
                  console.log(user)
                }

                <Link to="/profile">
                 <button className={style.boton}>
                     My Profile
                 </button>
                </Link>
            </div>
        ) :
        <Link to="/login">
            <button className={style.boton}>
             Log In
            </button>
        </Link>
        }

    </div>
  )
}

export default Navbar