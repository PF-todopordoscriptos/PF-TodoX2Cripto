/*eslint-disable*/
import React, { useEffect, useState } from "react";
// import {
//     onAuthStateChanged,
//   } from "firebase/auth";
// import { auth } from "../../firebase/firebaseConfig";
// import Profile from "../Profile/Profile";
// import FormLogin from "../FormLogin/FormLogin";
import { Navigate, Outlet } from "react-router-dom";

import style from "./ProtectedRoute.module.css";

// import { useNavigate, Link } from "react-router-dom";

// export default function ProtectedRoute({ children }) {

//   const [user, setUser] = useState(null);

//export default function ProtectedRoute({ children }) {
// const history = useNavigate();
//const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       }
//     });
//   }, []);

//   if (user) return <Profile />; //history.push("/profile");
//   if (!user) return <FormLogin />; //history.push("/login");
//   return <>{children}</>;
// }

export const ProtectedRoute = ({ user, children, redirecTo = "/login" }) => {
  if (!user) {
    return <Navigate to={redirecTo} />;
  }
  return <Outlet />;
};
