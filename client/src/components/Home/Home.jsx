import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getAllCoins } from "../../redux/actions";
import CoinTarget from "../CoinTarget/CoinTarget";
import { NavLink } from "react-router-dom";

import Grid from "@mui/system/Unstable_Grid";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

import DinoError404 from "../../Images/DinoError404.jpg";

import { Pagination, Stack, Typography } from "@mui/material";

import Filter from "../Filter/Filter";

import ProductItem from "../ProductItem/ProductItem";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../../redux/actions/actionTypes";

export default function Home() {
  localStorage.getItem("store") === null && localStorage.setItem("store", "")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const allCoins = useSelector((state) => state.allCoins);
  console.log(allCoins);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
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
