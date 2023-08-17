import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const user = useSelector((state) => state.auth.userLgoin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singOutAsync());
  }, []);
  return <>{!user && <Navigate to={"/login"} replace={true}></Navigate>}</>;
}

export default Logout;
