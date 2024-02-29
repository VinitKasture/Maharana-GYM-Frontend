import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import EmailVerificationForm from "./EmailVerificationForm";
import OtpVerificationForm from "./OtpVerificationForm";
import Review from "./Review";
import { Toast } from "../../components/Alert/Alert";
import { Grid } from "react-bootstrap-icons";
import { TextFields } from "@mui/icons-material";
import { AuthApi } from "../../utils/api";
import { useState } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Verify Your Email", "Verify OTP", "Change Password"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EmailVerificationForm />;
    case 1:
      return <OtpVerificationForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout({ showError }) {
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

    if (password !== password2) {
      showError("Passwords Do Not Match!", "error");
      return;
    }

    try {
      const response = await AuthApi.post(`/auth/forgot-password/:${token}`, {
        password: password,
      });

      if (response.status === 200) {
        showError("OTP Sent Successfully!", "success");
      }
    } catch (error) {
      return Toast(`${error}`);
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
            <TextFields fullWidth label="Verify OTP" id="otp" name="otp" />
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
