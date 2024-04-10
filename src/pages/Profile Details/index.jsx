import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import { useSearchParams } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { DateRangePicker } from "rsuite";
import { AdminApi, AuthApi } from "../../utils/api";
import { Toast } from "../../components/Alert/Alert";
import AuthLayout from "../../Layout/AuthLayout";
import BreadcrumbsComponent from "../../components/Breadcrumbs/BreadcrumbsComponent";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import PropTypes from "prop-types";
import CardCover from "@mui/joy/CardCover";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Col, Row, Form } from "@themesberg/react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@fluentui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const { beforeToday } = DateRangePicker;

function ProfileDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [clientId, setClientId] = useState();
  const [user, setUser] = useState();
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

  const inputStyle = {
    backgroundColor: "transparent",
    color: "#F7C5C5",
  };
  const { role } = useAuth();

  const changeClientId = async () => {
    const confirm = window.confirm(
      "Are you sure you want to change client Id?"
    );

    if (!confirm) return;

    try {
      const response = await AdminApi.post("/change-client-id", {
        clientId: clientId,
        userId: userId,
      });

      if (response.status === 200) {
        window.location.reload();
        Toast("Client id changed!");
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getBmiDetails = async (e) => {
    try {
      const response = await AdminApi.get("/get-bmi-details", {
        params: { userId },
      });
      if (response.status === 200) {
        setBmi(response.data.data);
      }
    } catch (error) {
      Toast(`${error.response.data.error}`);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await AdminApi.get("/get-user-by-id", {
        params: {
          userId: userId,
        },
      });
      if (response.status === 200) {
        setUser(response.data.data);
        setClientId(response.data.data.clientId);
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  const formatDate = (date) => {
    let newDate = new Date(date);
    return (newDate = newDate.toDateString());
  };

  const updateMembership = async (membership) => {
    const confirmUpdate = window.confirm(
      "Do you really want to update this membership?"
    );

    if (!confirmUpdate) return;

    try {
      let startDate = membership[0].toDateString();
      let endDate = membership[1].toDateString();

      const response = await AdminApi.post("/update-membership", {
        userId,
        startDate,
        endDate,
      });
      if (response.status === 200) {
        Toast("Membership updated!");
        window.location.reload();
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  const updateBmiDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminApi.post("/update-bmi-details", {
        bmi,
        userId,
      });
      if (response.status === 200) {
        Toast("BMI updated successfully!");
      }
    } catch (error) {
      Toast(`${error.response.data.error}`);
    }
  };

  const changeBmiValue = (name, value) => {
    setBmi({ ...bmi, [name]: value });
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (value === 1) {
      getBmiDetails();
    }
  }, [value]);
  return (
    <AuthLayout>
      <BreadcrumbsComponent tab="Personal Details" link="assign-workout" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 350,
          }}
        >
          <Box
            sx={{
              postition: "relative",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(51, 51, 51, 0.8)",
              padding: "3em",
              borderRadius: "1em",
              backdropFilter: "blur(7px)",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
              color: "#fff",
              "& :not(.react-datetime)": {},
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Button
                sx={{ m: 1, flex: 1, flexBasis: "10rem" }}
                fullWidth
                color="danger"
                variant={value === 0 ? "solid" : "outlined"}
                onClick={() => setValue(0)}
              >
                Profile
              </Button>
              <Button
                sx={{ m: 1, flex: 1, flexBasis: "10rem" }}
                fullWidth
                color="danger"
                variant={value === 1 ? "solid" : "outlined"}
                onClick={() => setValue(1)}
              >
                BMI
              </Button>
            </Box>
            {value === 0 ? (
              <>
                <Card
                  variant="outlined"
                  sx={(theme) => ({
                    width: "100%",
                    maxWidth: "40rem",
                    gridColumn: "span 2",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    // resize: "horizontal",
                    overflow: "hidden",
                    background: "transparent",
                    gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                    transition: "transform 0.3s, border 0.3s",
                    border: 0,
                    // "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
                  })}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "max-content",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardCover
                      style={{
                        position: "relative",
                        maxWidth: "10rem",
                        aspectRatio: "1/1",
                      }}
                    >
                      <img
                        style={{ maxWidth: "10rem", aspectRatio: "1/1" }}
                        src={
                          user?.profilePic ||
                          require("../../assets/profile-picture-icon.jpg")
                        }
                        srcSet={
                          user?.profilePic ||
                          require("../../assets/profile-picture-icon.jpg")
                        }
                        loading="lazy"
                        alt=""
                      />
                    </CardCover>
                  </div>
                  <Card
                    variant="solid"
                    color="danger"
                    sx={{
                      width: "100%",
                      maxHeight: "max-content",
                      mx: "auto",
                      overflow: "auto",
                      resize: "horizontal",
                      background: "transparent",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                        gap: 1.5,
                      }}
                    >
                      <FormControl sx={{ gridColumn: "1/-1" }}>
                        <FormLabel style={inputStyle}>Name</FormLabel>
                        <Input
                          value={user?.firstName + " " + user?.lastName}
                          style={inputStyle}
                          color="danger"
                        />
                      </FormControl>
                      <FormControl sx={{ gridColumn: "1/-1" }}>
                        <FormLabel style={inputStyle}>Client ID</FormLabel>
                        <Input
                          value={clientId}
                          onChange={(e) => {
                            setClientId(e.target.value);
                          }}
                          style={inputStyle}
                          color="danger"
                        />
                      </FormControl>
                      <FormControl sx={{ gridColumn: "1/-1" }}>
                        <FormLabel style={inputStyle}>Email</FormLabel>
                        <Input
                          value={user?.email}
                          style={inputStyle}
                          color="danger"
                        />
                      </FormControl>
                      <FormControl sx={{ gridColumn: "1/-1" }}>
                        <FormLabel style={inputStyle}>Number</FormLabel>
                        <Input
                          value={user?.number}
                          style={inputStyle}
                          color="danger"
                        />
                      </FormControl>
                      <FormControl sx={{ gridColumn: "1/-1" }}>
                        <FormLabel style={inputStyle}>Membership</FormLabel>
                        <Input
                          value={
                            formatDate(user?.membership?.from) +
                            " - " +
                            formatDate(user?.membership?.to)
                          }
                          style={{ ...inputStyle, margin: "0 0 0.5rem 0" }}
                          color="danger"
                        />
                      </FormControl>
                      <FormControl sx={{ gridColumn: "1/-1" }}>
                        <FormLabel style={inputStyle}>Address</FormLabel>
                        <Input
                          value={user?.address}
                          style={inputStyle}
                          color="danger"
                        />
                      </FormControl>
                      <DateRangePicker
                        onChange={updateMembership}
                        showOneCalendar
                        placement="auto"
                        size="md"
                        placeholder="Update membership"
                      />
                    </CardContent>
                  </Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      padding: "1rem",
                    }}
                  >
                    {user?.clientId !== clientId ? (
                      <Button
                        color="danger"
                        variant="outlined"
                        onClick={changeClientId}
                      >
                        Update Client Id
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </Card>
              </>
            ) : (
              <Stack gap={4} sx={{ mt: 2 }}>
                <form onSubmit={(e) => updateBmiDetails(e)}>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Weight</FormLabel>
                    <Input
                      color="danger"
                      value={bmi.weight}
                      onChange={(e) => changeBmiValue("weight", e.target.value)}
                      placeholder="Weight"
                      style={inputStyle}
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>BMI</FormLabel>
                    <Input
                      type="bmi"
                      placeholder="BMI"
                      value={bmi.bmi}
                      onChange={(e) => changeBmiValue("bmi", e.target.value)}
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Body Fat</FormLabel>
                    <Input
                      value={bmi.bodyFat}
                      onChange={(e) =>
                        changeBmiValue("bodyFat", e.target.value)
                      }
                      placeholder="Body Fat"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Muscle Rate</FormLabel>
                    <Input
                      value={bmi.muscleRate}
                      onChange={(e) =>
                        changeBmiValue("muscleRate", e.target.value)
                      }
                      placeholder="Muscle Rate"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>
                      Fat Free Body Weight
                    </FormLabel>
                    <Input
                      value={bmi.fatFreeBodyWeight}
                      onChange={(e) =>
                        changeBmiValue("fatFreeBodyWeight", e.target.value)
                      }
                      placeholder="Fat Free Body Weight"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Subcutaneous Fat</FormLabel>
                    <Input
                      value={bmi.subcutaneousFat}
                      onChange={(e) =>
                        changeBmiValue("subcutaneousFat", e.target.value)
                      }
                      placeholder="Subcutaneous Fat"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Visceral Fat</FormLabel>
                    <Input
                      value={bmi.visceralFat}
                      onChange={(e) =>
                        changeBmiValue("visceralFat", e.target.value)
                      }
                      placeholder="Visceral Fat"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Body Water</FormLabel>
                    <Input
                      value={bmi.bodyWater}
                      onChange={(e) =>
                        changeBmiValue("bodyWater", e.target.value)
                      }
                      placeholder="Body Water"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Skeletal Muscle</FormLabel>
                    <Input
                      value={bmi.skeletalMuscle}
                      onChange={(e) =>
                        changeBmiValue("skeletalMuscle", e.target.value)
                      }
                      placeholder="Skeletal Muscle"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Muscle Mass</FormLabel>
                    <Input
                      value={bmi.muscleMass}
                      onChange={(e) =>
                        changeBmiValue("muscleMass", e.target.value)
                      }
                      placeholder="Muscle Mass"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Bone Mass</FormLabel>
                    <Input
                      value={bmi.boneMass}
                      onChange={(e) =>
                        changeBmiValue("boneMass", e.target.value)
                      }
                      placeholder="Bone Mass"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Protein</FormLabel>
                    <Input
                      value={bmi.protein}
                      onChange={(e) =>
                        changeBmiValue("protein", e.target.value)
                      }
                      placeholder="Protein"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>BMR</FormLabel>
                    <Input
                      value={bmi.bmr}
                      onChange={(e) => changeBmiValue("bmr", e.target.value)}
                      placeholder="BMR"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  <FormControl className="my-3">
                    <FormLabel style={inputStyle}>Body Age</FormLabel>
                    <Input
                      value={bmi.bodyAge}
                      onChange={(e) =>
                        changeBmiValue("bodyAge", e.target.value)
                      }
                      placeholder="Body Age"
                      style={inputStyle}
                      color="danger"
                    />
                  </FormControl>
                  {role === "SuperAdmin" && (
                    <Button
                      type="submit"
                      color="danger"
                      variant="solid"
                      fullWidth
                    >
                      Save All
                    </Button>
                  )}
                </form>
              </Stack>
            )}
          </Box>
        </Box>
      </div>
    </AuthLayout>
  );
}

export default ProfileDetails;
