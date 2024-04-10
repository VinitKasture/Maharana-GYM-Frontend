import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import GuestLayout from "../../../Layout/GuestLayout";
import { AdminApi } from "../../../utils/api";
import { Toast } from "../../../components/Alert/Alert";
import UserList from "./UserList";
import CheckAdmin from "../../../Hooks/checkAdmin";
import useAuth from "../../../Hooks/useAuth";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Typography from "@mui/joy/Typography";
import "./Calendar.css";

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
          <Box
            sx={{
              position: "sticky",
              top: { sm: -100, md: -110 },
              bgcolor: "transparent",
              zIndex: 9995,
            }}
          >
            <Box sx={{ px: { xs: 2, md: 6 } }} style={{}}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={
                  <ChevronRightRoundedIcon
                    fontSize="sm"
                    style={{
                      color: "white",
                    }}
                  />
                }
                sx={{ pl: 0 }}
              >
                <Link
                  underline="none"
                  color="neutral"
                  href="/"
                  aria-label="Home"
                  style={{
                    color: "white",
                  }}
                >
                  <HomeRoundedIcon />
                </Link>
                <Typography
                  color="light"
                  fontWeight={500}
                  fontSize={12}
                  style={{
                    color: "white",
                  }}
                >
                  profiles
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
          {users ? <UserList users={users} /> : ""}
        </Container>
      </GuestLayout>
    </>
  );
}

export default AssignWorkout;
