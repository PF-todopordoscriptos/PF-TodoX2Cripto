import React, { useReducer } from "react";
import { ADD_TO_CART } from "../../redux/actions/actionTypes";
import { rootReducer, initialState } from "../../redux/reducer/index";
import CartItem from "../CartItem/CartItem";
import ProductItem from "../ProductItem/ProductItem";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const { products, cart } = state;

  const addToCart = (id) => {
    console.log(id);
    dispatch({ type: ADD_TO_CART, payload: id });
  };
  const delFromCart = () => {};
  const clearCart = () => {};

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="box">
        {products.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </article>
      <h3>Carrito</h3>
      <article className="box">
        <button onClick={clearCart}>Limpiar Carrito</button>
        {cart.map((item, index) => (
          <CartItem key={index} data={item} delFromCart={delFromCart} />
        ))}
      </article>
    </div>
  );
};

export default ShoppingCart;
