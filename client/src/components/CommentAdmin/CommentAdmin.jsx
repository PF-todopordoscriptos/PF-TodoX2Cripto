/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../redux/actions";

import Swal from "sweetalert2";

import style from "./CommentAdmin.module.css";

const CommentAdmin = (props) => {
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.allComments);

  const deleteComm = () => {
    Swal.fire({
      title: "Do you want to delete the comment?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      background: "#8192FB",
      color: "white",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          background: "#8192FB",
          color: "white",
        });
        dispatch(deleteComment(props.id));
        props.setAyudin(`ayudin in ${props.id}`);
        console.log(props.ayudin);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch, props.ayudin]);

  return (
    <div className={style.contTargets}>
      <div className={style.contComment}>
        <div className={style.contUser}>
          <img src={props.img} className={style.imgComment} />
          <h3 className={style.emailComment}>{props.email}</h3>
        </div>

        <div className={style.contText}>
          <h4 className={style.textComment}>{props.text}</h4>
        </div>

        <div className={style.contStars}>
          <h4 className={style.starComment}>{props.stars}⭐</h4>
        </div>
      </div>

      <div className={style.contDataCoin}>
        <h3 className={style.coinComment}>{props.coin}</h3>
        <img src={props.coinImg} className={style.imgComment} />
      </div>

      <div className={style.contButton}>
        <img
          src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673293355/Fondo_trxzjc.png"
          alt="cruz"
          className={style.imgDelete}
          onClick={deleteComm}
        ></img>
      </div>
    </div>
  );
};

export default CommentAdmin;
