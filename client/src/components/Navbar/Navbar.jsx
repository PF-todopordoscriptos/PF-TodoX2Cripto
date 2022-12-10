
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import IMG from "../../Images/criptoLOGO.png";
import style from "./Navbar.module.css"
import { useHistory } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import {
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import MaterialUISwitch from './Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Navbar = () => {
    const history = useHistory();
    //const {user, isAuthenticated} = useAuth0()
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          if(currentUser){
              setUser({
                  ...user,
                  email: currentUser.email,
                  //password: currentUser.password,
                })
          }else{
              console.log("SIGNED OUT");
              setUser(null)
          }
        })
      }, []);
    
    const handleSignOut = () => {
        signOut(auth)
        history.push("/home")
    }


  return (
    <div className={style.nav}>
      <div className={style.contLogo}>
        <Link to="/home">
          <img src={IMG} alt="logo" className={style.logo} />
        </Link>
      </div>
      <div className={style.contSwitch}>
        <FormGroup>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          />
        </FormGroup>
      </div>
      <div className={style.butonsAuth}>
        {
        user ? (
            <div className={style.flexBoton}>
                <Link to="/profile">
                    <button className={style.boton}>My Profile</button>
                </Link>
                <button onClick={handleSignOut} className={style.boton}>
                    Log Out
                </button>
            </div>
        ) :
        <Link to="/login">
            <button className={style.boton}>
             Log In
            </button>
        </Link>
        }
      </div>
            
      </div>
  );
};

export default Navbar;
