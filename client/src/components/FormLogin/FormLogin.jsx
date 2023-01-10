/*eslint-disable*/
import React, { useState } from "react";

import style from "./FormLogin.module.css";
import "./FormLoginBackground.css";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import ojoAbierto from "../../Images/ojoabierto.png";
import ojoCerrado from "../../Images/ojocerrado.png";
import logoGoogle from "../../Images/logoGoogle.png";

import Swal from "sweetalert2";

const FormLogin = () => {
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
  const [errorsSig, setErrorsSig] = useState();
  const [errorsPass, setErrorsPass] = useState();

  const changePasswordForm = () => {
    sethandleChangePassword(!handleChangePassword);
  };

  const [input, setInput] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
    showRepeatPassword: false,
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleChangeRegistered = (e) => {
    setRegistered({
      ...registered,
      [e.target.name]: e.target.value,
    });
    console.log(registered);
  };

  const handleResetPassword = (e) => {
    setResetPassword({
      ...resetPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setInput({
      ...input,
      showPassword: !input.showPassword,
    });
  };

  const handleClickShowRepeatPassword = () => {
    setInput({
      ...input,
      showRepeatPassword: !input.showRepeatPassword,
    });
  };

  const handleClickShowRegisterPassword = () => {
    setRegistered({
      ...registered,
      showRegisterPassword: !registered.showRegisterPassword,
    });
  };

  const onSubmitedForm = async (e) => {
    e.preventDefault();
    try {
      if (!input.email || !input.password) {
        return alert("Complete correctamente el formulario antes de enviarlo");
      }
      if (input.password !== input.repeatPassword) {
        return setErrorsSig("Keys must match");
      }
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      setInput({
        email: "",
        password: "",
        repeatPassword: "",
      });
      console.log(input);
      console.log(e);
      history("/profile");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorsSig("Invalid email.");
      }
      if (error.code === "auth/weak-password") {
        setErrorsSig("Password should be at least 6 characters.");
      }
      if (error.code === "auth/email-already-in-use") {
        setErrorsSig("Email already in use, Please log in.");
      }
      console.log(error.code);
      console.log(errorsSig);
    }
  };

  async function handleSingInGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    console.log("auth " + auth);
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
      console.log(error.code);
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
      console.log(resetPassword);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorsPass("Invalid email.");
      }
      if (error.code === "auth/user-not-found") {
        setErrorsPass("Not register yet.");
      }
    }
  };

  //   const setEmailNickname = () => {
  //     let emailAUTH0 = user.email
  //     let nicknameAUTH0 = user.nickname
  //     console.log(emailAUTH0, nicknameAUTH0)
  //     console.log(input.email)
  //     setContador(contador+1)
  //     setInput({
  //         ...input,
  //         [input.email] : emailAUTH0,
  //         [input.nickname] : nicknameAUTH0,
  //     })
  //   }

  return (
    <div className="main-formlogin">
      <form className={style.all}>
        <div className={style.parteUno}>
          <h4 className={style.startH4}>Sign up free!</h4>
          <h2 className={style.startH2}>Create your profile.</h2>

          <div className={style.secciones}>
            <div
              className={
                input.email !== "" ? style.circuloPintado : style.circuloNormal
              }
            />
            <div
              className={
                input.password !== ""
                  ? style.circuloPintado
                  : style.circuloNormal
              }
            />
            <div
              className={
                input.repeatPassword !== ""
                  ? style.circuloPintado
                  : style.circuloNormal
              }
            />
          </div>

          {
            //contador === 1 ?

            <div className={style.contInputs}>
              {/* {errorsSig && (<p className={style.errorsText}>{errorsSig}</p>)} */}
              {
                // isAuthenticated ?  (

                //     <div>
                //         <TextField id="filled-1" name="email" label={`${user.email}`} variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={console.log("aaa")} disabled/>
                //     </div>
                // )
                // :

                <TextField
                  value={input.email}
                  id="filled-2"
                  name="email"
                  label="Email"
                  variant="standard"
                  color="info"
                  sx={{ marginTop: "0.5rem" }}
                  onChange={handleInput}
                />
              }

              {/* <TextField id="filled-3" name="username" label="Username" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput}/> */}

              <div className={style.divPassword}>
                <TextField
                  value={input.password}
                  id="standard-adornment-password"
                  type={input.showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  variant="standard"
                  color="info"
                  sx={{ marginTop: "0.5rem" }}
                  onChange={handleInput}
                />
                {input.showPassword ? (
                  <img
                    className={style.ojo1}
                    src={`${ojoAbierto}`}
                    alt="ojoabierto"
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <img
                    className={style.ojo1}
                    src={`${ojoCerrado}`}
                    alt="ojocerrado"
                    onClick={handleClickShowPassword}
                  />
                )}
              </div>

              <div className={style.divPassword}>
                <TextField
                  value={input.repeatPassword}
                  id="standard-adornment-repeat-password"
                  type={input.showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  label="Repeat password"
                  variant="standard"
                  color="info"
                  sx={{ marginTop: "0.5rem" }}
                  onChange={handleInput}
                />

                {input.showRepeatPassword ? (
                  <img
                    className={style.ojo2}
                    src={`${ojoAbierto}`}
                    alt="ojoabierto"
                    onClick={handleClickShowRepeatPassword}
                  />
                ) : (
                  <img
                    className={style.ojo2}
                    src={`${ojoCerrado}`}
                    alt="ojocerrado"
                    onClick={handleClickShowRepeatPassword}
                  />
                )}
              </div>
            </div>

            // :
            // contador === 2 ?
            // <div className={style.contInputs}>
            //     <TextField id="filled-4" name="name" label="Name" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} />

            //     <TextField id="filled-5" name="lastname" label="Last name" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput}/>
            // </div>

            // :
            // contador === 3 ?
            // <div className={style.contInputs}>
            //     <TextField id="filled-6" name="telephone" label="Telephone" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} />

            //     <TextField id="filled-7" name="dni" label="DNI" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput}/>

            //     <SelectNat
            //     value={input.nationality}
            //     onChange={handleInput}
            //     />

            // </div> : null
          }

          {errorsSig && <p className={style.errorsText1}>{errorsSig}</p>}
          <div className={style.buttonsDiv}>
            {/* {
            contador>1? <button type='button' onClick={setPrev} className={style.butNext}>Prev</button> : null
        }

        <button type='button' onClick={setNext} className={style.butNext}>Next</button>
        {
            contador===3? <button type='button' onClick={onSubmitedForm} className={style.butNext}>Sing Up</button> : null
        } */}

            {/* <button type='button' onClick={setPrev} className={contador > 1 ? style.butNext : style.butHidden }>Prev</button>
        <button type='button' onClick={setNext} className={contador === 3 ? style.butHidden : style.butNext }>Next</button>
        <button type='button' onClick={onSubmitedForm} className={contador === 3 ? style.butNext : style.butHidden }>Sing Up</button>  */}

            <button
              type="button"
              onClick={onSubmitedForm}
              className={style.butNext}
            >
              Sign Up
            </button>
            {/* disabled= {errorsSig.length === 0 ? false : true} */}
          </div>
        </div>

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
          <h2 className={style.finalH2}>Do you already have an account?</h2>

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
            <a onClick={changePasswordForm} className={style.forget} href="#">
              get it back.
            </a>
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

export default FormLogin;
