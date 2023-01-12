import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import {
  // addCartBack,
  // addTransaction,
  // addTransactionCart,
  deleteCartUser,
  getCartUser,
  getUserInfo,
  sendMail,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Exito.module.css";

const Exito = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const userInfo = useSelector((state) => state.userInfo);
  const [user, setUser] = useState({
    email: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
        });
      }
    });
    // eslint-disable-next-line
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getUserInfo(user.email));
    // eslint-disable-next-line
  }, [user.email]);

  useEffect(() => {
    dispatch(getCartUser(userInfo.id));
    // eslint-disable-next-line
  }, [userInfo]);
  
  useEffect(() => {
    console.log(user.email)
    console.log("aca se mandaria")
    dispatch(sendMail(user.email));
    // eslint-disable-next-line
  }, [user.email]);

  useEffect(() => {
    dispatch(function addToTransaction() {
      userCart.forEach(async (e) => {
        await axios.post(`http://localhost:3001/users/addTransaction`, {
          idUser: e.idUser,
          idCoin: e.idCoin,
          quantity: e.quantity,
          price: e.price,
        });
      });
    });
  }, [dispatch, userCart]);

  // // useEffect(() => {
  // //     dispatch(deleteCartUser(userInfo.idUser));
  // // }, [userInfo.id]);

  // const transaccion = (  ) =>{
  //    const idUser= userInfo.idUser
  //    const idCoin= userInfo.idCoin
  //    const quantity= userInfo.quantity
  //    const price= userInfo.price
  //    dispatch(addTransaction(idUser,idCoin,quantity,price))
  // }

  console.log(userCart);
  //   function addToTransaction() {
  //     userCart
  //       .forEach(async (e) => {
  //         await axios.post(`http://localhost:3001/users/addTransaction`, {
  //           idUser: e.idUser,
  //           idCoin: e.idCoin,
  //           quantity: e.quantity,
  //           price: e.price,
  //         });
  //       })
  //   }
  const clearCart = () => {
    dispatch(deleteCartUser(userInfo.id));
  };
  return (
    <div className={style.contExito}>
      <h1 className={style.textCompra}>Compra realizada con exito!</h1>
      <img
        src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673311496/giphy_rsmxuw.gif"
        alt="gif dino"
        className={style.dino}
      />
      <button onClick={clearCart} className={style.butCompra}>
        <Link to="/home" className={style.link}>
          Volver a Inicio
        </Link>
      </button>
    </div>
  );
};

export default Exito;
