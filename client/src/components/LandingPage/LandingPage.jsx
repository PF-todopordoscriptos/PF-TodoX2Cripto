import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingCoins } from "../../redux/actions";
import CoinCard from "../CoinCard/CoinCard";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Brontosaurio from "../../Images/Brontosaurio.png";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const trendingCoins = useSelector((state) => state.trendingCoins);
  console.log(trendingCoins);

  useEffect(() => {
    dispatch(getTrendingCoins());
  }, [dispatch]);

  return (
    <>
      <div>
        <Link to="/home">
          <Button variant="contained" color="secondary">
            Home
          </Button>
        </Link>
      </div>
      <div className="boximage">
        <div className="box">
          <Box sx={{ width: "50%" }}>
            <h2 className="trending-coins">Trending Coins</h2>

            <Grid sx={{ gap: 2 }} container spacing={{ xs: 2 }}>
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
        {/* <div className="image">
          <img src={Brontosaurio} alt="error" />
        </div> */}
      </div>
    </>
  );
};

export default LandingPage;
