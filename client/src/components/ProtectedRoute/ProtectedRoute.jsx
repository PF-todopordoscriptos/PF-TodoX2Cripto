import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Profile from "../Profile/Profile";
import FormAuth0 from "../FormAuth0/FormAuth0";

export default function ProtectedRoute({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  if (user) return <Profile />; //history.push("/profile");
  if (!user) return <FormAuth0 />; //history.push("/login");
  return <>{children}</>;
}
