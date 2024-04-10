import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Card, Form } from "@themesberg/react-bootstrap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import theme from "../../Providers/ThemeProviders/themeProvider";
import { createTheme, ThemeProvider } from "@fluentui/react";
import { Toast } from "../../components/Alert/Alert";
import AuthLayout from "../../Layout/AuthLayout";
import { AuthApi } from "../../utils/api";
import useAuth from "../../Hooks/useAuth";
import { v4 } from "uuid";
import { storeImage } from "../../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Card2 from "@mui/joy/Card";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  useAuth();

  const [birthday, setBirthday] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [value, setValue] = useState(0);
  const [bmi, setBmi] = useState({
    weight: undefined,
    bmi: undefined,
    bodyFat: undefined,
    muscleRate: undefined,
    fatFreeBodyWeight: undefined,
    subcutaneousFat: undefined,
    visceralFat: undefined,
    bodyWater: undefined,
    skeletalMuscle: undefined,
    muscleMass: undefined,
    boneMass: undefined,
    protein: undefined,
    bmr: undefined,
    bodyAge: undefined,
  });

  const { role } = useAuth();

  const imageTypes = ["image/png", "image/jpg", "image/jpeg"];

  const fileInputRef = useRef(null);

  const handlePinIconClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileInputChange = async (e) => {
    const confirm = window.confirm(
      "Do you really want to change profile picture?"
    );
    if (confirm) {
      try {
        if (!imageTypes.includes(e.target.files[0].type)) {
          return alert("Please select a valid image!");
        }
        const imgRef = ref(storeImage, `files/${v4()}`);
        await uploadBytes(imgRef, e.target.files[0]);
        const url = await getDownloadURL(imgRef);
        console.log(url);
        const response = await AuthApi.post("/auth/update-user-profile-pic", {
          profilePic: url,
        });
        if (response.status === 200) {
          getUserProfile();
        }
      } catch (error) {
        alert(
          `${error?.response?.data?.error}` ||
            "Error uploading image to Firebase"
        );
      }
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await AuthApi.get("/auth/get-user-profile");
      if (response.status === 200) {
        setUserDetails(response.data.data);
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };

  const getBmiDetails = async (e) => {
    try {
      const response = await AuthApi.get("/auth/get-bmi-details");
      if (response.status === 200) {
        setBmi(response.data.data);
      }
    } catch (error) {
      Toast(`${error.response.data.error}`);
    }
  };

  const updateUserInformation = async (e) => {
    const confirm = window.confirm(
      "Are you sure you want to update this information"
    );
    if (!confirm) return;
    try {
      e.preventDefault();

      const response = await AuthApi.post("/auth/update-user-details", {
        userDetails,
      });
      if (response.status === 200) {
        getUserProfile();
      }
    } catch (error) {
      Toast(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    if (value === 1) {
      getBmiDetails();
    }
  }, [value]);

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <AuthLayout>
      <div
        className="my-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
          maxWidth: "100%",
        }}
      >
        <Box sx={{ px: { xs: 2, md: 1 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={
              <ChevronRightRoundedIcon
                fontSize="sm"
                style={{
                  color: "white",
                }}
              />
            }
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="/"
              aria-label="Home"
              style={{
                color: "white",
              }}
            >
              <HomeRoundedIcon />
            </Link>
            <Typography
              color="light"
              fontWeight={500}
              fontSize={12}
              style={{
                color: "white",
              }}
            >
              Profile
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ width: "100%" }}>
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
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="light"
              >
                <Tab
                  label="Profile"
                  style={{ color: "#fff", fontWeight: 500 }}
                  {...a11yProps(0)}
                />
                <Tab
                  label="BMI"
                  {...a11yProps(1)}
                  style={{ color: "#fff", fontWeight: 500 }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box className="shadow-sm mb-4">
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
                        <Card2
                          sx={{
                            width: 320,
                            maxWidth: "100%",
                            boxShadow: "lg",
                            backgroundColor: "#ff6333",
                            borderColor: "#000",
                          }}
                        >
                          <CardContent
                            sx={{
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            <Avatar
                              src={
                                userDetails.profilePic ||
                                require("../../assets/profile-picture-icon.jpg")
                              }
                              sx={{ "--Avatar-size": "4rem" }}
                              ref={fileInputRef}
                              onClick={handlePinIconClick}
                            />
                            <input
                              type="file"
                              style={{ display: "none" }}
                              ref={fileInputRef}
                              onChange={handleFileInputChange}
                            />
                            <Chip
                              size="sm"
                              variant="soft"
                              color="primary"
                              sx={{
                                mt: -1,
                                mb: 1,
                                borderColor: "background.surface",
                              }}
                            >
                              PRO
                            </Chip>
                            <Typography level="title-lg text-white">
                              {userDetails.firstName +
                                " " +
                                userDetails.lastName || "Loading..."}
                            </Typography>
                          </CardContent>
                        </Card2>
                      </Col>
                    </Row>
                    <h5 className="mb-4" style={{ color: "#fff" }}>
                      General information
                    </h5>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="firstName">
                          <TextField
                            value={userDetails.firstName}
                            onChange={handleUserDetailsChange}
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
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="lastName">
                          <TextField
                            value={userDetails.lastName}
                            onChange={handleUserDetailsChange}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
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

                                shrink: true,
                              }}
                            />
                          </Form.Group>
                        </ThemeProvider>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="gender">
                          <TextField
                            value={userDetails.gender}
                            onChange={handleUserDetailsChange}
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
                              shrink: true,
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
                            value={userDetails.email}
                            onChange={handleUserDetailsChange}
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
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="phone">
                          <TextField
                            value={userDetails.number}
                            onChange={handleUserDetailsChange}
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
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="my-4" style={{ color: "#fff" }}>
                      Address
                    </h5>
                    <Row>
                      <Col sm={12} className="mb-3">
                        <Form.Group id="address">
                          <TextField
                            value={userDetails.address}
                            onChange={handleUserDetailsChange}
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
                              shrink: true,
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
                        onClick={updateUserInformation}
                      >
                        Save All
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Box className="shadow-sm mb-4">
                <Card.Body>
                  <Form>
                    <h5 className="mb-4" style={{ color: "#fff" }}>
                      BMI Information
                    </h5>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="weight">
                          <TextField
                            value={bmi.weight}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="weight"
                            label="Weight"
                            placeholder="Weight"
                            name="weight"
                            autoFocus
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="bmi">
                          <TextField
                            value={bmi.bmi}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="bmi"
                            label="BMI"
                            placeholder="BMI"
                            name="bmi"
                            autoFocus
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="align-items-center">
                      <Col md={6} className="mb-3">
                        <ThemeProvider applyTo="body" theme={theme2}>
                          <Form.Group id="bodyFat">
                            <TextField
                              value={bmi.bodyFat}
                              margin="normal"
                              required
                              fullWidth
                              variant="outlined"
                              id="bodyFat"
                              label="Body Fat"
                              placeholder="Body Fat"
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
                        <Form.Group id="muscleRate">
                          <TextField
                            value={bmi.muscleRate}
                            margin="normal"
                            required
                            placeholder="Muscle Rate"
                            fullWidth
                            variant="outlined"
                            id="muscleRate"
                            label="Muscle Rate"
                            type="muscleRate"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="fatFreeBodyWeight">
                          <TextField
                            value={bmi.fatFreeBodyWeight}
                            margin="normal"
                            required
                            placeholder="Fat Free Body Weight"
                            fullWidth
                            variant="outlined"
                            id="fatFreeBodyWeight"
                            label="Fat Free Body Weight"
                            type="fatFreeBodyWeight"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="subcutaneousFat">
                          <TextField
                            value={bmi.subcutaneousFat}
                            margin="normal"
                            required
                            placeholder="Subcutaneous Fat"
                            fullWidth
                            variant="outlined"
                            id="subcutaneousFat"
                            label="Subcutaneous Fat"
                            type="subcutaneousFat"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="visceralFat">
                          <TextField
                            value={bmi.visceralFat}
                            margin="normal"
                            required
                            placeholder="Visceral Fat"
                            fullWidth
                            variant="outlined"
                            id="visceralFat"
                            label="Visceral Fat"
                            type="visceralFat"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="bodyWater">
                          <TextField
                            value={bmi.bodyWater}
                            margin="normal"
                            required
                            placeholder="Body Water"
                            fullWidth
                            variant="outlined"
                            id="Body Water"
                            label="Subcutaneous Fat"
                            type="bodyWater"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="skeletalMuscle">
                          <TextField
                            value={bmi.skeletalMuscle}
                            margin="normal"
                            required
                            placeholder="Skeletal Muscle"
                            fullWidth
                            variant="outlined"
                            id="skeletalMuscle"
                            label="Skeletal Muscle"
                            type="skeletalMuscle"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="muscleMass">
                          <TextField
                            value={bmi.muscleMass}
                            margin="normal"
                            required
                            placeholder="Muscle Mass"
                            fullWidth
                            variant="outlined"
                            id="Muscle Mass"
                            label="Subcutaneous Fat"
                            type="muscleMass"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="boneMass">
                          <TextField
                            value={bmi.boneMass}
                            margin="normal"
                            required
                            placeholder="Bone Mass"
                            fullWidth
                            variant="outlined"
                            id="boneMass"
                            label="Bone Mass"
                            type="boneMass"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="protein">
                          <TextField
                            value={bmi.protein}
                            margin="normal"
                            required
                            placeholder="Protein"
                            fullWidth
                            variant="outlined"
                            id="Protein"
                            label="Protein"
                            type="protein"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="bmr">
                          <TextField
                            value={bmi.bmr}
                            margin="normal"
                            required
                            placeholder="BMR"
                            fullWidth
                            variant="outlined"
                            id="bmr"
                            label="BMR"
                            type="bmr"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="bodyAge">
                          <TextField
                            value={bmi.bodyAge}
                            margin="normal"
                            required
                            placeholder="Body Age"
                            fullWidth
                            variant="outlined"
                            id="bodyAge"
                            label="Body Age"
                            type="bodyAge"
                            InputProps={{
                              className: "textfield",
                            }}
                            InputLabelProps={{
                              className: "textfield__label",
                              shrink: true,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      </div>
    </AuthLayout>
  );
}

export default Profile;
