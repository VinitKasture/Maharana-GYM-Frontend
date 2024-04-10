import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { AuthApi, GuestApi } from "../../utils/api";
import { Toast } from "../../components/Alert/Alert";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import GuestLayout from "../../Layout/GuestLayout";
import useAuth from "../../Hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function Index() {
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [assignedWorkouts, setAssignedWorkouts] = useState(null);
  const [seletedWorkout, setSeletedWorkout] = useState("Back");
  const [currentUserData, setCurrentUserData] = useState(useAuth);

  const getWorkoutByType = async () => {
    try {
      const response = await AuthApi.get("/workout/get-user-workout");
      setAssignedWorkouts(response.data.result);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    getWorkoutByType();
  }, [seletedWorkout]);

  return (
    <>
      <GuestLayout>
        <Container>
          {currentUserData.role === "Admin" ||
          currentUserData.role === "SuperAdmin" ? (
            <div
              style={{
                display: "flex",
                maxWidht: "30em",
                width: "100%",
                margin: "1rem",
                padding: "0.5rem",
                border: "1px solid red",
                borderRadius: "0.5rem",
                backgroundColor: "#b22a00",
              }}
            >
              <Button
                color="warning"
                style={{
                  // minWidth: "8rem",
                  // maxWidth: "12rem",
                  flex: 1,
                  marginRight: "0.5rem",
                }}
                onClick={() => (window.location.href = "/profile")}
              >
                <AccountCircleIcon style={{ marginRight: "0.5rem" }} />
                Profile
              </Button>
              <Button
                color="warning"
                style={{ flex: 1 }}
                onClick={() => (window.location.href = "/assign-workout")}
              >
                <FitnessCenterIcon style={{ marginRight: "0.5rem" }} />
                Assign Workouts
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                maxWidht: "30em",
                width: "100%",
                my: 2,
                padding: "1rem",
                border: "1px solid red",
                backgroundColor: "#b22a00",
              }}
            >
              {assignedWorkouts && assignedWorkouts.length > 0 ? (
                assignedWorkouts.map((workout) => {
                  return (
                    <Card
                      orientation="horizontal"
                      variant="outlined"
                      sx={{ maxWidth: 300, width: "100%", m: 1 }}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1" sx={{ width: 90 }}>
                          <img
                            src={
                              require(`../../assets/${workout.exerciseType}.png`) ||
                              require("../../assets/profile-cover.jpg")
                            }
                            srcSet={
                              require(`../../assets/${workout.exerciseType}.png`) ||
                              require("../../assets/profile-cover.jpg")
                            }
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent>
                        <Typography
                          fontWeight="md"
                          textColor="success.plainColor"
                        >
                          {workout.title}
                        </Typography>
                        {/* <Typography level="body-sm">California, USA</Typography> */}
                      </CardContent>
                      <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                          px: 0.2,
                          writingMode: "vertical-rl",
                          justifyContent: "center",
                          fontSize: "xs",
                          fontWeight: "xl",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          borderLeft: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        MAHARANA
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Typography fontWeight="lg" style={{ color: "white" }}>
                  No workouts yet !
                </Typography>
              )}
            </div>
          )}
        </Container>
      </GuestLayout>
    </>
  );
}

export default Index;
