import React from "react";

const WalletUser = (props) => {
  const findImg = () => {
    let monedita = props.allCoins.find((c) => props.idCoin === c.id);

    return monedita.image;
  };

  return (
    <div>
      <img src={findImg()} alt="coinImg" />
      <h2>{props.idCoin}</h2>
      <h2>{props.quantity}</h2>
    </div>
  );
};

export default WalletUser;
