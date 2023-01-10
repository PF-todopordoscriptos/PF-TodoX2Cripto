import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllCoins, getAllTransactions, getAllUsers } from '../../redux/actions';
import TransactionAdmin from '../TransactionAdmin/TransactionAdmin';

import style from "./AdminDashboardTransactions.module.css";

const AdminDashboardTransactions = () => {
    const dispatch = useDispatch();
    const allTransactions = useSelector((state) => state.allTransactions);
    const allCoins = useSelector((state) => state.allCoins);
    const allUsers = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(getAllTransactions());
        dispatch(getAllCoins());
        dispatch(getAllUsers())
      }, [dispatch]);

  return (
    <div>
        <div className={style.contTransactions}>
      {
        allTransactions.length && allUsers.length ? allTransactions.map((t) => (
          <TransactionAdmin
            key={t.id}
            id={t.id}
            idUser={t.idUser}
            idCoin={t.idCoin}
            quantity={t.quantity}
            price={t.price}
            createdAt={t.createdAt}
            allCoins={allCoins}
            allUsers={allUsers}
          />
        ))
        :
        <div className={style.loading}>
            <img src="https://freight.cargo.site/w/500/i/23d7c83958bb063a9aa2a706e40a1ce965c13048245534a18556692b2820063c/Dino_Skate_Thumb.gif" alt="gif patineta" className={style.patineta}/>
            <h3 className={style.texto}>No hay Transacciones...</h3>    
        </div>
      }
      </div>
    </div>
  )
}

export default AdminDashboardTransactions