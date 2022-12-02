import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";
import CoinCard from "../CoinCard/CoinCard";
import Grid from "@mui/system/Unstable_Grid";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const allCoins = useSelector((state) => state.allCoins);

  return (
    <>
      <SearchBar />
      <Grid
        sx={{ gap: 2 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {allCoins &&
          allCoins.map((c) => (
            <NavLink to={"/details/" + c.id}>
              <CoinCard
                key={c.id}
                id={c.id}
                name={c.name}
                symbol={c.symbol}
                current_price={c.current_price}
                image={c.image}
                market_cap={c.market_cap}
                price_change_percentage_24h={c.price_change_percentage_24h}
              />
            </NavLink>
          ))}
      </Grid>
    </>
  );
}
