import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ForgotPassword = lazy(() => import("../pages/Forgot Password"));
const Workout = lazy(() => import("../pages/Workout"));
const Profile = lazy(() => import("../pages/Profile"));
const AssignWorkout = lazy(() =>
  import("../pages/Workout/AssignWorkout/AssignWorkout")
);

const router = createBrowserRouter([
  { path: "/", element: <Workout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  // { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/assign-workout", element: <AssignWorkout /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <h1>Page Not Found!</h1> },
]);

export default router;
