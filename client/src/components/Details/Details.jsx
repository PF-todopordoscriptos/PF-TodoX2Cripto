import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { createReview, createWarning, getCoinDetail, getReview } from "../../redux/actions";
import HistoryChart from "../Chart/Chart";
import Comparative from "../Comparative/Comparative";
import { HiArrowUturnLeft } from "react-icons/hi2";
import alerta from "../../Images/alerta.png"
import style from "./Details.module.css";
import "./DetailsBackground.css";
// import Rex from "../../Images/Rex.png";
import Swal from "sweetalert2";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Calculator from "../Calculator/Calculator";

const Details = (props) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);



  let { id } = useParams();

  
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



  const alertaa = async () => {

    const { value: text } = await Swal.fire({
      
      inputLabel: 'What happens with this coin?',
      input: 'textarea',
      html:
    `<input id="swal-input1" class="swal2-input" placeholder=${user.email} disabled>
    <input id="swal-input1" class="swal2-input" placeholder=${id} disabled>`,
      inputPlaceholder: 'Type your alert or notice here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    

    if (text) {
      // Swal.fire(text)
      let data = {
        email: user.email,
        coin: id,
        text: text
      }
      dispatch(createWarning(data))

    }

    }



  return (
    <div className={style.Todo}>
      <div className={style.contArrow}>
        <NavLink to="/home">
          <HiArrowUturnLeft className={style.arrow} />
        </NavLink>
      </div>

      <div className={style.contCardCalculator}>
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
          <img
          src={alerta}
          alt="alerta"
          className={style.alerta}
          onClick={alertaa}
          />
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
      
      {/* <div className={style.contComp}>
      <Comparative />
    </div> */}
      <div className={style.contCalculator}>
      <Calculator
      id = {id}
      />
      </div>
     
        </div>

      <div className={style.contReviews}>
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
    </div>
  );
};

export default Details;
