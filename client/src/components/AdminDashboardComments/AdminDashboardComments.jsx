import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllComments } from '../../redux/actions';
import CommentAdmin from '../CommentAdmin/CommentAdmin';

import style from "./AdminDashboardComments.module.css";

const AdminDashboardComments = () => {
    const dispatch = useDispatch();
    const allComments = useSelector((state) => state.allComments);
    const [ayudin, setAyudin] = useState("")

    useEffect(() => {
        dispatch(getAllComments());
      }, [dispatch,ayudin]);

  return (
    <div>
        <div className={style.contComments}>
        {allComments.length ? allComments.map((c) => (
            <CommentAdmin
            key={c.id}
            id={c.id}
            email={c.email}
            img={c.img}
            text={c.text}
            coin={c.coin}
            coinImg={c.coinImg}
            stars={c.stars}
            setAyudin={setAyudin}
            ayudin={ayudin}
            />
            )) 
            :
        <div className={style.loading}>
            <img src="https://freight.cargo.site/t/original/i/55008a8778d0e8a1bef075e7a1e501587d83b9b3fb0051835de835b7fd10a7be/Dino_Horse.gif" alt="gif caballo" className={style.caballo}/>
            <h3 className={style.texto}>No hay comentarios...</h3>    
        </div>
            }
        </div>
    </div>
  )
}

export default AdminDashboardComments