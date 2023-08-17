import React from "react";
import NavBar from "../navBar/NavBar";
import UserOrder from "../user/components/UserOrder";


export default function UserOrderPage() {
  return (
    <NavBar>
       <h1 className='mx-auto text-2xl'>My Orders</h1>
     <UserOrder></UserOrder>
    </NavBar>
  );
}
