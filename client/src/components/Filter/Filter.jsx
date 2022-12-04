import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCoins } from "../../redux/actions";
import {
  orderQUOTES,
  orderRANKS,
  orderChangePercentage,
} from "../../redux/actions";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const Filter = ({ setCurrentPage, setOrder }) => {
  let dispatch = useDispatch();

  const handleReset = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getAllCoins());
    setQuote(null);
    setRank(null);
    setPercentage(null);
  };

  const handleOrderQuotes = (e) => {
    setCurrentPage(1);
    dispatch(orderQUOTES(e.target.value));
    setOrder(`Order by ${e.target.value}`);
    setQuote(e.target.value);
    setRank(null);
    setPercentage(null);
  };

  const handleOrderRanks = (e) => {
    setCurrentPage(1);
    dispatch(orderRANKS(e.target.value));
    setOrder(`Order by ${e.target.value}`);
    setRank(e.target.value);
    setQuote(null);
    setPercentage(null);
  };

  const handleOrderChangePercentage = (e) => {
    setCurrentPage(1);
    dispatch(orderChangePercentage(e.target.value));
    setOrder(`Order by ${e.target.value}`);
    setPercentage(e.target.value);
    setQuote(null);
    setRank(null);
  };

  const [quote, setQuote] = useState("");
  const [rank, setRank] = useState("");
  const [percentage, setPercentage] = useState("");

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Quotes</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={quote}
          onChange={handleOrderQuotes}
        >
          {/* <MenuItem value="All" disabled>Quotes</MenuItem> */}
          <MenuItem value="best">Best quoted</MenuItem>
          <MenuItem value="worst">Worst quoted</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Cap Rank</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={rank}
          onChange={handleOrderRanks}
        >
          <MenuItem value="-rank">Best Rank</MenuItem>
          <MenuItem value="+rank">Worst Rank</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Price Change %
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={percentage}
          onChange={handleOrderChangePercentage}
        >
          <MenuItem value="more">More</MenuItem>
          <MenuItem value="less">Less</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleReset}>
        REFRESH
      </Button>
    </div>
  );
};

export default Filter;
