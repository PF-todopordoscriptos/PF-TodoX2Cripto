import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createReview, getCoinDetail } from "../../redux/actions";
import HistoryChart from "../Chart/Chart";
import { HiArrowUturnLeft } from "react-icons/hi2";
import style from "./Details.module.css"

const Details = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  console.log(id);
  useEffect(() => {
    dispatch(getCoinDetail(props.match.params.id));
  }, [dispatch, props]);

  const coinDetails = useSelector((state) => state.coinDetails);

  const [review, setReview] = useState({
    stars: '',
    text: '',
    username: 'thiago'
  })
  const handleReview = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmitReview = (e) => {
    dispatch(createReview(review, id))
  }

  console.log(coinDetails);
  return (
    <div>
      <div className={style.contArrow}>
      <NavLink to="/home">
        <HiArrowUturnLeft className={style.arrow}/>
      </NavLink>
      </div>
      <div>
        <h1>{id.charAt(0).toUpperCase() + id.slice(1)}</h1>
        <img src={coinDetails.image} alt={coinDetails.id} className={style.imagen}/>
        <ul className={style.ul}>
          <li>Market Cap: {coinDetails.market_cap}</li>
          <li>Variation: {coinDetails.price_change_percentage_24h}</li>
        </ul>
      </div>
      <div>
        <HistoryChart id={id} />
      </div>

      <form onSubmit={handleSubmitReview} >
        <input type='text' name='text' value={review.text} onChange={handleReview} placeholder='Text' ></input>
        <input type='number' name='stars' value={review.stars} onChange={handleReview} placeholder='Stars' ></input>
        <button onSubmit={handleSubmitReview} >SUBMIT</button>
      </form>

    </div>
  );
};

export default Details;
