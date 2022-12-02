import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Stack, TextField } from "@mui/material";

import { getCoinByName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [coin, setCoin] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setCoin(e.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(getCoinByName(coin));
  // }, [coin, dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (coin.length !== 0) {
      dispatch(getCoinByName(e.target.value));
      // history.push(`/details/${coin}`);
    } else {
      alert("You must enter a name!");
    }
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
      <form onSubmit={handleSubmit}>
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
