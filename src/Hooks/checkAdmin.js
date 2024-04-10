import useAuth from "./useAuth";

function CheckAdmin() {
  const { role } = useAuth();

  if (!role) {
    return (window.location.href = "/login");
  }

  if (role === "Client") {
    return (
      <h1>
        You are not authorized to access this page! please{" "}
        <a href="/login">Login</a>!
      </h1>
    );
  }
}

export default CheckAdmin;
