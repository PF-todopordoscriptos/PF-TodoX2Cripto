/*eslint-disable*/
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllWarnings } from "../../redux/actions";
import WarningAdmin from "../WarningAdmin/WarningAdmin";

import style from "./AdminDashboardWarnings.module.css";

const AdminDashboardWarnings = () => {
  const dispatch = useDispatch();
  const allWarnings = useSelector((state) => state.allWarnings);

  useEffect(() => {
    dispatch(getAllWarnings());
  }, [dispatch]);

  return (
    <div>
      <div className={style.contWarnings}>
        {allWarnings.length ? (
          allWarnings.map((c) => (
            <WarningAdmin
              key={c.id}
              id={c.id}
              email={c.email}
              img={c.img}
              text={c.text}
              coin={c.coin}
              coinImg={c.coinImg}
              createdAt={c.createdAt}
            />
          ))
        ) : (
          <div className={style.loading}>
            <img
              src="https://freight.cargo.site/t/original/i/cc1c0bea6bb22eaba0ea154629f5c1f347fd093d843b20a37756fe27998c3031/Dino_Flip.gif"
              alt="gif dino"
              className={style.dino}
            />
            <h3 className={style.texto}>No hay alertas...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardWarnings;
