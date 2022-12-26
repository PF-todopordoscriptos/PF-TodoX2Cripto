import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMG from "../../Images/criptoLOGO.png";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import MaterialUISwitch from "./Switch";
import { FormGroup , FormControlLabel , Box , Typography , Button , Switch } from "@mui/material";
import { useSelector , useDispatch } from 'react-redux';
import { setThemeMode } from '../../redux/actions';

const Navbar = () => {

  const dispatch = useDispatch()

  const history = useNavigate();
  //const {user, isAuthenticated} = useAuth0()
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
          //password: currentUser.password,
        });
      } else {
        console.log("SIGNED OUT");
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    history("/home");
  };

  const themeMode = useSelector( state => state.themeMode )

  return (
    <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '13vh' , backgroundColor: "navbar.background" , padding: '0vw 1vw 0vw'}}>
      <div className={style.contLogo}>
        <Link to="/home">
          <img src={IMG} alt="logo" className={style.logo} />
        </Link>
      </div>
      <div className={style.contSwitch}>
        <FormGroup >
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }}
              checked={themeMode === 'light' ? false : true}
              onChange={ () => themeMode === 'light' ? dispatch(setThemeMode('dark')) : dispatch(setThemeMode('light')) }
            />}
          />
        </FormGroup>
      </div>
      <Box className={style.butonsAuth}>
        {user ? (
          <Box sx={{ display: 'flex' , flexDirection: 'row' , width: '15vw' , alignItems: 'center'}} className={style.flexBoton}>
            <Link  to="/profile">
              <Button sx={{ ':hover': {backgroundColor: 'navbar.button.:hover.background' , color: 'navbar.button.:hover.text'} , color: "navbar.button.text" , backgroundColor: 'navbar.button.background' , margin: '0.3vw' , height: '5vh' , width: '6vw' , fontWeight: 'bold' , fontSize: 16 , textTransform: 'none'}} className={style.boton} >
                My Profile
              </Button>
            </Link>
            <Button sx={{ ':hover': {backgroundColor: 'navbar.button.:hover.background' , color: 'navbar.button.:hover.text'} , color: "navbar.button.text" , backgroundColor: 'navbar.button.background' , margin: '0.3vw' , height: '5vh' , width: '6vw' , fontWeight: 'bold' , fontSize: 16 , textTransform: 'none'}} className={style.boton} >
              Log Out
            </Button>
          </Box>
        ) : (
          <Link to="/login">
            <Button sx={{ ':hover': {backgroundColor: 'navbar.button.:hover.background' , color: 'navbar.button.:hover.text'} , color: "navbar.button.text" , backgroundColor: 'navbar.button.background' , margin: '0.3vw' , height: '5vh' , width: '6vw' , fontWeight: 'bold' , fontSize: 16 , textTransform: 'none'}} className={style.boton} >
              Log In
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
