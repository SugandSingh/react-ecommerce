import React from "react";
import NavBar from "../navBar/NavBar";
import UserProfile from "../user/components/UserProfile";


export default function UserProfilePage() {
  return (
    <NavBar>
         <h1 className='mx-auto text-4 xl'>My Profile</h1>
     <UserProfile></UserProfile>
    </NavBar>
  );
}
