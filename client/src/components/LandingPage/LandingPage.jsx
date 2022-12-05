import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingCoins } from "../../redux/actions";
import CoinCard from "../CoinCard/CoinCard";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/material/Box";
import { Link, NavLink } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const trendingCoins = useSelector((state) => state.trendingCoins);
  console.log(trendingCoins);

  useEffect(() => {
    dispatch(getTrendingCoins());
  }, [dispatch]);

  return (
    <div>
      <div></div>
      <div>
        <h1>LandingPage</h1>
        <Link to="/home">
          <button>Mercados</button>
        </Link>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <h2>Trending Coins</h2>

        <Grid sx={{ gap: 2, width: "50%" }} container spacing={{ xs: 2 }}>
          {trendingCoins &&
            trendingCoins.map((e) => (
              <CoinCard
                id={e.id}
                key={e.id}
                name={e.name}
                image={e.large}
                market_cap={e.market_cap_rank}
                current_price={e.price_btc}
              />
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default LandingPage;
