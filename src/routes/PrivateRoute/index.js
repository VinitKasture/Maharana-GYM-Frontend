import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return children;
  } else {
    return (window.location.href = "/login");
  }

  // return token ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
