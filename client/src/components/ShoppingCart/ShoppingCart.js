import React, { useEffect, useState } from "react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  ADD_ONE_FROM_CART,
} from "../../redux/actions/actionTypes";
import { rootReducer, initialState } from "../../redux/reducer/index";
import CartItem from "../CartItem/CartItem";
import ProductItem from "../ProductItem/ProductItem";
import { getAllCoins, getUserInfo, getCartUser, deleteCartUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const ShoppingCart = () => {
  // const [state, dispatch] = useReducer(rootReducer, initialState);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const userCart = useSelector((state) => state.userCart);
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


console.log(userCart)


  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const allCoins = useSelector((state) => state.allCoins);
  const cartCoins = useSelector((state) => state.cart);
  
  const addToCart = (id) => {
  
    dispatch({ type: ADD_TO_CART, payload: id });
  };
  const delFromCart = (id, all = false) => {
    
    if (all) {
      dispatch({ type: REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const addOneFromCart = (id) => {
    
    dispatch({ type: ADD_ONE_FROM_CART, payload: id });
  };

  const clearCart = () => {
    dispatch(deleteCartUser(userInfo.id));
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      {/* <article className="box">
        {cartCoins.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </article> */}
      <h3>Carrito</h3>
      <article className="box">
        <button onClick={clearCart}>Limpiar Carrito</button>
<div>
          {userCart.length !== 0 ? (
            userCart.map((i) => {
              return (
                <div key={i.id}>
<label>{i.idCoin}</label>
<label>{i.price}</label>
<label>{i.quantity}</label>
                </div>
              );
            })
          ) : (
            <div>
              <p>Carrito vacío</p>
            </div>
          )} 
</div>

{/* 
        {cartCoins.map((item, id) => (
          <CartItem
            key={id}
            data={item}
            delFromCart={delFromCart}
            addOneFromCart={addOneFromCart}
          />
        ))} */}

      </article>
    </div>
  );
};

export default ShoppingCart;
