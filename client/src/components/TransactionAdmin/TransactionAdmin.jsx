import React from "react";

import style from "./TransactionAdmin.module.css"

const TransactionAdmin = (props) => {

const findImg = () => {
  let monedita = props.allCoins.find(c => props.idCoin === c.id)
  console.log(monedita)
  return monedita.image
}

const findEmail = () => {
  let emailFind = props.allUsers.find(c => props.idUser === c.id)
  console.log(emailFind)
  return emailFind.email
}

const findImageUser = () => {
  let imgUser = props.allUsers.find(c => props.idUser === c.id)
  console.log(imgUser)
  return imgUser.img
}

console.log(props.allCoins)

  return (
    <div className={style.contTodo}>
      
        <div className={style.arriba}>
        <h3 className={style.NumTran}>N°{props.id}</h3>
        <h3 className={style.fecha}>📅{props.createdAt.slice(0,-14)}</h3>
        </div>
        
        <div className={style.abajo}>

        <div className={style.contUser}>
        <img src={findImageUser()} className={style.imgUser} alt="imageU"/>
        <h3 className={style.emailUser}>{findEmail()}</h3>
        </div>

        <div className={style.contCoin}>
        <img src={findImg()} className={style.imgCoin} alt="imageCoin"/>
        <h3 className={style.h3coin}>{props.idCoin}</h3>
        </div>

        <div className={style.contPrice}>
        <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673377167/stockIcon_px34mq.png" className={style.imgUser} alt="stock"/>
        <div className={style.contQuant}>
        <h3 className={style.quant}>{props.quantity}</h3>
        </div>
        <div className={style.contPri}>
        <h3 className={style.price}>${props.price}</h3>
        </div>
        </div>

        </div>

        <div className={style.contData}>
          <div className={style.divQuantity}>
            <h5 className={style.quantity}>Quantity</h5>
          </div>
          <div className={style.divPurchase}>
            <h5 className={style.purchase}>Purchase Price</h5>
          </div>
        </div>
    </div>
  )
}

export default TransactionAdmin