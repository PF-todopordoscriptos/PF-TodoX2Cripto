import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingCoins, getTrendingNews } from "../../redux/actions";
import TrendingCard from "../TrendingCard/TrendingCard";
import { Link } from "react-router-dom";
import style from "./LandingPag.module.css"
import TrendingNew from "../TrendingNew/TrendingNew";
import Brontosaurio from "../../Images/Brontosaurio.png";
import { CardMedia , Typography , Button } from '@mui/material';

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
    <div className={style.all} >
      <CardMedia sx={{ position: 'absolute' , display: 'flex', flexDirection: 'column' , mixBlendMode: 'multiply' , backgroundRepeat: 'no-repeat' , backgroundPosition: '100% 0' , backgroundImage: `url(${Brontosaurio})` , width: '100%', height: '90rem' , backgroundSize: '41%' }}></CardMedia>

      <div className={style.trending}>
          {/* <h1 className={style.stTitulo}>Trending Coins</h1> */}
          <Typography variant={'h1'} sx={{color: 'landingPage.upperHeader.color' , fontFamily: "'Lato', sans-serif" , fontSize: '80px'}}>Trending Coins</Typography>
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
          {/* <Link to="/profile">
            <Button sx={{ ':hover': {filter: 'brightness(1.1)' ,  transition: '.2s;' , backgroundColor: 'landingPage.button.background'} , transition: '.2s;' , backgroundColor: 'landingPage.button.background' , color: 'landingPage.button.text' , borderBottom: 3 , borderColor: 'landingPage.button.border' , fontWeight: 700, fontSize: 16 , borderRadius: '16px' , width: '7vw' , height: '5vh', padding: '0.3vh 0vh 0vh' , margin: '0.5vw'}}>INGRESAR</Button>
          </Link> */}
          <Link to="/home">
            <Button  sx={{ ':hover': {filter: 'brightness(1.1)' ,  transition: '.2s;' , backgroundColor: 'landingPage.button.background'} ,  transition: '.2s;' , backgroundColor: 'landingPage.button.background' , color: 'landingPage.button.text' , borderBottom: 3 , borderColor: 'landingPage.button.border' , fontWeight: 700, fontSize: 16 , borderRadius: '16px' , width: '12.5vw' , height: '5vh' , padding: '0.3vh 0vh 0vh'}} /* className={style.stBut} */>INICIAR</Button>
          </Link>
        </div>
      </div>

      <div className={style.abajo}>
        <div>
          {/* <h2 className={style.stBreaking}>Breaking News</h2> */}
          <Typography variant={'h1'} sx={{color: 'landingPage.lowerHeader.color' , fontFamily: "'Lato', sans-serif" , fontSize: '80px'}}>Breaking News</Typography>
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