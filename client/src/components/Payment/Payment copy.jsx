import React from "react";
import axios from 'axios';

export default function Payment() {
  // https://random.dog/af625dd3-212d-421e-ab31-5439d150fa9a.jpg
  let number = 0.00000023
  let product = {
    title: 'bitcoin',
    image: 'https://random.dog/1400de7f-00a2-4ddd-b40f-1c9040105401.JPG',
    description: 'description 456',
    amount: number.toFixed(10), // CANTIDAD DE DECIMALES, VALOR FIJO
    price: 1
  }
  return (
    <div>
      <p>{product.title}</p>
      <img src={product.image} alt=''/>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button
        onClick={() => {
          axios.post('http://localhost:3001/users/payment', product)
          .then((res) => window.location.href = res.data.response.body.init_point)
        }}
      >Comprar</button>
    </div>
  );
}