import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { AdminApi, AuthApi, GuestApi } from "../../../utils/api";
import { Toast } from "../../../components/Alert/Alert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItem from "@mui/joy/ListItem";
import Home from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CircularProgress from "@mui/material/CircularProgress";

// const ListItem = styled("li")(({ theme }) => ({
//   margin: theme.spacing(0.5),
// }));

function UserList({ users }) {
  const [isLoading, setIsLoading] = useState(false);
  const [workoutTypes, setWorkoutTypes] = useState();
  const [seletedWorkout, setSeletedWorkout] = useState("Back");
  const [open, setOpen] = useState(false);
  const [assignedWorkouts, setAssignedWorkouts] = useState();
  const [unAssignedWorkouts, setUnAssignedWorkouts] = useState();

  const [currentUserData, setCurrentUserData] = useState();

  const setModalOpen = async (user) => {
    setOpen(true);
    setCurrentUserData(user._id);
  };

  const setModalClose = async () => {
    setOpen(false);
    setCurrentUserData(null);
  };

  const handleSelectedWorkoutClick = async (workout) => {
    setSeletedWorkout(workout);
  };

  const getAllWorkoutTypes = async () => {
    try {
      setIsLoading(true);
      const response = await AuthApi.get("/workout/get-workout-types");
      setWorkoutTypes(response.data.result);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkoutByType = async () => {
    try {
      setIsLoading(true);
      const response = await AuthApi.post("/workout/get-workout-by-type", {
        workoutType: seletedWorkout,
        userId: currentUserData,
      });
      setAssignedWorkouts(response.data.assignedWorkouts);
      setUnAssignedWorkouts(response.data.otherExercises);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const assignWorkoutToUser = async (workoutId) => {
    try {
      setIsLoading(true);
      const response = await AdminApi.post("/assign-workout-to-user", {
        userId: currentUserData,
        workoutId: workoutId,
      });

      if (response.status === 200) {
        Toast("Workout Added");
        console.log(response);

        setAssignedWorkouts((prevAssignedWorkouts) => [
          ...prevAssignedWorkouts,
          response.data.result,
        ]);

        setUnAssignedWorkouts((prevUnAssignedWorkouts) =>
          prevUnAssignedWorkouts.filter(
            (workout) => workout._id !== response.data.result._id
          )
        );
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const unAssignWorkoutToUser = async (workoutId) => {
    try {
      setIsLoading(true);
      const response = await AdminApi.post("/unassign-workout-to-user", {
        userId: currentUserData,
        workoutId: workoutId,
      });

      if (response.status === 200) {
        Toast("Workout Removed!");
        console.log(response);

        setAssignedWorkouts((prevAssignedWorkouts) =>
          prevAssignedWorkouts.filter(
            (workout) => workout._id !== response.data.result._id
          )
        );

        setUnAssignedWorkouts((prevUnAssignedWorkouts) => [
          ...prevUnAssignedWorkouts,
          response.data.result,
        ]);
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getAllWorkoutTypes();
      getWorkoutByType();
    }
  }, [open, seletedWorkout]);

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // width: "100%",
          // maxWidth: "80em",
        }}
      >
        {users &&
          users.map((user, index) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "50em",
                  position: "relative",
                  my: "1em",
                  overflow: { xs: "auto", sm: "initial" },
                }}
              >
                <Card
                  orientation="horizontal"
                  style={{ backgroundColor: "var(--background-grey)" }}
                  sx={{
                    width: "100%",
                    borderColor: "#000",
                    flexWrap: "wrap",
                    [`& > *`]: {
                      "--stack-point": "500px",
                      minWidth:
                        "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                    },
                    overflow: "auto",
                  }}
                >
                  <AspectRatio
                    flex
                    ratio="1"
                    maxHeight={182}
                    sx={{ minWidth: 182 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                      srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent>
                    <Typography
                      fontSize="xl"
                      fontWeight="lg"
                      sx={{ color: "#fff" }}
                    >
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography
                      level="body-sm"
                      fontWeight="lg"
                      sx={{ color: "#fff" }}
                    >
                      Senior Journalist
                    </Typography>
                    <Sheet
                      color="warning"
                      sx={{
                        borderRadius: "sm",
                        p: 1.5,
                        my: 1.5,
                        display: "flex",
                        gap: 2,
                        "& > div": { flex: 1 },
                      }}
                    >
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Weight
                        </Typography>
                        <Typography fontWeight="lg">84</Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Days
                        </Typography>
                        <Typography fontWeight="lg">980</Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Height
                        </Typography>
                        <Typography fontWeight="lg">8.9</Typography>
                      </div>
                    </Sheet>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        "& > button": { flex: 1 },
                      }}
                    >
                      <Button
                        color="danger"
                        variant="outlined"
                        onClick={() => setModalOpen(user)}
                      >
                        Assign Workout
                      </Button>
                      <Button variant="solid" color="danger">
                        Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
      </div>
      <Modal open={open} onClose={() => setModalClose()}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          style={{
            width: "90%",
            maxWidth: "60em",
            overflow: "scroll",
          }}
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          {!isLoading ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // flexBasis: "18.5em",
                  }}
                >
                  <List
                    sx={{
                      maxWidth: "fit-content",
                    }}
                  >
                    {workoutTypes ? (
                      workoutTypes.map((exercise, index) => (
                        <ListItem
                          key={index}
                          onClick={() => {
                            handleSelectedWorkoutClick(exercise);
                          }}
                        >
                          <ListItemButton
                            selected={exercise === seletedWorkout}
                          >
                            <FitnessCenterIcon>
                              <Home />
                            </FitnessCenterIcon>
                            {exercise}
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <CircularProgress color="warning" />
                    )}
                  </List>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexBasis: "18.5em",
                    padding: "1em",
                    flex: 1,
                    // border: "1px solid red",
                    maxHeight: "fit-content",
                  }}
                >
                  {assignedWorkouts ? (
                    assignedWorkouts.map((exercise, index) => (
                      <Chip
                        sx={{ height: "fit-content", margin: "0.3em" }}
                        variant="outlined"
                        color="danger"
                        key={index}
                        onClick={() => alert("You clicked the chip!")}
                        endDecorator={
                          <ChipDelete
                            color="danger"
                            variant="plain"
                            onClick={() => unAssignWorkoutToUser(exercise._id)}
                          >
                            <DeleteForever />
                          </ChipDelete>
                        }
                      >
                        {exercise.name}
                      </Chip>
                    ))
                  ) : (
                    <CircularProgress color="warning" />
                  )}
                  {unAssignedWorkouts ? (
                    unAssignedWorkouts.map((exercise, index) => (
                      <Chip
                        sx={{ height: "fit-content", margin: "0.3em" }}
                        variant="soft"
                        color="success"
                        key={index}
                        onClick={() => alert("You clicked the chip!")}
                        endDecorator={
                          <ChipDelete
                            color="success"
                            variant="plain"
                            onClick={() => assignWorkoutToUser(exercise._id)}
                          >
                            <AddIcon />
                          </ChipDelete>
                        }
                      >
                        {exercise.name}
                      </Chip>
                    ))
                  ) : (
                    <CircularProgress color="warning" />
                  )}
                </div>
              </div>

              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row-reverse" },
                }}
              >
                <Button
                  variant="solid"
                  color="danger"
                  onClick={() => setOpen(false)}
                >
                  Continue
                </Button>
                <Button
                  variant="outlined"
                  color="danger"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <CircularProgress color="warning" />
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}

export default UserList;
