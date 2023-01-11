import React from "react";
import style from "./TrendingNew.module.css";
// import { Link } from "react-router-dom";

const TrendingNew = (props) => {
  // let pais = props.country[0].charAt(0).toLowerCase()
  console.log(props);
  console.log(typeof props);
  return (
    <div className={style.trendingContainer}>
      <div className={style.header}>
        <h4 className={style.headerTexto}>📅{props.pubDate}</h4>
        <h4 className={style.headerTexto}>
          🌍
          {props.country[0].charAt(0).toUpperCase() + props.country[0].slice(1)}
        </h4>
      </div>

      <div className={style.body}>
        <h3 className={style.stTittle}>{props.title}</h3>
        <a href={props.link}>
          <h4 className={style.stClick}>Click here</h4>
        </a>
      </div>
    </div>
  );
};

export default TrendingNew;
