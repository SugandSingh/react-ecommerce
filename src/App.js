import logo from "./logo.svg";
import Home from "./features/page/Home";
import LoginFrom from "./features/page/LoginFrom";
import SignUpFrom from "./features/page/SignUp";

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./features/page/CartPage";
import Checkout from "./features/page/ChekOut";
import ProductPageDetail from "./features/page/ProductPageDetail";
import PageNotFound from "./features/page/PageNotFound";
import Proctected from "./features/auth/components/Proctected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemByIdAsync } from "./features/cart/CartSlice";
import OrderPlaced from "./features/page/OrderPlaced";
import UserOrderPage from "./features/page/UserOrderPage";
import UserProfilePage from "./features/page/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordFrom from "./features/page/ForgotPasswordFrom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Proctected>
        <Home></Home>,
      </Proctected>
    ),
  },
  {
    path: "/login",
    element: <LoginFrom></LoginFrom>,
  },
  {
    path: "/signup",
    element: <SignUpFrom></SignUpFrom>,
  },
  {
    path: "/cart",
    element: (
      <Proctected>
        <CartPage></CartPage>
      </Proctected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Proctected>
        <Checkout></Checkout>
      </Proctected>
    ),
  },
  {
    path: "/productdetail/:id",
    element: (
      <Proctected>
        <ProductPageDetail></ProductPageDetail>
      </Proctected>
    ),
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderPlaced></OrderPlaced>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordFrom></ForgotPasswordFrom>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLgoin);
  React.useEffect(() => {
    dispatch(fetchItemByIdAsync(user?.id));
    dispatch(fetchLoggedInUserAsync(user?.id));
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
