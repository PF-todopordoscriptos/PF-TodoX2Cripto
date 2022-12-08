import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  return (
    <div>
      <h4>profile:</h4>
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt="foto de usuario" />
          <h2> {user.name}</h2>
          {console.log(user)}

          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
