import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";

const Comparative = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);
  const allCoins = useSelector((state) => state.allCoins);
  console.log(allCoins);

  const [coinSell, setCoinSell] = useState({});
  const [coinBuy, setCoinBuy] = useState({});
  const [amount, setAmount] = useState("");

  const PriceSellCoin = () => {
    let result;
    let coinSelected = allCoins.find((p) => p.id === coinSell);
    Object.keys(coinSell).length === 0
      ? (result = "Select one coin to start comparation")
      : (result = coinSelected.current_price);
    return result;
  };

  const PriceBuyCoin = () => {
    let result;
    let coinSelected = allCoins.find((p) => p.id === coinBuy);
    Object.keys(coinBuy).length === 0
      ? (result = "Select one coin to start comparation")
      : (result = coinSelected.current_price);
    return result;
  };

  const handleCoinsSell = (e) => {
    e.preventDefault();
    setCoinSell(e.target.value);
  };

  const handleCoinsBuy = (e) => {
    e.preventDefault();
    setCoinBuy(e.target.value);
  };

  function handleInput(e) {
    e.preventDefault();
    setAmount(e.target.value);
  }

  return (
    <div>
      <div>
        <div>
          <h3>Comparativo</h3>
          <label>CryptoSell:</label>
          <select onChange={(e) => handleCoinsSell(e)}>
            <option value="none">None</option>
            {allCoins &&
              allCoins.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.id}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label>CantidadSell:</label>
          <input
            type="number"
            placeholder="Select amount"
            value={amount}
            onChange={(e) => handleInput(e)}
          />
          <label>CryptoBuy:</label>
          <select onChange={(e) => handleCoinsBuy(e)}>
            <option value="none">None</option>
            {allCoins &&
              allCoins.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.id}
                  </option>
                );
              })}
          </select>
          <label>
            CantidadBuy: {(amount * PriceSellCoin()) / PriceBuyCoin()}
          </label>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Comparative;
