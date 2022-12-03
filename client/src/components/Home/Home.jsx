import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";
import CoinCard from "../CoinCard/CoinCard";
import Grid from "@mui/system/Unstable_Grid";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import { Pagination, Container } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const allCoins = useSelector((state) => state.allCoins);

  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  const lastCoin = currentPage * coinsPerPage;
  const firstCoin = lastCoin - coinsPerPage;
  const currentCoins = allCoins.slice(firstCoin, lastCoin);

  const paginado = (e, p) => {
    setCurrentPage(p);
  };

  return (
    <>
      <SearchBar />
      <Grid
        sx={{ gap: 2 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentCoins &&
          currentCoins.map((c) => (
            <NavLink to={"/details/" + c.id} key={c.id}>
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
      <Pagination
        count={Math.ceil(allCoins.length / 10)}
        variant="outlined"
        color="secondary"
        onChange={paginado}
      />
    </>
  );
}
