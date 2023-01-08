import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { createComment, createWarning, getCoinComment, getCoinDetail, getUserInfo } from "../../redux/actions";
import HistoryChart from "../Chart/Chart";
import Comparative from "../Comparative/Comparative";
import Rating from '@mui/material/Rating';
import { HiArrowUturnLeft } from "react-icons/hi2";
import alerta from "../../Images/alerta.png"
import style from "./Details.module.css";
import "./DetailsBackground.css";
// import Rex from "../../Images/Rex.png";

import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Calculator from "../Calculator/Calculator";
import { Button } from "@mui/material";

const Details = (props) => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState({
    email: "",
    //password: ""
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
          //password: currentUser.password,
        });
    }});
  }, []);



  let { id } = useParams();

  
  const userInfo = useSelector((state) => state.userInfo);
  
  const [comment, setComment] = useState({
    email: "",
    img: "",
    text: "",
    coin: id,
    stars: 0
  });

  useEffect(() => {
    dispatch(getCoinDetail(id));
    dispatch(getCoinComment(id));
  }, [dispatch, props, id]);

  const coinDetails = useSelector((state) => state.coinDetails);
  const coinComments = useSelector((state) => state.comments);

  React.useEffect(() => {
    dispatch(getUserInfo(user.email));
    console.log(userInfo)
    console.log("estado lleno");
    setComment({
      ...comment,
      email: user.email,
      img: "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1672942978/dinox_pic_mkcd4k.png",
    })
  }, [user.email]);


  const handleInput = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
    console.log(comment);
  };

  console.log(userInfo)
  console.log(coinDetails);


  const postComment = () => {
    // e.preventDefault()
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
      background: "#FFDA33" 
    });
    setComment({
      text: "",
      stars: 0
    })
    console.log(comment)
    dispatch(createComment(comment))
    console.log("comentario")
  }

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
      Swal.fire(text)
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
    
      {/* <div className={style.contCalculator}>
      <Calculator
      id = {id}
      /> */}
      {/* </div> */}
      
      </div>

     //   </div>


      <div >
        <form className={style.contForm}>
          <TextField id="filled-basic" label="Type your review..." variant="standard" sx={{width: "40rem"}} onChange={handleInput} name="text" value={comment.text}/>
          <Rating name="stars" value={comment.stars} onChange={handleInput}/>
          <Button variant="outlined" color="secondary" onClick={postComment}>Send Review</Button>
        </form>
      </div>

    </div>
  );
};

export default Details;
