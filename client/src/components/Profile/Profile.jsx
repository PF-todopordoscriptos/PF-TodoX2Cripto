import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { useAuth0 } from "@auth0/auth0-react"

import { getUserInfo, postUser, postUserGoogle, updateUserInfo } from "../../redux/actions/index.js"

import style from "./Profile.module.css"
import TextField from '@mui/material/TextField';
import SelectNat from '../SelectNat/SelectNat';

import {
  // signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
// import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';


import lapizNegro from "../../Images/lapizNegro.png"
import lapizGris from "../../Images/lapizGris.png"

import Swal from "sweetalert2";

const Profile = () => {
    //const {user, isAuthenticated, logout} = useAuth0();
    
    // const history = useHistory();
    const dispatch = useDispatch();
    const [edit,setEdit] = useState(true)

    const [user, setUser] = useState({
      email: "",
      //password: ""
    })

    const changeEdit = () => {
      setEdit(!edit)
    }
    
    const userInfo = useSelector((state) => state.userInfo)
    const userInfo2 = userInfo
    
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            setUser({
                ...user,
                email: currentUser.email,
                //password: currentUser.password,
              })
              dispatch(postUser(currentUser));
            }else{
              console.log("SIGNED OUT");
              setUser({
                email: "",
              })
        }
      })
    }, [dispatch, userInfo]);
    
    console.log(auth)
    console.log(user) 
    console.log(userInfo)

    React.useEffect(() => {
      dispatch(getUserInfo(user.email))
      console.log("estado lleno")
    },[user.email])

    const [input,setInput] = useState({
      username: "",
      name: "",
      lastname: "",
      telephone: "",
      dni: "",
      nationality: "",
      img: ""
    })

    React.useEffect(() => {
      setInput({
        username: userInfo !== "" ? userInfo.username : "",
        name: userInfo.name,
        lastname: userInfo.lastname,
        telephone: userInfo.telephone,
        dni: userInfo.dni,
        nationality: userInfo.nationality,
      })
      console.log("userinfo2")
      console.log(userInfo2)
    },[dispatch, userInfo2])


    const [loading, setLoading] = useState(false);
    // const [image,setImage] = useState("")

    const uploadImage = async(e) => {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "cripto");
      setLoading(true);
      console.log(loading)
      console.log(data)
      console.log("hola")
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpb5vf1q1/image/upload",
        {
          method: "POST",
          body: data
        }
      )
      const file = await res.json();
      console.log(res)
      // setImage(file.secure_url)
      setInput({
        ...input,
        [e.target.name] : file.secure_url
      })
      console.log(file.secure_url)
      setLoading(false)
    }
    
    const handleInput = (e) => {
      setInput({
        ...input,
        [e.target.name] : e.target.value,
    })
    console.log(input)
    }

    const saveChanges = async(e) => {
      // e.preventDefault()
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
        title: `User modified successfully .`,
        color: "white",
        background: "#66E9FE",
      });
      dispatch(updateUserInfo(user.email,input))
    setEdit(!edit)
  }

  // const numberPic = () => {
  //   let resultado = Math.round(Math.random()*10)
  //   if(resultado > 8){
  //     resultado = 8
  //   }
  //   return resultado


  const arrayPics = [
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212679/cripto/DinoPerfil1_ftceos.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212679/cripto/DinoPerfil2_qcuyeq.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212679/cripto/DinoPerfil3_aeo4th.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212679/cripto/DinoPerfil4_cnadk5.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212679/cripto/DinoPerfil5_ootzr5.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212679/cripto/DinoPerfil6_qo4xku.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212680/cripto/DinoPerfil7_q5n3qh.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212680/cripto/DinoPerfil8_anihxb.png",
    "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671212680/cripto/DinoPerfil9_mxcnkj.png",
  ]

  return (
    <div className={style.divAll}>
        <form>

        <div className={style.contDivs}>
        <div className={style.divsInputs}>

          <div className={style.parteUno}>
            
            <div className={style.contFoto}>
              {/* <img src={input.img} alt="foto de perfil" className={style.fotoPerfil}/> */}
              <img src={input.img !== "" ? input.img : arrayPics[Math.round(Math.random()*10)]}
              alt="foto de perfil" className={style.fotoPerfil}/>
              <input accept="image/*" id="raised-button-file" multiple type="file" name="img" style={{ display: 'none' }} disabled={edit ? true : null} onChange={uploadImage}/>
              <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" style={{marginLeft: "1rem",marginTop: "2rem", backgroundColor: "#a06aeb55"}} disabled={edit ? true : null}> Upload Image </Button>
              </label> 
            </div>

          <TextField value={user.email} id="filled-2" name="email" label="Email" variant="standard" color='info' sx={{marginTop: '2rem', width:'20rem'}} disabled/>
          <TextField value={input.username} onChange={handleInput} id="filled-3" name="username" label="Username" variant="standard" color='info' sx={{marginTop: '2rem', width:'20rem'}} disabled={edit ? true : null}/>
          <TextField value={input.name} onChange={handleInput} id="filled-4" name="name" label="Name" variant="standard" color='info' sx={{marginTop: '2rem', width:'20rem'}} disabled={edit ? true : null}/>
          <TextField value={input.lastname} onChange={handleInput} id="filled-5" name="lastname" label="Lastname" variant="standard" color='info' sx={{marginTop: '2rem', width:'20rem'}} disabled={edit ? true : null}/>
          </div>

          <div className={style.parteDos}>
            
          <div className={style.contLapiz}>
            {
              edit ? <img onClick={changeEdit} className={style.lapiz} src={`${lapizNegro}`} alt="lapiz"/> : <img onClick={changeEdit} className={style.lapiz} src={`${lapizGris}`} alt="lapiz"/>
              edit ? <img onClick={changeEdit} className={style.lapiz} src={`${lapizNegro}`} alt='Editar Habilitado'/> : <img onClick={changeEdit} className={style.lapiz} src={`${lapizGris}`} alt='Editar Deshabilitado'/>
            }

          </div>
          <TextField value={input.telephone} onChange={handleInput} id="filled-6" name="telephone" label="Telephone" variant="standard" color='info' sx={{marginTop: '2rem', width:'20rem'}} disabled={edit ? true : null}/>
          <TextField value={input.dni} onChange={handleInput} type="number" id="filled-7" name="dni" label="DNI" variant="standard" color='info' sx={{marginTop: '2rem', width:'20rem'}} disabled={edit ? true : null}/>

          <div className={style.contNation}>
          <SelectNat
          value={input.nationality}
          onChange={handleInput}
          edit= {edit}
          />
          </div>

          </div>
        </div>


      <div className={style.contButton}>
        <button className={style.butChanges} onClick={saveChanges}>Save changes</button>
      </div>

      <div className={style.divDinosaurio}>
      <marquee  behavior="scroll" direction="left">
        <img className={style.dinosaurio} src='https://media3.giphy.com/media/e5RXnHeokFGMsOUMMm/giphy.gif?cid=6c09b95217a7b5ed944209a47fe302510eb22ef9574ad7ba&rid=giphy.gif&ct=s'alt='Dinosaurio con onda'/>
        </marquee>
      </div>

         </div>
        </form>
    </div>
  );
};

export default Profile;
