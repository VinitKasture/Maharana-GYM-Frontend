import axios from "axios";

const { REACT_APP_DEV_SERVER_URL } = process.env;

let token = null;
let data = localStorage.getItem("accessToken");
token = data;

const AuthApi = axios.create({
  baseURL: REACT_APP_DEV_SERVER_URL + "",
  headers: {
    authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

const GuestApi = axios.create({
  baseURL: REACT_APP_DEV_SERVER_URL + "/",
  headers: {
    authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

const AdminApi = axios.create({
  baseURL: REACT_APP_DEV_SERVER_URL + "/admin",
  headers: {
    authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

export { AuthApi, AdminApi, GuestApi };
