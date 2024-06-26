import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Providers/ThemeProviders/themeProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Dropdown } from "rsuite";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../Hooks/useAuth";

const renderIconButton = (props, ref) => {
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
      className="bg-dark text-white"
      {...props}
      ref={ref}
    >
      <AccountCircleIcon color={"white"} />
    </IconButton>
  );
};

function Header() {
  const authData = useAuth();
  const role = authData ? authData?.role : null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          variant="soft"
          sx={{ backgroundColor: theme.palette.primary.black }}
        >
          <Toolbar>
            <Typography
              variant="strong"
              component="strong"
              sx={{ flexGrow: 1 }}
            >
              <Box>
                <img
                  style={{
                    maxHeight: "4em",
                  }}
                  src={require("../../assets/logo2.jpeg")}
                  alt="My Image"
                />
              </Box>
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Dropdown renderToggle={renderIconButton} placement="leftStart">
                <Dropdown.Item>
                  {(role && role === "SuperAdmin") || role === "Admin" ? (
                    <Link
                      onClick={() => {
                        window.location.href = "/assign-workout";
                      }}
                      className="text-black text-decoration-none"
                    >
                      <span className="mx-2">
                        <LockResetIcon />
                      </span>
                      Assign Workouts
                    </Link>
                  ) : (
                    ""
                  )}
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                    className="text-black text-decoration-none"
                  >
                    <span className="mx-2">
                      <AccountCircleIcon />
                    </span>
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => handleLogout()}
                    // to="/logout"
                    className="text-black text-decoration-none"
                  >
                    <span className="mx-2">
                      <LogoutIcon />
                    </span>
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
