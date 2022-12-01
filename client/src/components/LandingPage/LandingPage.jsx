import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch();
  const trendingCoins = useSelector((state) => state.trendingCoins);

  useEffect(() => {
    dispatch(getTrendingCoins());
  });
  return <div>LandingPage</div>;
};

export default LandingPage;
