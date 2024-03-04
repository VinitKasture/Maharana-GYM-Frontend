import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthApi } from "../../utils/api";
import { Toast } from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import theme from "../../Providers/ThemeProviders/themeProvider";
import GuestLayout from "../../Layout/GuestLayout";

function Index() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const showError = (message, type) => {
    setError(message);
    setErrorType(type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email").toLowerCase();
    const password = data.get("password");

    if (!email || !password) {
      return showError("Please fill in all fields!", "warning");
    }

    try {
      const response = await AuthApi.post("/auth/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response?.data?.token);
        navigate("/");
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  return (
    <GuestLayout>
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              postition: "relative",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(51, 51, 51, 0.8)",
              border: `2px solid ${theme.palette.primary.main}`,
              color: "#fff",
              padding: "3em",
              borderRadius: "1em",
              backdropFilter: "blur(7px)",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.lightOrange }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Stack sx={{ width: "100%", margin: "0.5em 0 0 0" }} spacing={2}>
              {error && errorType ? (
                <Alert severity={errorType}>{error}</Alert>
              ) : (
                ""
              )}
            </Stack>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  className: "textfield",
                }}
                InputLabelProps={{
                  className: "textfield__label",
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  className: "textfield",
                }}
                InputLabelProps={{
                  className: "textfield__label",
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "var(--primary-orange)",
                  color: "white",
                  margin: "1em 0",
                }}
                InputProps={{
                  className: "primaryOrange_button",
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs={12}>
                  <Link
                    href="/signup"
                    variant="body2"
                    sx={{ color: "var(--primary-orange)" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    </GuestLayout>
  );
}

export default Index;
