import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Form, InputGroup } from "@themesberg/react-bootstrap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import theme from "../Providers/ThemeProviders/themeProvider";
import {
  initializeIcons,
  createTheme,
  ThemeProvider,
  DatePicker,
  PrimaryButton,
} from "@fluentui/react";
import BioCard from "./BioCard/BioCard";
import { ChoosePhotoWidget } from "./Widgets";

initializeIcons();

const theme2 = createTheme({
  palette: {
    themePrimary: "#ff3d00",
    themeLighterAlt: "#f2fbf9",
    themeLighter: "#ceefe7",
    themeLight: "#ff3d00",
    themeTertiary: "#5fc3ac",
    themeSecondary: "#ff3d00",
    themeDarkAlt: "#148c70",
    themeDark: "#11765e",
    themeDarker: "#0c5746",
    neutralLighterAlt: "#323232",
    neutralLighter: "#3a3a3a",
    neutralLight: "#484848",
    neutralQuaternaryAlt: "#505050",
    neutralQuaternary: "#575757",
    neutralTertiaryAlt: "#747474",
    neutralTertiary: "#ececec",
    neutralSecondary: "#efefef",
    neutralPrimaryAlt: "#f2f2f2",
    neutralPrimary: "#e3e3e3",
    neutralDark: "#f9f9f9",
    black: "#fcfcfc",
    white: "#292929",
  },
});

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Box
      className="shadow-sm mb-4"
      sx={{
        postition: "relative",
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(51, 51, 51, 0.8)",
        border: `2px solid ${theme.palette.primary.main}`,
        padding: "3em",
        borderRadius: "1em",
        backdropFilter: "blur(7px)",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        color: "#fff",
        "& :not(.react-datetime)": {
          // color: "#000",
        },
      }}
    >
      <Card.Body>
        <Form>
          <Row>
            <Col
              md={12}
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BioCard />
            </Col>
          </Row>
          <h5 className="mb-4">General information</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="lastName"
                  label="Last Name"
                  name="email"
                  autoComplete="firstName"
                  autoFocus
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <ThemeProvider applyTo="body" theme={theme2}>
                <Form.Group id="birthday">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    id="birthday"
                    label="Date Of Birth"
                    type="date"
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                    InputProps={{
                      className: "textfield",
                    }}
                    InputLabelProps={{
                      className: "textfield__label",
                      shrink: true,
                    }}
                  />
                </Form.Group>
              </ThemeProvider>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="gender"
                  label="Gender"
                  SelectProps={{
                    native: true,
                  }}
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                >
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </TextField>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <TextField
                  margin="normal"
                  required
                  placeholder="Email"
                  fullWidth
                  variant="outlined"
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+91-345 678 910"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="address"
                  autoComplete="off"
                  label="Address"
                  placeholder="Enter your home address"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="city"
                  label="City"
                  placeholder="City"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="state"
                  label="Select state"
                  placeholder="State"
                  SelectProps={{
                    native: true,
                  }}
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                >
                  <option value="WY">Wyoming</option>
                </TextField>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  id="zip"
                  label="ZIP"
                  type="tel"
                  placeholder="ZIP"
                  InputProps={{
                    className: "textfield",
                  }}
                  InputLabelProps={{
                    className: "textfield__label",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
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
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Box>
  );
};
