import React from 'react'

import style from "./WarningAdmin.module.css"

const WarningAdmin = (props) => {
    return(
        <div className={style.contTargets}>

            <div className={style.contComment}>

            <div className={style.contUser}>
            <img src={props.img} className={style.imgComment}/>
            <h3 className={style.emailComment}>{props.email}</h3>
            </div>

            <div className={style.contText}>
            <h4 className={style.textComment}>{props.text}</h4>
            </div>

            <div className={style.contStars}>
            <h4 className={style.starComment}>{props.createdAt}</h4>
            </div>

            </div>

            <div className={style.contDataCoin}>
            <h3 className={style.coinComment}>{props.coin}</h3>
            <img src={props.coinImg} className={style.imgComment}/>
            </div>

        </div>
    )
}

export default WarningAdmin