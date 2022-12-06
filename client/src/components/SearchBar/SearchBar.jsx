import React from "react";
import { useDispatch } from "react-redux";
import { Stack, TextField } from "@mui/material";

import { getCoinByName } from "../../redux/actions";

const SearchBar = ({setCurrentPage, coin, setCoin}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setCoin(e.target.value);
  };
  

  React.useEffect(() => {
    dispatch(getCoinByName(coin));
    setCurrentPage(1);
    //setCoin("");
  }, [coin, setCurrentPage, dispatch])

  return (
    <Stack
      direction="row"
      sx={{
        marginLeft: "7vh",
        marginTop: "5vh",
        width: "80%",
      }}
    >
      
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
    
    </Stack>
  );
};

export default SearchBar;
