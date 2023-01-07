import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";

import style from "./Calculator.module.css"
import TextField from "@mui/material/TextField";

const Calculator = ({id}) => {
  const dispatch = useDispatch();
  const [coin, setCoin] = useState({});
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getAllCoins());
    setCoin(id)
  }, [dispatch]);
  const allCoins = useSelector((state) => state.allCoins);


  const renderPriceCoin = () => {
    let result;
    let coinSelected = allCoins.find(() => `${id}` === coin);
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
          {/* <select onChange={(e) => handleSelectedCoins(e)}>
            <option value={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</option>
            {allCoins &&
              allCoins.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
          </select> */}
          {/* <input type="text" value={id.charAt(0).toUpperCase() + id.slice(1)} name={id} disabled/> */}
          <TextField id="outlined-basic" variant="outlined" value={id.charAt(0).toUpperCase() + id.slice(1)} name={id} disabled/>
          
          <label>Price: U$D{renderPriceCoin()}</label>
        </div>
        <div>
          {/* <label>Buy:</label> */}
          {/* <input
            type="number"
            placeholder="Select amount"
            value={price}
            onChange={(e) => handleInput(e)}
          /> */}
          <TextField value={price} id="outlined-number" label="Buy" type="number" placeholder="Select amount" InputLabelProps={{shrink: true}} onChange={(e) => handleInput(e)} sx={{width: "9vw"}}/>
        </div>
          <label>You are going to buy: {price / renderPriceCoin()} coins</label>
      </div>
      <div></div>
    </div>
  );
};

export default Calculator;
