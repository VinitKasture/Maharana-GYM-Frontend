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
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function Index() {
  const navigate = useNavigate();

  useAuth();

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [assignedWorkouts, setAssignedWorkouts] = useState([]);
  const [seletedWorkout, setSeletedWorkout] = useState("Back");
  const [currentUserData, setCurrentUserData] = useState(useAuth);

  const getAllWorkoutTypes = async () => {
    try {
      const response = await AuthApi.get("/workout/get-workout-types");
      setWorkoutTypes(response.data.result);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  const getWorkoutByType = async () => {
    try {
      const response = await AuthApi.post("/workout/get-workout-by-type", {
        workoutType: seletedWorkout,
        userId: currentUserData,
      });
      setAssignedWorkouts(response.data.assignedWorkouts);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    getAllWorkoutTypes();
    getWorkoutByType();
    console.log(currentUserData);
  }, [seletedWorkout]);

  return (
    <>
      <GuestLayout>
        <Container>
          <Card
            // variant="solid"
            // color="warning"
            sx={{
              maxWidht: "30em",
              width: "100%",
              my: 2,
              border: "1px solid red",
              backgroundColor: "#b22a00",
            }}
          >
            <Box
              sx={{
                my: 3,
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {workoutTypes &&
                workoutTypes.map((type, index) => (
                  <Card
                    orientation="horizontal"
                    variant="soft"
                    color="danger"
                    sx={{
                      maxWidth: 260,
                      margin: "0.3em",
                      flex: 1,
                      flexBasis: "13em",
                    }}
                    key={index}
                    onClick={() => {
                      setSeletedWorkout(type);
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img
                          srcSet={require(`../../assets/${type}.png`)}
                          loading="lazy"
                          alt=""
                        />
                      </AspectRatio>
                    </CardOverflow>
                    <CardContent>
                      <Typography
                        fontWeight="md"
                        textColor="warning.plainColor"
                      >
                        {type}
                      </Typography>
                      <Typography level="body-sm">30 Reps</Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
            <div>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                }}
              >
                {assignedWorkouts && assignedWorkouts.length > 0 ? (
                  assignedWorkouts.map((workout, index) => (
                    <Button
                      size="sm"
                      key={index}
                      style={{
                        // flexBasis: "8em",
                        maxWidth: "fit-content",
                        backgroundColor: "#000",
                        margin: "0.3em",
                        flex: 1,
                      }}
                    >
                      {workout.name}
                    </Button>
                  ))
                ) : (
                  <Button
                    size="sm"
                    style={{
                      flexBasis: "8em",
                      maxWidth: "max-content",
                      backgroundColor: "#000",
                      margin: "0.3em",
                      flex: 1,
                    }}
                  >
                    No Workout Assigned!
                  </Button>
                )}
              </Box>
            </div>
          </Card>
        </Container>
      </GuestLayout>
    </>
  );
}

export default Index;
