import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import GuestLayout from "../../../Layout/GuestLayout";
import { AdminApi } from "../../../utils/api";
import { Toast } from "../../../components/Alert/Alert";
import UserList from "./UserList";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../Providers/ThemeProviders/themeProvider";

function AssignWorkout() {
  const [users, setUsers] = useState();

  const getAllUsers = async () => {
    try {
      const response = await AdminApi.get("/get-all-users");
      setUsers(response?.data?.result);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <GuestLayout>
        <Container component="main">
          {users ? <UserList users={users} /> : ""}
        </Container>
      </GuestLayout>
    </>
  );
}

export default AssignWorkout;
