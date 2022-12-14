import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/actions";
import { Link } from "react-router-dom";

import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import IconButton from "@mui/material/IconButton";

import style from "./CoinTarget.module.css";

const CoinTarget = (props) => {
  let dispatch = useDispatch();
  let favoriteCoins = useSelector((state) => state.favoriteCoins);

  const [favoriteClicked, setFavoriteClicked] = useState(false);

  const addFavoriteCoin = () => {
    if (!favoriteCoins.find((c) => c.name === props.name)) {
      setFavoriteClicked(!favoriteClicked);
      dispatch(
        addFavorite({
          id: props.id,
          key: props.id,
          image: props.image,
          name: props.name,
          symbol: props.symbol,
          market_cap: props.market_cap,
          price_change_percentage_24h: props.price_change_percentage_24h,
          current_price: props.current_price,
        })
      );
    }
  };

  const removeFavoriteCoin = () => {
    setFavoriteClicked(!favoriteClicked);
    dispatch(removeFavorite(props.id));
  };

  // function conditionalColour() {
  //   if (props.price_change_percentage_24h > 0) {
  //     return "green";
  //   }
  //   return "red";
  // }

  // const addToCart = (id) => {
  //   dispatch(addCart(id));
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: true,
  //   });
  //   Toast.fire({
  //     icon: "success",
  //     iconColor: "#8EFF60",
  //     title: `Coin added to cart.`,
  //     color: "white",
  //     background: "#E6112B"
  //   });
  // };

  return (
    <div className={style.contTarget}>
      <div className={style.icon}>
        {favoriteClicked ? (
          <IconButton aria-label="" onClick={removeFavoriteCoin}>
            <StarOutlinedIcon color="warning" />
          </IconButton>
        ) : (
          <IconButton
            className={style.icon}
            aria-label=""
            onClick={addFavoriteCoin}
          >
            <StarOutlineOutlinedIcon color="warning" />
          </IconButton>
        )}
      </div>

      <img src={props.image} className={style.imagen} alt="imagen1" />

      <h3 className={style.nameCripto}>{props.symbol.toUpperCase()}</h3>

      <h3 className={style.priceCripto}>${props.current_price}</h3>

      <h3
        className={
          props.price_change_percentage_24h > 0
            ? style.percentageGreen
            : style.percentageRed
        }
      >
        {props.price_change_percentage_24h.toFixed(2)}%
      </h3>

      <h3 className={style.marketCripto}>{props.market_cap}</h3>

      {/* <NavLink to={"/details/" + props.id}>
        <button className={style.butComprar}>Details</button>
      </NavLink> */}

      <div className={style.contDetail}>
        <Link to={"/details/" + props.id}>
          <button className={style.butDetails}>Details</button>
        </Link>
      </div>

      {/* <button onClick={() => addToCart(props.id)} className={style.butCart}>
          <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673118030/carrito_dydtjj.png" alt="cart" className={style.carrito} />
      </button> */}
    </div>
  );
};

export default CoinTarget;
