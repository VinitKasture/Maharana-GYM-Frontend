import { jwtDecode } from "jwt-decode";
import { Toast } from "../components/Alert/Alert";

function redirectToLogin() {
  window.location.href = "/login";
}

function useAuth() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return redirectToLogin();
  } else {
    const { _id, firstName, lastName, email, role } = jwtDecode(token);
    return { _id, firstName, lastName, email, role };
  }
}

export default useAuth;
