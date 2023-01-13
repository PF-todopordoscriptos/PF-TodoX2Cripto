/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins, getCoinsFromDB } from "../../redux/actions";
import CoinTarget from "../CoinTarget/CoinTarget";

import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

import DinoError404 from "../../Images/DinoError404.jpg";

import { Pagination, Stack, Typography } from "@mui/material";

import Filter from "../Filter/Filter";

// import ProductItem from "../ProductItem/ProductItem";
// import {
//   ADD_TO_CART,
//   CLEAR_CART,
//   REMOVE_ALL_FROM_CART,
//   REMOVE_ONE_FROM_CART,
// } from "../../redux/actions/actionTypes";

export default function Home() {
  localStorage.getItem("store") === null && localStorage.setItem("store", "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCoinsFromDB());
  }, [dispatch]);

  const allCoins = useSelector((state) => state.allCoins);
  const coinsDb = useSelector((state) => state.coinsDb);

  const cart = useSelector((state) => state.cart);

  const [order, setOrder] = useState(" ");

  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  const lastCoin = currentPage * coinsPerPage;
  const firstCoin = lastCoin - coinsPerPage;

  const coinsDb2 = coinsDb.filter((c) => c.disabled === false);

  let allCoins2 = [];
  for (var i = 0; i < allCoins.length; i++) {
    for (var j = 0; j < coinsDb2.length; j++) {
      if (allCoins[i].id === coinsDb2[j].id) {
        allCoins2.push(allCoins[i]);
      }
    }
  }
  const currentCoins = allCoins2.slice(firstCoin, lastCoin);

  const paginado = (e, p) => {
    setCurrentPage(p);
  };

  const [coin, setCoin] = useState("");

  return (
    <div className={style.contTodo}>
      <div className={style.homeCss}>
        <div className={style.contButons}>
          <SearchBar
            setCurrentPage={setCurrentPage}
            coin={coin}
            setCoin={setCoin}
          />
        </div>

        <div className={style.divFilterTargets}>
          <div className={style.contFilter}>
            <Filter
              setCurrentPage={setCurrentPage}
              setOrder={setOrder}
              setCoin={setCoin}
            />
          </div>

          <div className={style.targets}>
            {allCoins[0] === "Ninguna moneda coincide" ? (
              <div className={style.divDino}>
                <Stack>
                  <Typography variant="h3" color="primary.dark">
                    Not coin found
                  </Typography>
                  <img src={DinoError404} alt="error" />
                </Stack>
              </div>
            ) : (
              <div className={style.divAll}>
                <div className={style.divColumns}>
                  <h4 className={style.divColumnsH4uno}>Coin</h4>
                  <h4 className={style.divColumnsH4dos}>Last Price</h4>
                  <h4 className={style.divColumnsH4tres}>Price Change %</h4>
                  <h4 className={style.divColumnsH4cuatro}>Market Cap</h4>
                </div>

                <div className={style.divTargets}>
                  {currentCoins &&
                    currentCoins.map((c) => (
                      // <NavLink to={"/details/" + c.id} key={c.id}>
                      <CoinTarget
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        symbol={c.symbol}
                        current_price={c.current_price}
                        image={c.image}
                        market_cap={c.market_cap}
                        price_change_percentage_24h={
                          c.price_change_percentage_24h
                        }
                      />
                      //  </NavLink>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={style.contPagination}>
          <Pagination
            style={{ color: "red" }}
            count={Math.ceil(allCoins.length / 10)}
            variant="outlined"
            color="secondary"
            onChange={paginado}
          />
        </div>
      </div>
    </div>
  );
}
