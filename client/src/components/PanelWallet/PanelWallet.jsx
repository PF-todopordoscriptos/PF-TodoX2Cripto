/*eslint-disable*/
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllCoins, getWallet } from '../../redux/actions';
import TransactionUser from '../TransactionUser/TransactionUser';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { DataGrid } from '@mui/x-data-grid';

import style from "./PanelWallet.module.css";
import WalletUser from '../WalletUser/WalletUser';

const PanelWallet = (props) => {

    const columns = [
    { field: 'Icon', headerName: 'Icon', width: 70 },
    { field: 'Name', headerName: 'Name', width: 100 },
    { field: 'Symbol', headerName: 'Symbol', width: 100 },
    { field: 'Quantity', headerName: 'Quantity', type: 'number', width: 180,},
  ];

    const dispatch = useDispatch();
    const walletUser = useSelector((state) => state.userWallet);

    const miCarritoSinDuplicados = walletUser.reduce((acumulador, valorActual) => {
      const elementoYaExiste = acumulador.find(elemento => elemento.idCoin === valorActual.idCoin);
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {
          if (elemento.idCoin === valorActual.idCoin) {
            return {
              ...elemento,
              quantity: elemento.quantity + valorActual.quantity
            }
          }
    
          return elemento;
        });
      }
        return [...acumulador, valorActual];
    }, []);



    // console.log(props.allCoins)

    useEffect(() => {
        console.log(props.userInfo.id)
        dispatch(getWallet(props.userInfo.id))
      }, [props.userInfo]);


      console.log(props.allCoins)
      const findImg = () => {
        console.log(walletUser)
        let monedita = props.allCoins.find((c) => c.id === walletUser.find(w => c.id === w.idCoin))
        console.log(monedita)
        // return monedita.name
      }


      const generateRandom = () => {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

      const rows2 = miCarritoSinDuplicados.map((t) => (
        {Icon: findImg(),
          Name:t.idCoin.charAt(0).toUpperCase() + t.idCoin.slice(1),
          Quantity:t.quantity}
      ))
      console.log(rows2)

    // const userTransactions = allTransactions.filter((t)=> t.idUser === userInfo.id )
    // console.log(userTransactions)

  return (
    <div>
        <div className={style.contTransactions}>
      {
        // walletUser.length && allCoins.length ? walletUser.map((t) => (
        //   <WalletUser
        //     key={t.id}
        //     id={t.id}
        //     // idUser={t.idUser}
        //     idCoin={t.idCoin}
        //     quantity={t.quantity}
        //     // price={t.price}
        //     // allCoins={allCoins}
        //     // allUsers={allUsers}
        //     allCoins={allCoins}
        //   />
        // ))
        walletUser.length && props.allCoins.length ?
        <div style={{ height: 400, width: '40%', display: "flex", justifyContent: "center", marginLeft: "35rem", marginBottom:"5rem" }}>
          <DataGrid
          rows={rows2}
          // getRowId={(row) => row.numerito}
          columns={columns}
          getRowId={() =>  generateRandom()}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          />
       </div>
        :
        <div className={style.loading}>
            <img src="https://freight.cargo.site/w/500/i/23d7c83958bb063a9aa2a706e40a1ce965c13048245534a18556692b2820063c/Dino_Skate_Thumb.gif" alt="gif patineta" className={style.patineta}/>
            <h3 className={style.texto}>Todavia no tienes Criptomonedas...</h3>
        </div>
      }
      </div>
    </div>
  )
}

export default PanelWallet