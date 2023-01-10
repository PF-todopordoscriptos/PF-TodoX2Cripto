/*eslint-disable*/
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllCoins, getAllTransactions, getAllUsers, getUserInfo, getWallet } from '../../redux/actions';
import TransactionUser from '../TransactionUser/TransactionUser';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import style from "./PanelWallet.module.css";

const PanelWallet = () => {
    const dispatch = useDispatch();
    const walletUser = useSelector((state) => state.userWallet);

    const userInfo = useSelector((state) => state.userInfo);
    const [user, setUser] = useState({
      email: "",
    });

    useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...user,
          email: currentUser.email,
        });
      }
    });
  }, [dispatch, userInfo]);

  useEffect(() => {
     dispatch( getUserInfo(user.email));
  }, [user.email]);

    useEffect(() => {
        console.log(userInfo.id)
        dispatch( getWallet(userInfo.id))
      }, [userInfo]);

    // const userTransactions = allTransactions.filter((t)=> t.idUser === userInfo.id )
    // console.log(userTransactions)

  return (
    <div>
        <div className={style.contTransactions}>
      {
        walletUser.length &&  walletUser.map((t) => (
          <TransactionUser
            key={t.id}
            id={t.id}
            idUser={t.idUser}
            idCoin={t.idCoin}
            quantity={t.quantity}
            price={t.price}
            allCoins={allCoins}
            allUsers={allUsers}
          />
        ))
        // :
        // <div className={style.loading}>
        //     <img src="https://freight.cargo.site/w/500/i/23d7c83958bb063a9aa2a706e40a1ce965c13048245534a18556692b2820063c/Dino_Skate_Thumb.gif" alt="gif patineta" className={style.patineta}/>
        //     <h3 className={style.texto}>Todavia no tienes Criptomonedas...</h3>    
        // </div>
      }
      </div>
    </div>
  )
}

export default PanelWallet