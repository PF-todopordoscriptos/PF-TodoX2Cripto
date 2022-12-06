import React from 'react'
import { Link } from 'react-router-dom';
import IMG from "../../Images/criptoLOGO.png";
import style from "./Navbar.module.css"
import { useAuth0 } from "@auth0/auth0-react"

import MaterialUISwitch from './Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Navbar = () => {

    const {user, isAuthenticated} = useAuth0()

  return (
    <div className={style.nav}>
        <div className={style.contLogo}>
            <Link to ="/home">
            <img src={IMG} alt="logo" className={style.logo}/>
            </Link>
        </div>

        <div className={style.contSwitch}>
        <FormGroup>
            <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
            />
        </FormGroup>
        </div>

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
            <button className={style.boton2}>
             Log In
            </button>
        </Link>
        }

    </div>
  )
}

export default Navbar