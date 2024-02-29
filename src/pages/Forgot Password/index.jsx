import React, { useState } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import AddressForm from "./EmailVerificationForm";
import OtpVerificationForm from "./OtpVerificationForm";
import Review from "./Review";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

const defaultTheme = createTheme();

function Index() {
  const [activeStep, setActiveStep] = useState(0);

  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const showError = (message, type) => {
    setError(message);
    setErrorType(type);
  };

  const handleNext = (message, type) => {
    if (message && type) {
      showError(message, type);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} showError={showError} />;
      case 1:
        return (
          <OtpVerificationForm handleNext={handleNext} showError={showError} />
        );
      case 2:
        return <Review showError={showError} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <React.Fragment>
          <Container
            component="main"
            maxWidth="sm"
            sx={{ mb: 4, width: "100%" }}
          >
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Forgot Password
              </Typography>
              {error && errorType ? (
                <Alert severity={errorType}>{error}</Alert>
              ) : (
                ""
              )}
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <></>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </Paper>
            <Copyright />
          </Container>
        </React.Fragment>
      </Container>
    </ThemeProvider>
  );
}

export default Index;
