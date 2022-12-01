import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingCoins } from "../../redux/actions";

const LandingPage = () => {

  const dispatch = useDispatch();
  const trendingCoins = useSelector((state) => state.trendingCoins);
  console.log(trendingCoins);

  useEffect(() => {
    dispatch(getTrendingCoins());
  }, [dispatch]);
  
  return (
    <div>
      <div>LandingPage</div>
      <div>
        {trendingCoins &&
          trendingCoins.map((e) => {
            return <h1>{e.name}</h1>;
          })}
      </div>
    </div>
  );
};

export default LandingPage;
