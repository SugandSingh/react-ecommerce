import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Proctected({ children }) {
  const user = useSelector((state) => state.auth.userLgoin);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Proctected;
