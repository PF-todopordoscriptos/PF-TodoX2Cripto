import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";
import "./Comparative.css";

const Comparative = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);
  const allCoins = useSelector((state) => state.allCoins);
  console.log(allCoins);

  const [coinSell, setCoinSell] = useState({});
  const [coinBuy, setCoinBuy] = useState({});
  const [amount, setAmount] = useState(0);

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
    <>
      <div className="comparative-mainContainer">
        <h3 className="comparative-title">Comparative Of Coins</h3>
        <div className="comparative-flexContainer">
          <label className="comparative-label">Crypto To Sell:</label>
          <select
            className="comparative-dropDown"
            onChange={(e) => handleCoinsSell(e)}
          >
            <option value="none">Select Crypto</option>
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
        <div className="comparative-flexContainer">
          <label className="comparative-label">Amount To Sell:</label>
          <input
            className="comparative-dropDown"
            type="number"
            placeholder="Select amount"
            value={amount}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="comparative-flexContainer">
          <label className="comparative-label">Crypto To Buy:</label>
          <select
            className="comparative-dropDown"
            onChange={(e) => handleCoinsBuy(e)}
          >
            <option value="none">Select Crypto</option>
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
        <label className="comparative-result">
          Amount To Buy: {(amount * PriceSellCoin()) / PriceBuyCoin()}
        </label>
      </div>
    </>
  );
};

export default Comparative;
