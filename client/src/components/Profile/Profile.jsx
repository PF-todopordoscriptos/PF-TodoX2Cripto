import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { postUser, postUserGoogle } from "../../redux/actions/index.js"

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';


const Profile = () => {
    //const {user, isAuthenticated, logout} = useAuth0();
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
      email: "",
      //password: ""
    })

    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            setUser({
                ...user,
                email: currentUser.email,
                //password: currentUser.password,
              })
              dispatch(postUser(currentUser));
            }else{
              console.log("SIGNED OUT");
        }
      })
    }, []);
        
    console.log(auth)
    console.log(user)
    
  return (
    <div>
        <h1>hola {user.email}</h1>
    </div>
  )
}

export default Profile