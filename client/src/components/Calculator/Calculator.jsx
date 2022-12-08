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

  const handleSelectedCoins = (e) => {
    e.preventDefault();
    setCoin("");
    console.log(e.target.value);
  };

  return (
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
    </div>
  );
};

export default Calculator;
