/*eslint-disable*/
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllCoins, getAllTransactions, getAllUsers, getUserInfo } from '../../redux/actions';
import TransactionUser from '../TransactionUser/TransactionUser';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import style from "./PanelTransactions.module.css";

const PanelTransactions = () => {
    const dispatch = useDispatch();
    const allTransactions = useSelector((state) => state.allTransactions);
    const allCoins = useSelector((state) => state.allCoins);
    const allUsers = useSelector((state) => state.allUsers);

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
    dispatch(getUserInfo(user.email));
  }, [user.email]);

    useEffect(() => {
        dispatch(getAllTransactions());
        dispatch(getAllCoins());
        dispatch(getAllUsers())
      }, [dispatch]);

    const userTransactions = allTransactions.filter((t)=> t.idUser === userInfo.id )
    console.log(userTransactions)

  return (
    <div>
        <div className={style.contTransactions}>
      {
        userTransactions.length && allUsers.length ? userTransactions.map((t) => (
          <TransactionUser
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
            <h3 className={style.texto}>Todavia no tienes Transacciones...</h3>    
        </div>
      }
      </div>
    </div>
  )
}

export default PanelTransactions