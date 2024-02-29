import { jwtDecode } from "jwt-decode";

function useAuth() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  const { _id, firstName, lastName, role, email, exp } = jwtDecode(token);

  const currentDate = new Date();

  if (exp * 1000 < currentDate.getTime()) {
    return null;
  } else {
    return { _id, firstName, lastName, role, email, exp, isValid: true };
  }
}

export default useAuth;
