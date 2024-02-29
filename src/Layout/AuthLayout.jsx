import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/Header/Header";
import Box from "@mui/material/Box";

function AuthLayout(props) {
  const [backgroundSize, setBackgroundSize] = useState("30em");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setBackgroundSize(window.innerWidth / 1.1);
      } else {
        setBackgroundSize("30em");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box>
        <Box className="guestLayout">
          {/* <div className="background-image"></div> */}
          <Header />
          <Container>{props.children}</Container>
        </Box>
      </Box>
    </>
  );
}

export default AuthLayout;
