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
import { Cart } from "./features/cart/Cart";
import CartPage from "./features/page/CartPage";
import Checkout from "./features/page/ChekOut";
import ProductPageDetail from "./features/page/ProductPageDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    element: <CartPage></CartPage>,
  },
  {
    path: "/checkout",
    element: <Checkout ></Checkout>,
  },
  {
    path: "/productdetail",
    element: <ProductPageDetail ></ProductPageDetail>,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
