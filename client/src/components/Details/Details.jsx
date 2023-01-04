import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { createReview, getCoinDetail, getReview } from "../../redux/actions";
import HistoryChart from "../Chart/Chart";
import Comparative from "../Comparative/Comparative";
import { HiArrowUturnLeft } from "react-icons/hi2";
import style from "./Details.module.css";
import "./DetailsBackground.css";
// import Rex from "../../Images/Rex.png";

const Details = (props) => {
  const dispatch = useDispatch();

  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getCoinDetail(id));
    dispatch(getReview(id));
  }, [dispatch, props, id]);

  const coinDetails = useSelector((state) => state.coinDetails);
  const reviews = useSelector((state) => state.reviews);

  const [review, setReview] = useState({
    stars: "",
    text: "",
    username: "thiago",
  });
  const handleReview = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitReview = (e) => {
    // e.preventDefault()
    dispatch(createReview(review, id));
    setReview({
      stars: "",
      text: "",
      username: "thiago",
    });
  };

  console.log(coinDetails);
  return (
    <div className="main-details">
      <div className={style.contArrow}>
        <NavLink to="/home">
          <HiArrowUturnLeft className={style.arrow} />
        </NavLink>
      </div>

      <div className={style.card}>
        <div className={style.contTop}>
          <img
            src={coinDetails.image}
            alt={coinDetails.id}
            className={style.imagen}
          />
          <h1 className={style.titulo}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </h1>
        </div>

        <div className={style.contMiddle}>
          <div className={style.contChart}>
            <HistoryChart id={id} />
          </div>

          <ul className={style.ul}>
            <li>Current price: ${coinDetails.current_price}</li>
            <li>Market Cap: {coinDetails.market_cap}</li>
            <li className={coinDetails.price_change_percentage_24h > 0 ? style.variationGreen : style.variationRed}>Variation: %{coinDetails.price_change_percentage_24h} </li>
          </ul>
        </div>
      </div>

      <Comparative />
      <form onSubmit={handleSubmitReview}>
        <input
          type="text"
          name="text"
          value={review.text}
          onChange={handleReview}
          placeholder="Text"
        ></input>
        <input
          type="number"
          name="stars"
          value={review.stars}
          onChange={handleReview}
          placeholder="Stars"
        ></input>
        <button onSubmit={handleSubmitReview}>SUBMIT</button>
      </form>

      <div>
        {reviews && reviews.length > 0 ? (
          reviews.map((r) => (
            <ul className={style.ul}>
              <li>{r.stars}</li>
              <li>{r.text}</li>
            </ul>
          ))
        ) : (
          <h1>Todavía no hay comentarios</h1>
        )}
      </div>
    </div>
  );
};

export default Details;
