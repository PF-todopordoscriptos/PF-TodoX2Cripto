import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCoinDetail } from "../../redux/actions";
import HistoryChart from "../Chart/Chart";

const Details = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  console.log(id);
  useEffect(() => {
    dispatch(getCoinDetail(props.match.params.id));
  }, [dispatch, props]);

  const coinDetails = useSelector((state) => state.coinDetails);

  console.log(coinDetails);
  return (
    <div>
      Details
      <NavLink to="/home">
        <button> Pagina Principal</button>
      </NavLink>
      <div>
        <h1>{coinDetails.id}</h1>
        <img src={coinDetails.image} alt={coinDetails.id} />
        <ul>
          <li>Market Cap: {coinDetails.market_cap}</li>
          <li>Variation: {coinDetails.price_change_percentage_24h}</li>
        </ul>
      </div>
      <div>
        <HistoryChart id={id} />
      </div>
    </div>
  );
};

export default Details;
