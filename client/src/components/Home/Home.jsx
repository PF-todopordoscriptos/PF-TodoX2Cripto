import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";
import CoinCard from "../CoinCard/CoinCard";
import Grid from "@mui/system/Unstable_Grid";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css"

import { Link, Pagination, Stack, Typography } from "@mui/material";

import Filter from "../Filter/Filter";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const allCoins = useSelector((state) => state.allCoins);

  const [order, setOrder] = useState(" ");
  console.log(order);

  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  const lastCoin = currentPage * coinsPerPage;
  const firstCoin = lastCoin - coinsPerPage;
  const currentCoins = allCoins.slice(firstCoin, lastCoin);

  const paginado = (e, p) => {
    setCurrentPage(p);
  };

  const [coin, setCoin] = useState("");

  return (
    <>
    <div className={style.contButons}>

      <SearchBar
        setCurrentPage={setCurrentPage}
        coin={coin}
        setCoin={setCoin}
      />

      <div className={style.contFilter}>
      <Filter
        setCurrentPage={setCurrentPage}
        setOrder={setOrder}
        setCoin={setCoin}
      />
      </div>

      </div>

      <Typography
        variant="subtitle1"
        color="primary.dark"
        sx={{
          marginLeft: "1200px",
        }}
      >
        <Link href="/form">Register</Link>
      </Typography>

      {allCoins[0] === "Ninguna moneda coincide" ? (
        <Stack>
          <Typography variant="h3" color="primary.dark">
            Not coin found
          </Typography>
          <Typography variant="h5" color="primary.dark">
            Por favor refresca la pagina
          </Typography>
        </Stack>
      ) : (
        <Grid
          sx={{ gap: 2 }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {currentCoins &&
            currentCoins.map((c) => (
              // <NavLink to={"/details/" + c.id} key={c.id}>
              <CoinCard
                key={c.id}
                id={c.id}
                name={c.name}
                symbol={c.symbol}
                current_price={c.current_price}
                image={c.image}
                market_cap={c.market_cap}
                price_change_percentage_24h={`Price change: ${c.price_change_percentage_24h}%`}
              />
              // </NavLink>
            ))}
        </Grid>
      )}
      <div className={style.contPagination}>
      <Pagination
        count={Math.ceil(allCoins.length / 10)}
        variant="outlined"
        color="secondary"
        onChange={paginado}
      />
      </div>
    </>
  );
}
