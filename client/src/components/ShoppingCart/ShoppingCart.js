import React, { useReducer } from "react";
import { rootReducer, initialState } from "../../redux/reducer/index";
import ProductItem from "../ProductItem/ProductItem";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const { products, cart } = state;

  const addToCart = (id) => {
    console.log(id);
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
      <article className="box"></article>
    </div>
  );
};

export default ShoppingCart;
