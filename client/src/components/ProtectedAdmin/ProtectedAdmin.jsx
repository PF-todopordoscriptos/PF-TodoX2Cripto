import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getUserInfo } from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const ProtectedAdmin = ({ user, children, redirecTo = "/home" }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const [userAdmin, setUserAdmin] = useState({
    email: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserAdmin({
          ...userAdmin,
          email: currentUser.email,
        });
      }
    });
    // eslint-disable-next-line
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getUserInfo(userAdmin.email));
    // eslint-disable-next-line
  }, [userAdmin.email]);

  if (userInfo.admin === false) {
    return <Navigate to={redirecTo} />;
  }
  return <Outlet />;
};
