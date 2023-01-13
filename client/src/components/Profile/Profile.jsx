/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUserInfo, updateUserInfo } from "../../redux/actions/index.js";

import style from "./Profile.module.css";
import TextField from "@mui/material/TextField";
import SelectNat from "../SelectNat/SelectNat";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import lapizNegro from "../../Images/lapizNegro.png";
import lapizGris from "../../Images/lapizGris.png";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// const backendUrl = "http://localhost:3001"
const backendUrl = "https://todox2cripto-backend.onrender.com"

const Profile = () => {
  

  // const history = useHistory();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(true);

  const [user, setUser] = useState({
    email: "",
    uid: "",
    //password: ""
  });

  const changeEdit = () => {
    setEdit(!edit);
  };

  const userInfo = useSelector((state) => state.userInfo);
  const userInfo2 = userInfo;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
          uid: currentUser.uid,
          //password: currentUser.password,
        });

        //dispatch(postUser(currentUser));
      } else {
        setUser({
          email: "",
        });
      }
    });
    // eslint-disable-next-line
  }, [dispatch, userInfo]);

  React.useEffect(() => {
    dispatch(getUserInfo(user.email));

    // eslint-disable-next-line
  }, [user.email]);

  const [input, setInput] = useState({
    username: "",
    name: "",
    lastname: "",
    img: "",
    // telephone: "",
    // dni: "",
    nationality: "",
  });

  React.useEffect(() => {
    setInput({
      username: userInfo !== "" ? userInfo.username : "",
      name: userInfo.name,
      lastname: userInfo.lastname,
      // telephone: userInfo.telephone,
      // dni: userInfo.dni,
      nationality: userInfo.nationality,
      img: userInfo.img,
    });

    // eslint-disable-next-line
  }, [dispatch, userInfo2]);

  const [loading, setLoading] = useState(false);
  // const [image,setImage] = useState("")

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "cripto");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpb5vf1q1/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setInput({
      ...input,
      [e.target.name]: file.secure_url,
    });

    setLoading(false);
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async (e) => {
    // e.preventDefault()
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      iconColor: "#8EFF60",
      title: `User modified successfully.`,
      color: "white",
      background: "#1db722d3",
    });
    navigate("/home");
    dispatch(updateUserInfo(user.email, input));
    setEdit(!edit);
  };

  const handleClick = (e) => {
    e.preventDefault();

    let qq = localStorage.getItem("store").split("}");
    let array = [];
    qq.pop();
    qq.forEach((e) => array.push(JSON.parse(e.split("").concat("}").join(""))));
    let ww = array.map(function (e) {
      return {
        idCoin: e.idCoin,
        quantity: e.quantity,
        price: parseFloat(e.price),
      };
    });

    ww.map((e) => {
      axios.post(`${backendUrl}/users/addTransactionCart`, {
        idUser: userInfo.id,
        idCoin: e.idCoin,
        quantity: e.quantity,
        price: e.price,
      });
    });

    // localStorage.setItem("store", "");
  };

  return (
    <div className={style.divAll}>
      <form>
        <div className={style.contDivs}>
          <div className={style.divsInputs}>
            <div className={style.parteUno}>
              <div className={style.contFoto}>
                <img
                  src={
                    input.img
                      ? input.img
                      : "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1672942978/dinox_pic_mkcd4k.png"
                  }
                  alt="foto de perfil"
                  className={style.fotoPerfil}
                />
                <input
                  accept="image/*"
                  id="raised-button-file"
                  multiple
                  type="file"
                  name="img"
                  style={{ display: "none" }}
                  disabled={edit ? true : null}
                  onChange={uploadImage}
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
                value={user.email}
                id="filled-2"
                name="email"
                label="Email"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled
              />

              <TextField
                value={input.username}
                onChange={handleInput}
                id="filled-3"
                name="username"
                label="Username"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />

              <TextField
                value={input.name}
                onChange={handleInput}
                id="filled-4"
                name="name"
                label="Name"
                variant="standard"
                color="info"
                sx={{ marginTop: "2rem", width: "20rem" }}
                disabled={edit ? true : null}
              />

              <TextField
                value={input.lastname}
                onChange={handleInput}
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
                    alt="Editar Habilitado"
                  />
                ) : (
                  <img
                    onClick={changeEdit}
                    className={style.lapiz}
                    src={`${lapizGris}`}
                    alt="Editar Deshabilitado"
                  />
                )}
              </div>

              <div className={style.contNation}>
                <SelectNat
                  value={input.nationality}
                  onChange={handleInput}
                  edit={edit}
                />
              </div>
            </div>
          </div>

          <div className={style.contButton}>
            <button className={style.butChanges} onClick={saveChanges}>
              Save changes
            </button>
          </div>
          <div className={style.contButton}>
            <button
              className={style.butChanges}
              onClick={(e) => {
                handleClick(e);
                navigate("/cart");
              }}
            >
              Carrito
            </button>
          </div>
          <div className={style.contButton}>
            <button
              className={style.butChanges}
              onClick={(e) => {
                navigate("/home");
              }}
            >
              Home
            </button>
          </div>

          <div className={style.divDinosaurio}>
            <marquee behavior="scroll" direction="left">
              <img
                className={style.dinosaurio}
                src="https://media3.giphy.com/media/e5RXnHeokFGMsOUMMm/giphy.gif?cid=6c09b95217a7b5ed944209a47fe302510eb22ef9574ad7ba&rid=giphy.gif&ct=s"
                alt="Dinosaurio con onda"
              />
            </marquee>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
