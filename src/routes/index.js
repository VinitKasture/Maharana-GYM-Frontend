import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ForgotPassword = lazy(() => import("../pages/Forgot Password"));
const Workout = lazy(() => import("../pages/Workout"));
const Profile = lazy(() => import("../pages/Profile"));
const ProfileDetails = lazy(() => import("../pages/Profile Details"));
const AssignWorkout = lazy(() =>
  import("../pages/Workout/AssignWorkout/AssignWorkout")
);

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <Workout />
      </PrivateRoute>
    ),
  },
  {
    path: "/assign-workout",
    element: (
      <PrivateRoute>
        <AssignWorkout />{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile-details",
    element: (
      <PrivateRoute>
        <ProfileDetails />
      </PrivateRoute>
    ),
  },
  { path: "*", element: <h1>Page Not Found!</h1> },
]);

export default router;
