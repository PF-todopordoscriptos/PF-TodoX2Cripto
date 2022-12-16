import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingCoins, getTrendingNews } from "../../redux/actions";
import TrendingCard from "../TrendingCard/TrendingCard";
import { Link } from "react-router-dom";

import style from "./LandingPag.module.css"
import TrendingNew from "../TrendingNew/TrendingNew";

const LandingPag = () => {
    const dispatch = useDispatch();
    const trendingCoins = useSelector((state) => state.trendingCoins);
    const trendingNews = useSelector((state) => state.trendingNews.slice(0,8))

    React.useEffect(() => {
        dispatch(getTrendingCoins());
        dispatch(getTrendingNews())
      }, [dispatch]);

      // console.log(trendingNews[0]["title"])
  return (
    <div className={style.all}>

      <div className={style.trending}>
          <h1 className={style.stTitulo}>Trending Coins</h1>
      </div>

      <div className={style.arriba}>
        <div className={style.izquierda}>
            {trendingCoins &&
                trendingCoins.map((e) => (
                  <TrendingCard
                    id={e.id}
                    key={e.id}
                    name={e.name}
                    image={e.large}
                    market_cap={e.market_cap_rank}
                    current_price={e.price_btc}
                  />
                ))}

        </div>
        <div className={style.derecha}>

          <Link to="/profile">
            <button className={style.stBut}>INGRESAR</button>
          </Link>

          <Link to="/home">
            <button className={style.stBut}>INICIAR COMO INVITADO</button>
          </Link>
          
        </div>
      </div>

      <div className={style.abajo}>
        <div>
          <h2 className={style.stBreaking}>Breaking News</h2>
        </div>

        <div className={style.divNews}>
        {trendingNews && 
            trendingNews.map((e) => (
              <TrendingNew
              id={e.title}
              key={e.title}
              title={e.title}
              description={e.description}
              link={e.link}
              pubDate={e.pubDate}
              country={e.country} 
              />
              ))
            }
        </div>
      </div>

    </div>
  )
}

export default LandingPag