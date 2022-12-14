import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import TextField from "@mui/material/TextField";
import { getUserInfo, getCoinDetail } from "../../redux/actions";

import style from "./Calculator.module.css";
// import "./Calculator.css";

import Swal from "sweetalert2";

// const backendUrl = "http://localhost:3001"
const backendUrl = "https://todox2cripto-backend.onrender.com"

const Calculator = ({ id }) => {
  const dispatch = useDispatch();
  const [coin, setCoin] = useState({});
  console.log(coin);
  const [price, setPrice] = useState("");
  const userInfo = useSelector((state) => state.userInfo);
  const [user, setUser] = useState({
    email: "",
  });
  useEffect(() => {
    dispatch(getUserInfo(user.email));
    // eslint-disable-next-line
  }, [user.email]);

  useEffect(() => {
    // dispatch(getAllCoins());
    dispatch(getCoinDetail(id));
    setCoin(id);
    // eslint-disable-next-line
  }, [dispatch]);

  const coinDetails = useSelector((state) => state.coinDetails);

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

  function handleInput(e) {
    e.preventDefault();
    setPrice(e.target.value);
  }

  const idUser = userInfo.id;
  const idCoin = id;
  // const quantity= price / renderPriceCoin()
  const quantity = price / coinDetails.current_price;

  const addItem = () => {
    // if(price === ""){
    //   return alert("Select an amount")
    // }
    setPrice("");
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
      title: `Coin added to cart.`,
      color: "white",
      background: "#E6112B",
    });
  };

  function saveToLocalStore() {
    let fromStore = localStorage.getItem("store");
    let newConcat = fromStore.concat(
      JSON.stringify({ idCoin: idCoin, quantity: quantity, price: price })
    );
    localStorage.setItem("store", newConcat);
  }

  return (
    <div className={style.preCartContainer}>
      <h3 className={style.titlePreCart}>Pre Cart</h3>

      <TextField
        id="outlined-basic"
        variant="outlined"
        value={id.charAt(0).toUpperCase() + id.slice(1)}
        name={id}
        disabled
      />

      <label>Price: U$D{coinDetails.current_price}</label>

      <TextField
        value={price}
        id="outlined-number"
        label="Buy"
        type="number"
        placeholder="Select amount"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => handleInput(e)}
      />

      <label>
        You are going to buy: {price / coinDetails.current_price} coins
      </label>

      {price === "" ? ( //por si esta vacio el amount lo establezco en disabled :)
        <button className={style.buttonPreCart} disabled>
          {
            <img
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673118030/carrito_dydtjj.png"
              alt="cart"
              className={style.carrito}
            />
          }
        </button>
      ) : (
        <button
          className={style.buttonPreCart}
          onClick={
            idUser === undefined
              ? () => saveToLocalStore() + addItem()
              : () => {
                  addItem();
                  axios.post(`${backendUrl}/users/addTransactionCart`, {
                    idUser,
                    idCoin,
                    quantity,
                    price,
                  });
                  // addItem()
                }
          }
        >
          {
            <img
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673118030/carrito_dydtjj.png"
              alt="cart"
              className={style.carrito}
              // onClick={addItem}
            />
          }
        </button>
      )}
    </div>
  );
};

export default Calculator;
