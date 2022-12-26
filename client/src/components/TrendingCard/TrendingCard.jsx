import React from 'react'
import style from "./TrendingCard.module.css"
import flecha from "../../Images/flechaGrafica.png"
import { Link } from 'react-router-dom'

const TrendingCard = (props) => {
    let primera = props.name.split(" ")

  return (
        <Link to={`/details/${props.id}`} underline="none">
    <div className={style.contTrending}>

        <img src={props.image} alt="img" className={style.stImage}/>

        <div className={style.contText}>

        <div>
        <h5 className={style.stName}>{primera[0]} {primera[1]}</h5>
        </div>

        <div>
        <h4 className={style.stMarket}>(market cap)</h4>
        </div>

        </div>

        <div className={style.contCap}>
        <img src={flecha} alt="flecha" className={style.stFlecha}/>
        <h4 className={style.stCap}>{props.market_cap}</h4>
        </div>

    </div>
        </Link>
  )
}

export default TrendingCard