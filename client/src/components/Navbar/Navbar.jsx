import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMG from "../../Images/criptoLOGO.png";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import MaterialUISwitch from "./Switch";
import {
  FormGroup,
  FormControlLabel,
  Box,
  Typography,
  Button,
  Switch,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, setThemeMode } from "../../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();

  const history = useNavigate();
  //const {user, isAuthenticated} = useAuth0()
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({
    email: "",
    //password: ""
  });
  const userInfo = useSelector((state) => state.userInfo);
  

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
  }, [user]);


  // console.log(userInfo)

  React.useEffect(() => {
    dispatch(getUserInfo(user.email));
    console.log("estado lleno");
  }, [user.email]);

  const handleSignOut = () => {
    signOut(auth);
    history("/home");
  };

  const themeMode = useSelector((state) => state.themeMode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "13vh",
        backgroundColor: "navbar.background",
        padding: "0vw 1vw 0vw",
      }}
    >
      <div className={style.contLogo}>
        <Link to="/home">
          <img src={IMG} alt="logo" className={style.logo} />
        </Link>
      </div>
      <div className={style.contSwitch}>
        <FormGroup>
          <FormControlLabel

            control={<MaterialUISwitch sx={{ m: 1 }}
              checked={themeMode === 'light' ? false : true}
              onClick={ () => themeMode === 'light' ? dispatch(setThemeMode('dark')) : dispatch(setThemeMode('light')) }
            />}

          />
        </FormGroup>
      </div>


      <Box className={style.butonsAuth}>

      <div className={style.contButsExtras}>
        {
          userInfo.admin ? 
        <Link to="/admin">
          <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673116583/tuercas_qsi3hj.png" alt="admin" className={style.admin} />
        </Link> 
        : null
        }
        <Link to="/cart">
          <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673118030/carrito_dydtjj.png" alt="cart" className={style.carrito} />
        </Link>
      </div>

        {user ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "15vw",
              alignItems: "center",
            }}
            className={style.flexBoton}
          >
            <Link to="/profile">
              <Button
                sx={{
                  ":hover": {
                    backgroundColor: "navbar.button.:hover.background",
                    color: "navbar.button.:hover.text",
                  },
                  color: "navbar.button.text",
                  backgroundColor: "navbar.button.background",
                  margin: "0.3vw",
                  height: "5vh",
                  width: "6vw",
                  fontWeight: "bold",
                  fontSize: 16,
                  textTransform: "none",
                }}
                className={style.boton}
              >
                My Profile
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              sx={{
                ":hover": {
                  backgroundColor: "navbar.button.:hover.background",
                  color: "navbar.button.:hover.text",
                },
                color: "navbar.button.text",
                backgroundColor: "navbar.button.background",
                margin: "0.3vw",
                height: "5vh",
                width: "6vw",
                fontWeight: "bold",
                fontSize: 16,
                textTransform: "none",
              }}
              className={style.boton}
            >
              Log Out
            </Button>
          </Box>
        ) : (
          <Link to="/signup">
            <Button
              sx={{
                ":hover": {
                  backgroundColor: "navbar.button.:hover.background",
                  color: "navbar.button.:hover.text",
                },
                color: "navbar.button.text",
                backgroundColor: "navbar.button.background",
                margin: "0.3vw",
                marginLeft: "2rem",
                height: "5vh",
                width: "6vw",
                fontWeight: "bold",
                fontSize: 16,
                textTransform: "none",
              }}
              className={style.boton}
            >
              Sign Up
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
