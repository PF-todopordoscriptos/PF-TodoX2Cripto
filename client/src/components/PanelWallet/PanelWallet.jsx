/*eslint-disable*/
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWallet } from "../../redux/actions";

import { DataGrid } from "@mui/x-data-grid";

import style from "./PanelWallet.module.css";

const PanelWallet = (props) => {
  const columns = [
    {
      field: "Icon",
      headerName: "Icon",
      type: "image",
      width: 70,
      renderCell: (params) => (
        <img src={params.value} className={style.imagenCoin} />
      ),
    },
    { field: "Name", headerName: "Name", width: 100 },
    { field: "Symbol", headerName: "Symbol", width: 100 },
    { field: "Quantity", headerName: "Quantity", type: "float", width: 200 },
  ];

  const dispatch = useDispatch();
  const walletUser = useSelector((state) => state.userWallet);

  const miCarritoSinDuplicados = walletUser.reduce(
    (acumulador, valorActual) => {
      const elementoYaExiste = acumulador.find(
        (elemento) => elemento.idCoin === valorActual.idCoin
      );
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {
          if (elemento.idCoin === valorActual.idCoin) {
            return {
              ...elemento,
              quantity: elemento.quantity + valorActual.quantity,
            };
          }

          return elemento;
        });
      }
      return [...acumulador, valorActual];
    },
    []
  );

  useEffect(() => {
    dispatch(getWallet(props.userInfo.id));
  }, [props.userInfo]);

  const auxImg = (t) => {
    const criptoTag = props.allCoins.find((c) => c.id === t.idCoin);
    return criptoTag.image;
  };

  const auxSym = (t) => {
    const criptoTag = props.allCoins.find((c) => c.id === t.idCoin);
    return criptoTag.symbol;
  };

  const generateRandom = () => {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const rows2 = miCarritoSinDuplicados.map((t) => ({
    Icon: auxImg(t),
    Name: t.idCoin.charAt(0).toUpperCase() + t.idCoin.slice(1),
    Symbol: auxSym(t).toUpperCase(),
    Quantity: t.quantity,
  }));

  return (
    <div>
      <div className={style.contTransactions}>
        {walletUser.length && props.allCoins.length ? (
          <div
            style={{
              height: 400,
              width: "40%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "35rem",
              marginBottom: "5rem",
            }}
          >
            <DataGrid
              rows={rows2}
              columns={columns}
              getRowId={() => generateRandom()}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        ) : (
          <div className={style.loading}>
            <img
              src="https://freight.cargo.site/w/500/i/23d7c83958bb063a9aa2a706e40a1ce965c13048245534a18556692b2820063c/Dino_Skate_Thumb.gif"
              alt="gif patineta"
              className={style.patineta}
            />
            <h3 className={style.texto}>Todavia no tienes Criptomonedas...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelWallet;
