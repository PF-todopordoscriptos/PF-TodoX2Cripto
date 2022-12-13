import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postUser, postUserGoogle } from "../../redux/actions/index.js";

import style from "./Profile.module.css";
import TextField from "@mui/material/TextField";
import logo from "../../Images/logoGoogle.png";
import SelectNat from "../SelectNat/SelectNat";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import lapizNegro from "../../Images/lapizNegro.png";
import lapizGris from "../../Images/lapizGris.png";

const Profile = () => {
  //const {user, isAuthenticated, logout} = useAuth0();

  const history = useNavigate();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);

  const [user, setUser] = useState({
    email: "",
    //password: ""
  });

  const changeEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
          //password: currentUser.password,
        });
        dispatch(postUser(currentUser));
      } else {
        console.log("SIGNED OUT");
        setUser({
          email: "",
        });
      }
    });
  }, []);

  console.log(auth);
  console.log(user);

  return (
    <div className={style.divAll}>
      <form>
        <div className={style.contDivs}>
          <div className={style.divsInputs}>
            <div className={style.parteUno}>
              <div className={style.contFoto}>
                <img
                  src={logo}
                  alt="foto de perfil"
                  className={style.fotoPerfil}
                />
                <input
                  accept="image/*"
                  id="raised-button-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  disabled={edit ? true : null}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="raised"
                    component="span"
                    style={{
                      marginLeft: "1rem",
                      marginTop: "2rem",
                      backgroundColor: "#a06aeb55",
                    }}
                    disabled={edit ? true : null}
                  >
                    {" "}
                    Upload Image{" "}
                  </Button>
                </label>
              </div>

              <TextField
                id="filled-2"
                name="email"
                label="Email"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled
              />
              <TextField
                id="filled-3"
                name="username"
                label="Username"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />
              <TextField
                id="filled-4"
                name="name"
                label="Name"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />
              <TextField
                id="filled-5"
                name="lastname"
                label="Lastname"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />
            </div>

            <div className={style.parteDos}>
              <div className={style.contLapiz}>
                {edit ? (
                  <img
                    onClick={changeEdit}
                    className={style.lapiz}
                    src={`${lapizNegro}`}
                  />
                ) : (
                  <img
                    onClick={changeEdit}
                    className={style.lapiz}
                    src={`${lapizGris}`}
                  />
                )}
              </div>
              <TextField
                id="filled-6"
                name="telephone"
                label="Telephone"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />
              <TextField
                id="filled-7"
                name="dni"
                label="DNI"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />

              <div className={style.contNation}>
                <SelectNat edit={edit} />
              </div>
            </div>
          </div>

          <div className={style.contButton}>
            <button className={style.butChanges}>Save changes</button>
          </div>

          <div className={style.divDinosaurio}>
            <marquee behavior="scroll" direction="left">
              <img
                className={style.dinosaurio}
                src="https://media3.giphy.com/media/e5RXnHeokFGMsOUMMm/giphy.gif?cid=6c09b95217a7b5ed944209a47fe302510eb22ef9574ad7ba&rid=giphy.gif&ct=s"
              />
            </marquee>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
