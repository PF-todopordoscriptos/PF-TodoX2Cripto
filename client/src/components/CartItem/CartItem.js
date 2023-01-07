import React from "react";

const CartItem = ({ key, data, delFromCart }) => {
  let { id, name, current_price, quantity } = data;
  return (
    <div>
      <h4>{name}</h4>
      <h5>
        ${current_price}.00 x {quantity} = ${current_price * quantity}.00
      </h5>
      <button onClick={() => delFromCart(id)}>Eliminar Uno</button>
      <br />
      <button onClick={() => delFromCart(id, true)}>X</button>
    </div>
  );
};

export default CartItem;
