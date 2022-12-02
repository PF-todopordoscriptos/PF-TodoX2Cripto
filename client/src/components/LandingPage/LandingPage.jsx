import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingCoins } from "../../redux/actions";
import CoinCard from "../CoinCard/CoinCard";
import Grid from '@mui/system/Unstable_Grid';

const LandingPage = () => {

  const dispatch = useDispatch();
  const trendingCoins = useSelector((state) => state.trendingCoins);
  console.log(trendingCoins);

  useEffect(() => {
    dispatch(getTrendingCoins());
  }, [dispatch]);
  
  return (
    <div>
      <div>
        <h1>LandingPage</h1>
        <h2>Trending Coins</h2>
      </div>

      <Grid sx={{ gap: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {trendingCoins &&
          trendingCoins.map((e) => (
            <CoinCard
            key={e.id}
            name={e.name}
            image={e.large}
            market_cap={e.market_cap_rank}
            current_price={e.price_btc}
            />
          )
        )}
      </Grid>
      

    
    </div>
  );
};

export default LandingPage;
