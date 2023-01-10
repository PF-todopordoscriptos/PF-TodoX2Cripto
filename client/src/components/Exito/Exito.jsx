import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import {
  addCartBack,
  addTransaction,
  addTransactionCart,
  deleteCartUser,
  getCartUser,
  getUserInfo,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

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
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getUserInfo(user.email));
  }, [user.email]);

  useEffect(() => {
    dispatch(getCartUser(userInfo.id));
  }, [userInfo]);

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
    <div>
      <h1>para que ande</h1>
      <button onClick={clearCart}>
        <Link to="/home">Volver a Inicio</Link>
      </button>
    </div>
  );
};

export default Exito;
