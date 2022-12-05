import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
  return (
    <div>
    <h4>profile:</h4>
    {
        isAuthenticated && (
            <div>
                
                <img src={user.picture} alt="picture" />
                <h2> {user.name}</h2>
                {
                  console.log(user)
                }
            </div>
        )
        }
    </div>
  )
}

export default Profile