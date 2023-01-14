import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import // ADD_TO_CART,
// REMOVE_ALL_FROM_CART,
// REMOVE_ONE_FROM_CART,
// ADD_ONE_FROM_CART,
// CLEAR_CART,
"../../redux/actions/actionTypes";
import {
  getAllCoins,
  getUserInfo,
  getCartUser,
  deleteCartUser,
  deleteCoinCart,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const userCart = useSelector((state) => state.userCart);
  const [reloader, setReloader] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });

  const[ayudin, setAyudin] = useState(true)

  console.log(userCart);
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
  }, [userInfo, ayudin]);

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const clearCart = () => {
    dispatch(deleteCartUser(userInfo.id));
  };

  let product = [];
  const productPayment = () => {
    userCart.map((e) =>
      product.push({
        title: e.idCoin,
        amount: e.quantity,
        price: e.price,
      })
    );
  };

  productPayment();

  console.log(product);

  function readFromLocalStore() {
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
    return ww;
  }

  const removeCoin = (id) =>{
    dispatch(deleteCoinCart(id))
    setAyudin(!ayudin)
  }

  console.log("LOCAL STORAGE", localStorage.getItem("store").length);
  console.log("USER CART", userCart);

  return userInfo.id === undefined ? (
    <div className="cart-container">
      <h2 className="title-cart">Carrito de Compras</h2>
      <h3 className="title-products">Productos</h3>
      <article>
        <div className="box">
          {readFromLocalStore().length !== 0 ? (
            readFromLocalStore().map((i) => {
              return (
                <div className="cart-box" key={i.id}>
                  <h4>{i.idCoin.toUpperCase()}</h4>
                  <p> Cantidad: {i.quantity}</p>

                  <p>{i.price.toFixed(2)} USD</p>
                </div>
              );
            })
          ) : (
            <div>
              <p className="carrito-vacio">---</p>
            </div>
          )}
        </div>
        {readFromLocalStore().length !== 0 ? (
          <div>
            <h3 className="title-carrito">
              Fee
              <span>
                {" "}
                {(
                  readFromLocalStore()
                    .map((e) => parseFloat(e.price))
                    .reduce((pv, cv) => pv + cv, 0) / 10
                ).toFixed(2)}{" "}
              </span>
              USD
            </h3>
            <h3 className="title-carrito">
              Total
              <span>
                {" "}
                {(
                  readFromLocalStore()
                    .map((e) => parseFloat(e.price))
                    .reduce((pv, cv) => pv + cv, 0) +
                  readFromLocalStore()
                    .map((e) => parseFloat(e.price))
                    .reduce((pv, cv) => pv + cv, 0) /
                    10
                ).toFixed(2)}{" "}
              </span>
              USD
            </h3>
            <Link to={"/signup"}>
              <button className="button-buy-crypto">BUY CRIPTO</button>
            </Link>
          </div>
        ) : null}
        <button
          className="button-clear-cart"
          onClick={() =>
            localStorage.setItem("store", "") + setReloader(!reloader)
          }
        >
          LIMPIAR CARRITO
        </button>
      </article>
    </div>
  ) : (
    <div className="cart-container">
      <h2 className="title-cart">Carrito de Compras</h2>
      <h3 className="title-products">Productos</h3>
      <article>
        <div className="box">
          {userCart.length !== 0 ? (
            userCart.map((i) => {
              return (
                <div className="cart-box" key={i.id}>
                  <label>{i.idCoin.toUpperCase()}</label>
                  <label>Cantidad: {i.quantity}</label>
                  <label>{i.price.toFixed(2)} USD</label>
                  <button type="button" onClick={() => removeCoin(i.id)} className="button-eliminar">X</button>
                </div>
              );
            })
          ) : (
            <div>
              <p className="carrito-vacio">---</p>
            </div>
          )}
        </div>
        {userCart.length !== 0 ? (
          <div>
            <h3 className="title-carrito">
              Fee
              <span>
                {" "}
                {(
                  userCart
                    .map((e) => parseFloat(e.price))
                    .reduce((pv, cv) => pv + cv, 0) / 10
                ).toFixed(2)}{" "}
              </span>
              USD
            </h3>
            <h3 className="title-carrito">
              Total
              <span>
                {" "}
                {(
                  userCart
                    .map((e) => parseFloat(e.price))
                    .reduce((pv, cv) => pv + cv, 0) +
                  userCart
                    .map((e) => parseFloat(e.price))
                    .reduce((pv, cv) => pv + cv, 0) /
                    10
                ).toFixed(2)}{" "}
              </span>
              USD
            </h3>
            <button
              className="button-buy-crypto"
              onClick={() => {
                axios
                  .post("http://localhost:3001/users/payment", product)
                  .then(
                    (res) =>
                      (window.location.href = res.data.response.body.init_point)
                  );
              }}
            >
              BUY CRIPTO
            </button>
          </div>
        ) : null}
        <button className="button-clear-cart" onClick={clearCart}>
          LIMPIAR CARRITO
        </button>
      </article>
    </div>
  );
};

export default ShoppingCart;
