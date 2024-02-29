import React from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/Header/Header";
import Box from "@mui/material/Box";

function GuestLayout(props) {
  return (
    <>
      <Box className="guestLayout">
        {/* <div className="background-image"></div> */}
        <Header />
        <Container>{props.children}</Container>
      </Box>
    </>
  );
}

export default GuestLayout;
