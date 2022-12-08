import React from 'react'
// import clsx from 'clsx';
import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import style from "./FormAuth0.module.css"
import TextField from '@mui/material/TextField';

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

import SelectNat from '../SelectNat/SelectNat';


const FormAuth0 = () => {
    // let user = {given_name: '', family_name: '', nickname: '', name: '', picture: '', email: "", email_verified: false, family_name: "", given_name: "", locale: "", sub: "", updated_at: ""}
    let { user, isAuthenticated, logout} = useAuth0()
    // console.log(user)
    const {loginWithPopup} = useAuth0()
    const [contador,setContador] = useState(1)
    const [handleChangePassword, sethandleChangePassword] = useState(false)

    let [input,setInput] = useState({
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
        nickname: "",
        lastname: "",
        telephone: "",
        dni: 0,
        nationality: "",
        showPassword: false,
        showRepeatPassword: false,
    })

    // React.useEffect(() => {
    //     setInput({
    //         ...input,
    //         [input.email] : user !== undefined ? user.email : null,
    //         [input.nickname] : user !== undefined ? user.nickname : null,
    //     })
    // }, [user])

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
        console.log(input)
    }

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
            showRepeatPassword: !input.showRepeatPassword });
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

        <button type='button' onClick={() => loginWithPopup()} className={style.ButSignUp}>
            Sign up with <img src={`${logoGoogle}`} className={style.google}/>
        </button>

        <h2 className={style.orH2}>Or</h2>

    
    {
        contador === 1 ? 
    <div className={style.contInputs}>
        {
            isAuthenticated ?  (
                
                <div className={style.contInputs}>
                    <TextField id="filled-basic" name="email" label="Email" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleEmail} value={`${user.email}`}/>

                    <TextField id="filled-basic" name="nickname" label="Username" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleNickname} value={`${user.nickname}`}/>
                </div>
            ) 
            :
            <div className={style.contInputs}>
                <TextField id="filled-basic" name="email" label="Email" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.email}`}/>

                <TextField id="filled-basic" name="nickname" label="Username" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.nickname}`}/>
        </div>
        }


        <div className={style.divPassword}>
        <TextField id="standard-adornment-password" type={input.showPassword ? 'text' : 'password'} name="password" label="Password" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.password}`}/>
        {
            input.showPassword ? <img className={style.ojo1} src={`${ojoAbierto}`} onClick={handleClickShowPassword}/> : <img className={style.ojo1} src={`${ojoCerrado}`} onClick={handleClickShowPassword} />
        }
        </div>

        <div className={style.divPassword}>
        <TextField id="standard-adornment-password" type={input.showRepeatPassword ? 'text' : 'password'} name="repeatPassword" label="Repeat password" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.repeatPassword}`}/>
        {
            input.showRepeatPassword ? <img className={style.ojo2} src={`${ojoAbierto}`} onClick={handleClickShowRepeatPassword}/> : <img className={style.ojo2} src={`${ojoCerrado}`} onClick={handleClickShowRepeatPassword}/>
        }
        </div>
    </div>

        : 
        contador === 2 ?
        <div className={style.contInputs}>
            <TextField id="filled-basic" name="name" label="Name" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.name}`}/>

            <TextField id="filled-basic" name="lastname" label="Last name" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.lastname}`}/>
        </div>

        : 
        contador === 3 ?
        <div className={style.contInputs}>
            <TextField id="filled-basic" name="telephone" label="Telephone" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.telephone}`}/>

            <TextField id="filled-basic" name="dni" label="DNI" variant="standard" color='info' sx={{marginTop: '0.5rem'}} onChange={handleInput} value={`${input.dni}`}/>

            <SelectNat
            value={input.nationality}
            onChange={handleInput}
            />
        
        </div> : null
    }


        <div className={style.buttonsDiv}>
        {
            contador>1? <button type='button' onClick={setPrev} className={style.butNext}>Prev</button> : null
        }
        <button type='button' onClick={setNext} className={style.butNext}>Next</button>
        </div>
        
        </div>
        
        <div className={style.parteDos}>
        <h2 className={style.finalH2}>Do you already have an account?</h2>


        <TextField id="filled-basic" label="Email" variant="standard" color='info' sx={{marginTop: '0.5rem'}}/>

        <TextField id="filled-basic" label="Password" variant="standard" color='info' sx={{marginTop: '0.5rem'}}/>

        <div className={style.contLogin}>
        <button type='button' className={style.ButLogin}>Log in</button>
        </div>

        <p>Did you forget your password? <a onClick={changePasswordForm} className={style.forget}>get it back.</a></p>
        {
            handleChangePassword ? (
                <TextField id="filled-basic" label="Email" variant="standard" color='info' />
                ) : null
            }
        </div>
    
    
            </form>
    </div>
  )
}

export default FormAuth0