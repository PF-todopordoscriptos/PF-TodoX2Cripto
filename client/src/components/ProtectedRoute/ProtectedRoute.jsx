import React, { useEffect, useState } from "react";


import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Profile from "../Profile/Profile";
import FormLogin from "../FormLogin/FormLogin";

export default function ProtectedRoute({ children }) {
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  if (user) return <Profile />; //history.push("/profile");
  if (!user) return <FormLogin />; //history.push("/login");
  return <>{children}</>;
}
