import React, { useEffect, useState } from 'react'
// import clsx from 'clsx';

import style from "./FormAuth0.module.css"
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { useHistory  } from 'react-router-dom';

import { auth } from "../../firebase/firebaseConfig";
import {
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  } from "firebase/auth";

import ojoAbierto from "../../Images/ojoabierto.png"
import ojoCerrado from "../../Images/ojocerrado.png"
import logoGoogle from "../../Images/logoGoogle.png"

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import FormControl from '@material-ui/core/FormControl';
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { NativeSelect } from '@mui/material';

//import SelectNat from '../SelectNat/SelectNat';
//import { set } from '../../../../api/src/app';


const FormAuth0 = () => {
    const history = useHistory ();
    const dispatch = useDispatch();
 
    const [contador,setContador] = useState(1)
    const [handleChangePassword, sethandleChangePassword] = useState(false)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [registered, setRegistered] = useState({
        email: "",
        password: ""
    })

    const [errorsLog, setErrorsLog] = useState();
    const [errorsSig, setErrorsSig] = useState();

    const setNext = () => {
        setContador(contador+1)
        console.log(contador)
    }

    const setPrev = () => {
        setContador(contador-1)
        console.log(contador)
    }

    const changePasswordForm = () => {
        sethandleChangePassword(!handleChangePassword)
    }
    

    const [input,setInput] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        showPassword: false,
        showRepeatPassword: false,
        // name: "",
        // username: "",
        // lastname: "",
        // telephone: "",
        // dni: 0,
        // nationality: "",
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        console.log(input)
    }

    const handleEmail = (e) => {
        user.email = e.target.value
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        //console.log(input)
    }


    const handleChangeRegistered = (e) => {
        setRegistered({
            ...registered,
            [e.target.name] : e.target.value
        })
        console.log(registered)
    }

    // const handleInput2 = () => {
    //     console.log(input)
    //     console.log("cambioo")
    //     console.log(user.email)
        // setInput({
        //     ...input,
        //     [input.email] : user.email
        // })
    // }

    const handleNickname = (e) => {
        user.nickname = e.target.value
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        console.log(input)
    }


    
    const handleClickShowPassword = () => {
        setInput({
            ...input,
            showPassword: !input.showPassword });
        };
        
    const handleClickShowRepeatPassword = () => {
        setInput({
            ...input,
            showRepeatPassword: !input.showRepeatPassword 
        });
    };
            
    const onSubmitedForm = async(e) => {
        e.preventDefault();
        try {
            if(!input.email || !input.password) {
                return alert ('Complete correctamente el formulario antes de enviarlo')
            }
            await createUserWithEmailAndPassword(auth, input.email, input.password)
            setInput({
                email: '',
                password: '',
                repeatPassword: '',
            })
            console.log(input);
            console.log(e);
        }catch (error) {
            if(error.code === "auth/invalid-email"){
                setErrorsSig("INVALID EMAIL")
            }
            if(error.code === "auth/weak-password"){
                setErrorsSig("Password should be at least 6 characters")
            }
            if(error.code === "auth/email-already-in-use"){
                setErrorsSig("Email already in use, Please log in.")
            }
            console.log(error.code)
            console.log(errorsSig)
        }
        
    }
    
    async function handleSingInGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
        console.log("auth "+auth)
        history.push("/profile");
    }

    const handleLogin =  async () => {
        try {
            await signInWithEmailAndPassword(auth, registered.email, registered.password)
            history.push("/profile");            
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setErrorsLog("INVALID EMAIL")
            }
            if(error.code === "auth/user-not-found"){
                setErrorsLog("NOT REGISTER YET")
            }
            if(error.code === "auth/wrong-password"){
                setErrorsLog("WRONG PASSWORD")
            }
            console.log(error.code)
        }
    }


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
    <div >
        <form className={style.all}>
            
        <div className={style.parteUno}>
        <h4 className={style.startH4}>Sign up free!</h4>
        <h2 className={style.startH2}>Create your profile.</h2>

        <div className={style.secciones}>
            <div className={style.circuloPintado}/>
            <div className={contador> 1 ? style.circuloPintado : style.circuloNormal}/>
            <div className={contador> 2 ? style.circuloPintado : style.circuloNormal}/>
        </div>

    {       //contador === 1 ? 
    
    
    <div className={style.contInputs}>
        {errorsSig && (<p className={style.orH2}>{errorsSig}</p>)}
        {
            // isAuthenticated ?  (
                

            //     <div>
            //         <TextField id="filled-1" name="email" label={`${user.email}`} variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={console.log("aaa")} disabled/>
            //     </div>
            // ) 
            // : 
            
        <TextField value={input.email} id="filled-2" name="email" label="Email" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} />
        
        }

        {/* <TextField id="filled-3" name="username" label="Username" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput}/> */}

        <div className={style.divPassword}>
        <TextField value={input.password} id="standard-adornment-password" type={input.showPassword ? 'text' : 'password'} name="password" label="Password" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput}/>
        {
            input.showPassword ? <img className={style.ojo1} src={`${ojoAbierto}`} alt="ojoabierto" onClick={handleClickShowPassword}/> : <img className={style.ojo1} src={`${ojoCerrado}`} alt="ojocerrado" onClick={handleClickShowPassword}/>
        }
        </div>

        <div className={style.divPassword}>

        <TextField value={input.repeatPassword} id="standard-adornment-password" type={input.showRepeatPassword ? 'text' : 'password'} name="repeatPassword" label="Repeat password" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput}/>

        {
            input.showRepeatPassword ? <img className={style.ojo2} src={`${ojoAbierto}`} alt="ojoabierto" onClick={handleClickShowRepeatPassword}/> : <img className={style.ojo2} src={`${ojoCerrado}`} alt="ojocerrado" onClick={handleClickShowRepeatPassword}/>
        }
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

        <button type='button' onClick={onSubmitedForm} className={style.butNext}>Sign Up</button> 
        {/* disabled= {errorsSig.length === 0 ? false : true} */}
        </div>
        
        </div>
        
        <div className={style.parteDos}>
        <button type='button' onClick={handleSingInGoogle} className={style.ButSignUp}>
            Log in with <img src={`${logoGoogle}`} className={style.google} alt="GoogleLogo"/>
        </button>

        <h2 className={style.orH2}>Or</h2>
        <h2 className={style.finalH2}>Do you already have an account?</h2>


        {errorsLog && (<p className={style.orH2}>{errorsLog}</p>)} 
        <TextField onChange={handleChangeRegistered} name="email" value={registered.email}  id="filled-8" label="Email" variant="standard" color='info' sx={{marginTop: '0.5rem'}}/>
        <TextField onChange={handleChangeRegistered} name="password"  value={registered.password} id="filled-9" label="Password" variant="standard" color='info' sx={{marginTop: '0.5rem'}}/>
        

        <div className={style.contLogin}>
        <button onClick={handleLogin} type='button' className={style.ButLogin}>Log in</button>
        </div>

        <p>Did you forget your password? <a onClick={changePasswordForm} className={style.forget}>get it back.</a></p>
        {
            handleChangePassword ? (
                <TextField id="filled-10" label="Email" variant="standard" color='info' />
                ) : null
            }
        </div>
    
    
            </form>
    </div>
  )
}

export default FormAuth0