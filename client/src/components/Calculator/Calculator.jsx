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
  console.log(allCoins);

  const [coin, setCoin] = useState({});
  const [price, setPrice] = useState("");

  const renderPriceCoin = () => {
    let result;
    let coinSelected = allCoins.find((p) => p.id === coin);
    Object.keys(coin).length === 0
      ? (result = "Select one coin to start comparation")
      : (result = `Price: USD$ ${coinSelected.current_price}`);
    return result;
  };

  const renderCalculatedPrice = () => {
    let result;
    let coinSelected = allCoins.find((p) => p.id === coin);
    result = coinSelected.current_price;
    console.log(result);
    return result;
  };

  const handleSelectedCoins = (e) => {
    e.preventDefault();
    console.log(e.target);
    setCoin(e.target.value);
  };

  function handleInput(e) {
    e.preventDefault();
    setPrice(e.target.value);
  }

  return (
    <div>
      <div>
        <label>Coin Exchange</label>
        <select onChange={(e) => handleSelectedCoins(e)}>
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
        <label>{renderPriceCoin()}</label>
      </div>
      <div>
        <label>Buy:</label>
        <input
          type="number"
          placeholder="Select amount"
          value={price}
          onChange={(e) => handleInput(e)}
        />
        <label>{renderCalculatedPrice}</label>
      </div>
    </div>
  );
};

export default Calculator;
