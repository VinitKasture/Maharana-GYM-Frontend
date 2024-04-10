import React, { useEffect, useRef, useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthApi } from "../../utils/api";
import { Toast } from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { DateRangePicker } from "rsuite";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import GuestLayout from "../../Layout/GuestLayout";
import theme from "../../Providers/ThemeProviders/themeProvider";

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

const defaultTheme = createTheme();

const genderOptions = ["Male", "Female"];
const roleOptions = ["Trainer", "Client"];
const membershipOptions = [1, 2, 3];

function Index() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const anchorRef = useRef(null);
  const [openGender, setGenderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const anchorRef1 = useRef(null);
  const [openRole, setRoleOpen] = useState(false);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(1);

  const anchorRef2 = useRef(null);
  const [openMembershipMenu, setOpenMembershipMenu] = useState(false);
  const [selectedMembershipIndex, setSelectedMembershipIndex] = useState(0);
  const [membership, setMembership] = useState();

  const showError = (message, type) => {
    setError(message);
    setErrorType(type);
  };

  const handleRoleMenuItemClick = (event, index) => {
    setSelectedRoleIndex(index);
    setRoleOpen(false);
  };

  const handleMembershipMenuItemClick = (event, index) => {
    setSelectedMembershipIndex(index);
    setOpenMembershipMenu(false);
  };

  const handleGenderMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setGenderOpen(false);
  };

  const handleGenderToggle = () => {
    setGenderOpen((prevOpen) => !prevOpen);
  };

  const handleRoleToggle = () => {
    setRoleOpen((prevOpen) => !prevOpen);
  };

  const handleMembershipToggle = () => {
    setOpenMembershipMenu((prevOpen) => !prevOpen);
  };

  const handleGenderClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setGenderOpen(false);
  };

  const handleRoleClose = (event) => {
    if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
      return;
    }
    setRoleOpen(false);
  };

  const handleMembershipClose = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }
    setOpenMembershipMenu(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    showError(null, null);
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email").toLowerCase();
    const number = data.get("number");
    const address = data.get("address");
    const password = data.get("password");
    const gender = genderOptions[selectedIndex];
    const role = roleOptions[selectedRoleIndex];

    if (!firstName || !lastName || !email || !password || !address || !number) {
      return showError("Please fill all fields", "warning");
    }

    if (
      firstName.split("").length < 3 ||
      lastName.split("").length < 3 ||
      firstName.split("").length > 10 ||
      lastName.split("").length > 10
    ) {
      return showError(
        "First name and Last Name should be between 3 to 10 characters ",
        "warning"
      );
    }

    if (!membership) {
      return showError("Please set memmbership!", "warning");
    }

    if (password.split("").length < 6 || password.split("").length > 12) {
      return showError(
        "Password should be between 6 to 12 characters ",
        "warning"
      );
    }

    if (number.split("").length !== 10) {
      return showError("Invalid phone number!", "warning");
    }
    try {
      const response = await AuthApi.post("/auth/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        number: number,
        address: address,
        gender: gender,
        membership: {
          from: membership[0],
          to: membership[1],
        },
        role: role,
      });

      if (response.status === 200) {
        navigate("/login");
        Toast("Signup Successfull!");
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  return (
    <GuestLayout>
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
          <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Stack sx={{ width: "100%", margin: "1em 0" }} spacing={2}>
              {error && errorType ? (
                <Alert severity={errorType}>{error}</Alert>
              ) : (
                ""
              )}
            </Stack>
            <Grid container spacing={2} autoComplete="true">
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  type="character"
                  autoFocus
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="number"
                  type="number"
                  id="number"
                  autoComplete="number"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  type="address"
                  id="address"
                  autoComplete="address"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <React.Fragment>
                  <ButtonGroup
                    color="warning"
                    variant="contained"
                    ref={anchorRef}
                    aria-label="split button"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Button
                      style={{
                        width: "100%",
                        textAlign: "left",
                      }}
                      sx={{
                        backgroundColor: "var(--primary-orange)",
                        color: "white",
                      }}
                    >
                      <strong
                        style={{
                          position: "relative",
                          left: "7%",
                          transform: "translate(0%, -0%)",
                        }}
                      >
                        {genderOptions[selectedIndex]}
                      </strong>
                    </Button>
                    <Button
                      size="small"
                      aria-controls={
                        openGender ? "split-button-menu" : undefined
                      }
                      aria-expanded={openGender ? "true" : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleGenderToggle}
                      sx={{
                        backgroundColor: "var(--primary-orange)",
                        color: "white",
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    sx={{
                      zIndex: 1,
                    }}
                    open={openGender}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleGenderClose}>
                            <MenuList id="split-button-menu" autoFocusItem>
                              {genderOptions.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  disabled={index === 2}
                                  selected={index === selectedIndex}
                                  onClick={(event) =>
                                    handleGenderMenuItemClick(event, index)
                                  }
                                  style={{
                                    width: "10em",
                                  }}
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </React.Fragment>
              </Grid>
              <Grid item xs={12}>
                <React.Fragment>
                  <ButtonGroup
                    variant="contained"
                    ref={anchorRef1}
                    aria-label="split button"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Button
                      style={{
                        width: "100%",
                      }}
                      sx={{
                        backgroundColor: "var(--primary-orange)",
                        color: "white",
                      }}
                    >
                      <strong
                        style={{
                          position: "relative",
                          left: "7%",
                          transform: "translate(0%, -0%)",
                        }}
                      >
                        {roleOptions[selectedRoleIndex]}
                      </strong>
                    </Button>
                    <Button
                      size="small"
                      aria-controls={openRole ? "split-button-menu" : undefined}
                      aria-expanded={openRole ? "true" : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleRoleToggle}
                      sx={{
                        backgroundColor: "var(--primary-orange)",
                        color: "white",
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    sx={{
                      zIndex: 1,
                    }}
                    open={openRole}
                    anchorEl={anchorRef1.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleRoleClose}>
                            <MenuList id="split-button-menu" autoFocusItem>
                              {roleOptions.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  disabled={index === 2}
                                  selected={index === selectedIndex}
                                  onClick={(event) =>
                                    handleRoleMenuItemClick(event, index)
                                  }
                                  style={{
                                    width: "10em",
                                  }}
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </React.Fragment>
              </Grid>
              <Grid item xs={12}>
                <React.Fragment>
                  <ButtonGroup
                    color="warning"
                    variant="contained"
                    ref={anchorRef2}
                    aria-label="split button"
                    style={{
                      width: "100%",
                    }}
                  >
                    {/* <Button
                      style={{
                        width: "100%",
                      }}
                      sx={{
                        backgroundColor: "var(--primary-orange)",
                        color: "white",
                      }}
                    >
                      <strong
                        style={{
                          position: "relative",
                          left: "7%",
                          transform: "translate(0%, -0%)",
                        }}
                      >
                        {membershipOptions[selectedMembershipIndex]}{" "}
                        {selectedMembershipIndex !== 0 ? "Months" : "Month"}
                      </strong>
                    </Button> */}
                    <DateRangePicker
                      onChange={(e) => {
                        setMembership(e);
                      }}
                      appearance="subtle"
                      showOneCalendar
                      placement="auto"
                      size="md"
                      placeholder="Set Membership"
                    />
                    {/* <Button
                      size="small"
                      aria-controls={
                        openMembershipMenu ? "split-button-menu" : undefined
                      }
                      aria-expanded={openMembershipMenu ? "true" : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleMembershipToggle}
                      sx={{
                        backgroundColor: "var(--primary-orange)",
                        color: "white",
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Button> */}
                  </ButtonGroup>
                  <Popper
                    sx={{
                      zIndex: 1,
                    }}
                    open={openMembershipMenu}
                    anchorEl={anchorRef2.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={handleMembershipClose}
                          >
                            <MenuList id="split-button-menu" autoFocusItem>
                              {membershipOptions.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  selected={index === selectedMembershipIndex}
                                  onClick={(event) =>
                                    handleMembershipMenuItemClick(event, index)
                                  }
                                  style={{
                                    width: "10em",
                                  }}
                                >
                                  {option} Months
                                  {/* {option !== 1 ? "s" : ""} */}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </React.Fragment>
              </Grid>
            </Grid>
            <Button
              sx={{
                backgroundColor: "var(--primary-orange)",
                color: "white",
                mt: 3,
                mb: 2,
              }}
              variant="contained"
              type="submit"
              fullWidth
            >
              <strong>Sign Up</strong>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  style={{
                    color: "var(--primary-orange)",
                    textDecoration: "none",
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </GuestLayout>
  );
}

export default Index;
