import React from "react";
import style from "./TrendingCard.module.css";
import flecha from "../../Images/flechaGrafica.png";
import { Link } from "react-router-dom";

const TrendingCard = (props) => {
  return (
    <Link to={`/details/${props.id}`} underline="none">
      <div className={style.contTrending}>
        <img src={props.image} alt="img" className={style.stImage} />

        <div className={style.contText}>
          <h5 className={style.stName}>{props.name}</h5>

          <h4 className={style.stMarket}>(market cap)</h4>
        </div>

        <div className={style.contCap}>
          <img src={flecha} alt="flecha" className={style.stFlecha} />

          <h4 className={style.stCap}>{props.market_cap}</h4>
        </div>
      </div>
    </Link>
  );
};

export default TrendingCard;
