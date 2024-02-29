import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Toast } from "../../components/Alert/Alert";
import { AuthApi } from "../../utils/api";

export default function EmailVerificationForm({ handleNext }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    if (!email) {
      return Toast("Email is required!");
    }
    try {
      const response = await AuthApi.post("/auth/verify-email", {
        email: data.get("email"),
      });

      if (response.status === 200) {
        handleNext("OTP Sent Successfully!", "success");
      }
    } catch (error) {
      console.log(error.response.data.message);
      return Toast(`${error.response.data.error}`);
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify Your Email!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
      </Box>
    </React.Fragment>
  );
}
