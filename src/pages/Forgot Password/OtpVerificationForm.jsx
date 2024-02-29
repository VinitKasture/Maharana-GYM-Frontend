import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Toast } from "../../components/Alert/Alert";
import { AuthApi } from "../../utils/api";

export default function OtpVerificationForm({ handleNext }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otp = data.get("otp");

    if (!otp) {
      return Toast("OTP is required!");
    }

    try {
      const response = await AuthApi.post("/auth/verify-OTP", {
        otp: otp,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "changePasswordToken",
          response?.data?.changePasswordToken
        );
        handleNext("OTP Verified Successfully!", "success");
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
            <TextField fullWidth label="Verify OTP" id="otp" name="otp" />
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
