import React from 'react'

import style from "./WarningAdmin.module.css"

const WarningAdmin = (props) => {
    return(
        <div className={style.contTargets}>
            
            <div className={style.contFecha}>
            <h4 className={style.fechaComment}>📅{props.createdAt.slice(0,-14)}</h4>
            </div>

            <div className={style.contCoin}>
            <img className={style.imgComment} src={props.coinImg} />
            <h3 className={style.coinComment}>{props.coin}</h3>
            </div>

            <div className={style.contUser}>
            <img className={style.imgUser} src={props.img} />
            <h3 className={style.emailComment}>{props.email}</h3>
            </div>

            <div className={style.contText}>
            <h4 className={style.textComment}>{props.text.charAt(0).toUpperCase() + props.text.slice(1)}</h4>
            </div>

        </div>
    )
}

export default WarningAdmin