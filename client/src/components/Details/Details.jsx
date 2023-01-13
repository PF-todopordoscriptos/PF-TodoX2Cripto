import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  clearDetail,
  createComment,
  createWarning,
  getCoinComment,
  getCoinDetail,
  getUserInfo,
} from "../../redux/actions";
import HistoryChart from "../Chart/Chart";

import Rating from "@mui/material/Rating";
import { HiArrowUturnLeft } from "react-icons/hi2";
import alerta from "../../Images/alerta.png";
import style from "./Details.module.css";
import "./DetailsBackground.css";
// import Rex from "../../Images/Rex.png";

import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Calculator from "../Calculator/Calculator";
import { Button } from "@mui/material";
import CommentTarget from "../CommentTarget/CommentTarget";

const Details = (props) => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState({
    email: "",
    //password: ""
  });

  const [ayudin, setAyudin] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
          //password: currentUser.password,
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  let { id } = useParams();

  const userInfo = useSelector((state) => state.userInfo);

  const [comment, setComment] = useState({
    email: "",
    img: "",
    text: "",
    coin: id,
    coinImg: "",
    stars: 0,
  });

  const clearDetalle = () => {
    dispatch(clearDetail())
  }

  useEffect(() => {
    dispatch(getCoinDetail(id));
    dispatch(getCoinComment(id));
    // eslint-disable-next-line
  }, [dispatch]);

  const coinComments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getCoinComment(id));
    // eslint-disable-next-line
  }, [ayudin]);

  const coinDetails = useSelector((state) => state.coinDetails);

  React.useEffect(() => {
    dispatch(getUserInfo(user.email));

    setComment({
      ...comment,
      email: user.email,
      // img: "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1672942978/dinox_pic_mkcd4k.png",
    });
    // eslint-disable-next-line
  }, [user.email]);

  const handleInput = (e) => {
    if (user.email === "") {
      Swal.fire({
        icon: "error",
        background: "#A35C82",
        color: "white",
        title: "Oops...",
        text: "Please register or log in!",
        footer: `<a href="/signup">Click here.</a>`,
        confirmButtonColor: "#E71C35",
      });
      return;
    }
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const setData = () => {
    setComment({
      ...comment,
      img: userInfo.img,
      coinImg: coinDetails.image,
    });
    if (user.email === "") {
      Swal.fire({
        icon: "error",
        background: "#A35C82",
        color: "white",
        title: "Oops...",
        text: "Please register or log in!",
        footer: `<a href="/signup">Click here.</a>`,
        confirmButtonColor: "#E71C35",
      });
      return;
    }
  };

  const postComment = (e) => {
    e.preventDefault();
    if (user.email === "") {
      Swal.fire({
        icon: "error",
        background: "#A35C82",
        color: "white",
        title: "Oops...",
        text: "Please register or log in!",
        footer: `<a href="/signup">Click here.</a>`,
        confirmButtonColor: "#E71C35",
      });
      return;
    }
    if (comment.text.length === 0 || comment.stars === 0) {
      return alert("Fill in all the fields");
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      iconColor: "#8EFF60",
      title: `Comment created successfully.`,
      color: "white",
      background: "#FFDA33",
    });

    setComment({
      ...comment,
      text: "",
      stars: 0,
    });
    dispatch(createComment(comment));
    setAyudin(!ayudin);
    // dispatch(getCoinComment(id));
  };

  const alertaa = async () => {
    if (user.email === "") {
      await Swal.fire({
        icon: "error",
        background: "#A35C82",
        color: "white",
        title: "Oops...",
        text: "Please register or log in!",
        footer: `<a href="/signup">Click here.</a>`,
        confirmButtonColor: "#E71C35",
      });
      return;
    }

    const { value: text } = await Swal.fire({
      inputLabel: "What happens with this coin?",
      input: "textarea",
      html: `<input id="swal-input1" class="swal2-input" placeholder=${user.email} disabled>
    <input id="swal-input1" class="swal2-input" placeholder=${id} disabled>`,
      inputPlaceholder: "Type your alert or notice here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text) {
      Swal.fire(text);
      let data = {
        email: user.email,
        img: userInfo.img,
        coin: id,
        text: text,
        coinImg: coinDetails.image,
      };
      dispatch(createWarning(data));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        iconColor: "#8EFF60",
        title: `Warning created successfully.`,
        color: "white",
        background: "#FC44F4",
      });
    }
  };

  return (
    <div className={style.Todo}>
      <div className={style.contArrow} onClick={clearDetalle}>
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
              <li
                className={
                  coinDetails.price_change_percentage_24h > 0
                    ? style.variationGreen
                    : style.variationRed
                }
              >
                Variation: %{coinDetails.price_change_percentage_24h}{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className={style.contCalculator}>
          <Calculator id={id} />
        </div>
      </div>

      <div>
        <form className={style.contForm} onSubmit={(e) => postComment(e)}>
          <TextField
            id="filled-basic"
            label="Type your review..."
            variant="standard"
            sx={{ width: "40rem" }}
            onChange={handleInput}
            onClick={setData}
            name="text"
            value={comment.text}
          />
          <Rating name="stars" value={comment.stars} onChange={handleInput} />
          <Button variant="outlined" color="secondary" type="submit">
            Send Review
          </Button>
        </form>
      </div>

      <div className={style.contComments}>
        {coinComments.length ? (
          coinComments.map((c) => (
            <CommentTarget
              key={c.id}
              email={c.email}
              img={c.img}
              text={c.text}
              coin={c.coin}
              stars={c.stars}
            />
          ))
        ) : (
          <div className={style.loading}>
            <img
              src="https://custom-doodle.com/wp-content/uploads/doodle/chrome-dino-surf/chrome-dino-surf-doodle.gif"
              alt="gif dino"
              className={style.dino}
            />
            <h3 className={style.texto}>No hay comentarios...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
