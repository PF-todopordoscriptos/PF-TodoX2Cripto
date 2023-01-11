import React from "react";

import style from "./CommentTarget.module.css";

const CommentTarget = (props) => {
  return (
    <div className={style.contComment}>
      <div className={style.contUser}>
        <img src={props.img} className={style.imgComment} alt="imagen_coment" />
        <h3 className={style.emailComment}>{props.email}</h3>
      </div>

      <div className={style.contText}>
        <h4 className={style.textComment}>{props.text}</h4>
      </div>

      <div className={style.contStars}>
        <h4 className={style.starComment}>{props.stars}⭐</h4>
      </div>
    </div>
  );
};

export default CommentTarget;
