import React, { useState } from "react";

import style from "./Login.module.css";
import "./LoginBackground.css";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import ojoAbierto from "../../Images/ojoabierto.png";
import ojoCerrado from "../../Images/ojocerrado.png";
import logoGoogle from "../../Images/logoGoogle.png";

import Swal from "sweetalert2";

const Login = () => {
  const history = useNavigate();

  // const [contador, setContador] = useState(1);
  const [handleChangePassword, sethandleChangePassword] = useState(false);

  const [registered, setRegistered] = useState({
    email: "",
    password: "",
    showRegisterPassword: false,
  });

  const [resetPassword, setResetPassword] = useState({
    email: "",
  });

  const [errorsLog, setErrorsLog] = useState();

  const [errorsPass, setErrorsPass] = useState();

  const changePasswordForm = () => {
    sethandleChangePassword(!handleChangePassword);
  };

  const handleChangeRegistered = (e) => {
    setRegistered({
      ...registered,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = (e) => {
    setResetPassword({
      ...resetPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowRegisterPassword = () => {
    setRegistered({
      ...registered,
      showRegisterPassword: !registered.showRegisterPassword,
    });
  };

  async function handleSingInGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);

    history("/profile");
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        registered.email,
        registered.password
      );
      history("/profile");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorsLog("Invalid email.");
      }
      if (error.code === "auth/user-not-found") {
        setErrorsLog("Not register yet.");
      }
      if (error.code === "auth/wrong-password") {
        setErrorsLog("Wrong password.");
      }
      if (error.code === "auth/user-disabled") {
        setErrorsLog("Your user has been disabled.");
      }
    }
  };

  const onHandleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, resetPassword.email);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        iconColor: "#8EFF60",
        title: `Email sent successfully ㅤ(Check spam box).`,
        color: "white",
        background: "#BE66FE",
      });
      setResetPassword({
        email: "",
      });
      setErrorsPass("");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorsPass("Invalid email.");
      }
      if (error.code === "auth/user-not-found") {
        setErrorsPass("Not register yet.");
      }
    }
  };

  return (
    <div className="main-formlogin">
      <form className={style.all}>
        <div className={style.parteDos}>
          <button
            type="button"
            onClick={handleSingInGoogle}
            className={style.ButSignUp}
          >
            Log in with{" "}
            <img
              src={`${logoGoogle}`}
              className={style.google}
              alt="GoogleLogo"
            />
          </button>

          <h2 className={style.orH2}>Or</h2>
          {/* <h2 className={style.finalH2}>Do you already have an account?</h2> */}

          <div className={style.registerInputs}>
            <div className={style.divRegister}>
              <TextField
                className={style.emailRegister}
                onChange={handleChangeRegistered}
                name="email"
                value={registered.email}
                id="filled-8"
                label="Email"
                variant="standard"
                color="info"
                sx={{ marginTop: "0.5rem" }}
              />
            </div>

            <div className={style.divPassword2}>
              <TextField
                onChange={handleChangeRegistered}
                name="password"
                type={registered.showRegisterPassword ? "text" : "password"}
                value={registered.password}
                id="filled-9"
                label="Password"
                variant="standard"
                color="info"
                sx={{ marginTop: "0.5rem" }}
              />
              {registered.showRegisterPassword ? (
                <img
                  className={style.ojo2}
                  src={`${ojoAbierto}`}
                  alt="ojoabierto"
                  onClick={handleClickShowRegisterPassword}
                />
              ) : (
                <img
                  className={style.ojo2}
                  src={`${ojoCerrado}`}
                  alt="ojocerrado"
                  onClick={handleClickShowRegisterPassword}
                />
              )}
            </div>
          </div>

          {errorsLog && <p className={style.errorsText2}>{errorsLog}</p>}
          <div className={style.contLogin}>
            <button
              onClick={handleLogin}
              type="button"
              className={style.ButLogin}
            >
              Log in
            </button>
          </div>

          <p>
            Did you forget your password?{" "}
            <label onClick={changePasswordForm} className={style.forget}>
              get it back.
            </label>
          </p>
          {handleChangePassword ? (
            <div className={style.resetPa}>
              <TextField
                id="filled-10"
                name="email"
                label="Email"
                variant="standard"
                color="info"
                value={resetPassword.email}
                onChange={handleResetPassword}
              />
              {errorsPass && <p className={style.errorsText3}>{errorsPass}</p>}

              <button
                type="button"
                onClick={onHandleReset}
                className={style.butReset}
              >
                Reset password
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Login;
