import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";

const Calculator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);
  const allCoins = useSelector((state) => state.allCoins);

  const [coin, setCoin] = useState({});
  const [price, setPrice] = useState("");

  const renderPriceCoin = () => {
    let result;
    let coinSelected = allCoins.find((p) => p.id === coin);
    Object.keys(coin).length === 0
      ? (result = "Select one coin to start comparation")
      : (result = coinSelected.current_price);
    return result;
  };

  const handleSelectedCoins = (e) => {
    e.preventDefault();
    setCoin(e.target.value);
  };

  function handleInput(e) {
    e.preventDefault();
    setPrice(e.target.value);
  }

  return (
    <div>
      <div>
        <div>
          <h3>Coin Exchange</h3>
          <select onChange={(e) => handleSelectedCoins(e)}>
            <option value="none">None</option>
            {allCoins &&
              allCoins.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
          </select>
          <label>Price: U$D{renderPriceCoin()}</label>
        </div>
        <div>
          <label>Buy:</label>
          <input
            type="number"
            placeholder="Select amount"
            value={price}
            onChange={(e) => handleInput(e)}
          />
          <label>You are going to buy: {price / renderPriceCoin()} coins</label>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Calculator;
