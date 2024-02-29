import * as React from "react";
import Grid from "@mui/material/Grid";
import { Toast } from "../../components/Alert/Alert";
import Box from "@mui/material/Box";
import { AuthApi } from "../../utils/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Review({ showError }) {
  const [token, setToken] = useState(
    localStorage.getItem("changePasswordToken")
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const password2 = data.get("password2");

    if (!password || !password2) {
      return showError("Passwords are required!");
    }

    if (password.split("").length < 6 || password.split("").length > 12) {
      console.log(password.split("").length);
      return showError(
        "Password should be between 6 to 12 characters ",
        "warning"
      );
    }

    if (password !== password2) {
      showError("Passwords Do Not Match!", "error");
      return;
    }

    try {
      const response = await AuthApi.post(`/auth/forgot-password/${token}`, {
        password: password,
      });

      if (response.status === 200) {
        localStorage.clear();
        showError("Password Changed Successfully!", "success");
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Change Password"
              id="password"
              name="password"
              style={{ margin: "0.5em 0" }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              id="password2"
              name="password2"
              style={{ margin: "0.5em 0" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
          </Box>
        </Grid>
      </form>
    </React.Fragment>
  );
}
