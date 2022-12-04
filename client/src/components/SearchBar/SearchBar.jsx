import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Stack, TextField } from "@mui/material";

import { getCoinByName } from "../../redux/actions";

const SearchBar = ({setCurrentPage}) => {
  const dispatch = useDispatch();
  const [coin, setCoin] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setCoin(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // if (coin.length !== 0) {
      setCurrentPage(1)
      dispatch(getCoinByName(coin));
      // history.push(`/details/${coin}`);
    // } else {
      // alert("You must enter a name!");
    // }
    setCoin("");
  }

  return (
    <Stack
      direction="row"
      sx={{
        marginTop: "30px",
        width: "80%",
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="outlined-basic"
          label="Buscar"
          placeholder="Bitcoin"
          variant="outlined"
          size="small"
          value={coin}
          onChange={(e) => handleChange(e)}
          sz={{
            width: "90%",
          }}
        />
      </form>
    </Stack>
  );
};

export default SearchBar;
