import React, { cloneElement, useEffect, useRef, useState } from "react";
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
import ListItem from "@mui/joy/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import Input from "@mui/joy/Input";
import Dropdown from "react-bootstrap/Dropdown";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function UserList({ users }) {
  const [isLoading, setIsLoading] = useState(false);
  const [workoutTypes, setWorkoutTypes] = useState();
  const [selectedWorkout, setSelectedWorkout] = useState("Back");
  const [open, setOpen] = useState(false);
  const [profileModalOpen, setProfileModalClose] = useState(false);
  // const [assignedWorkouts, setAssignedWorkouts] = useState();
  const [unAssignedWorkouts, setUnAssignedWorkouts] = useState();
  const [contextMenuInfo, setContextMenuInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateFormatTwo, setSelectedDateFormatTwo] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [newEvent, setNewEvent] = useState({
    workoutId: null,
    selectedExercise: null,
    selectedWorkoutType: selectedWorkout,
    recReps: null,
    recSets: null,
  });
  const [events, setEvents] = useState([]);
  const [popupViewMode, setPopupViewMode] = useState(0);

  const components = {
    event: ({ event }) => {
      const title = event.title;
      return <ListItem level="title-md">{title}</ListItem>;
    },
  };

  const openCalendarPopup = (e) => {
    setAnchorEl(true);
    setSelectedDate(new Date());

    const rawDate = e.slots[0];

    let day = rawDate.getDate().toString().padStart(2, "0");
    let month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
    let year = rawDate.getFullYear().toString();

    let formattedDate = year + "-" + month + "-" + day;
    console.log(formattedDate, rawDate);
    setSelectedDateFormatTwo(rawDate);
    setSelectedDate(formattedDate);
  };

  const closeCalendarPopup = (e) => {
    setAnchorEl(false);
    setSelectedDate(null);
    setSelectedDateFormatTwo(null);
    setNewEvent(null);
  };

  const setModalOpen = async (user) => {
    setOpen(true);
    setCurrentUserData(user);
  };

  const setModalClose = async () => {
    setOpen(false);
    setCurrentUserData(null);
  };

  const handleSelectedWorkoutClick = async (workout) => {
    setSelectedWorkout(workout);
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
        workoutType: selectedWorkout,
        userId: currentUserData._id,
      });
      // setAssignedWorkouts(response.data.assignedWorkouts);
      setUnAssignedWorkouts(response.data.data);
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserWorkout = async () => {
    try {
      setIsLoading(true);
      const response = await AdminApi.get("/get-user-workouts", {
        params: {
          userId: currentUserData._id,
          startDate: selectedDate,
        },
      });
      let events = response.data.result.map((event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        return event;
      });

      setEvents(events);
    } catch (error) {
      Toast(`${error.response.data.error}`);
    }
    setIsLoading(false);
  };

  const assignWorkoutToUser = async () => {
    try {
      setIsLoading(true);

      if (!currentUserData) {
        return alert("User id not found!");
      } else if (!newEvent.workoutId) {
        return alert("Select an exercise!");
      } else if (!newEvent.selectedExercise) {
        return alert("Please select exercise!");
      } else if (!newEvent.recReps) {
        return alert("Please provide recommended reps!");
      } else if (!newEvent.recSets) {
        return alert("Please provide recommended sets!");
      }

      const response = await AdminApi.post("/assign-workout-to-user", {
        userId: currentUserData._id,
        workoutId: newEvent?.workoutId,
        selectedWorkoutType: selectedWorkout,
        title: `${newEvent.selectedExercise} ${newEvent.recReps}R - ${newEvent.recSets}S`,
        date: selectedDate,
      });

      if (response.status === 200) {
        Toast("Workout Added");
        getUserWorkout();
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const unAssignWorkoutToUser = async (event) => {
    try {
      setIsLoading(true);
      const response = await AdminApi.post("/unassign-workout-to-user", {
        userId: currentUserData._id,
        _id: event._id,
      });

      if (response.status === 200) {
        Toast("Workout Removed!");
        getUserWorkout();
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    let newDate = new Date(date);
    return (newDate = newDate.toDateString());
  };

  const addEvent = async (event) => {
    const date = selectedDate.split("-");

    const year = date[0];
    const month = date[1];
    const day = date[2];

    console.log(new Date(year, month - 1, day));
    const newEventObj = {
      title:
        event?.selectedExercise +
        ` ${newEvent?.recReps}R - ${newEvent?.recSets}S`,
      allDay: true,
      start: new Date(year, month - 1, day),
      end: new Date(year, month - 1, day),
    };
    setEvents([...events, newEventObj]);
    setNewEvent(null);
  };

  useEffect(() => {
    if (open) {
      getAllWorkoutTypes();
      getWorkoutByType();
      getUserWorkout();
    }
  }, [open, selectedWorkout]);

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
                      src={
                        user.profilePic
                          ? user.profilePic
                          : require("../../../assets/profile-picture-icon.jpg")
                      }
                      // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                      // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
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
                      <Button
                        variant="solid"
                        color="danger"
                        onClick={() => {
                          window.location.href = `/profile-details?userId=${user?._id}`;
                        }}
                      >
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
            minHeight: "50vh",
            maxHeight: "90vh",
            maxWidth: "60em",
            overflow: "scroll",
          }}
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "50%",
              bottom: 0,
              left: "50%",
              right: 0,
              borderRadius: 0,
              transform: "translate(-50%, -50%)",
              maxWidth: "unset",
            },
          })}
        >
          {!isLoading ? (
            <>
              <div>
                <Calendar
                  localizer={localizer}
                  events={events}
                  style={{ height: 500 }}
                  // popup={true}
                  components={components}
                  selectable
                  views="month"
                  onSelectSlot={(e) => openCalendarPopup(e)}
                />
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
      {anchorEl && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "fit-content",
            width: "max-content",
            maxWidth: "90vw",
            maxHeight: "60vh",
            background: "var(--joy-palette-danger-200)",
            padding: "2rem",
            borderRadius: "5px",
            zIndex: 10000,
          }}
        >
          <div>
            <Button
              size="sm"
              variant="outlined"
              color="danger"
              style={{ width: "100%" }}
              onClick={() => {
                setPopupViewMode(0);
              }}
            >
              Add Event
            </Button>
            <Button
              size="sm"
              variant="outlined"
              color="danger"
              className="my-2"
              style={{ width: "100%" }}
              onClick={() => {
                setPopupViewMode(1);
              }}
            >
              View Events
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {popupViewMode == 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ width: "100%", maxWidth: "20rem" }}>
                  <Input type="date" value={selectedDate} readOnly />

                  <Dropdown className="my-2" style={{ marginY: "0.5rem" }}>
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {selectedWorkout || "Workout Type"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {workoutTypes
                        ? workoutTypes.map((exercise, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                onClick={() => {
                                  handleSelectedWorkoutClick(exercise);
                                }}
                              >
                                {exercise}
                              </Dropdown.Item>
                            );
                          })
                        : " "}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {newEvent?.selectedExercise || "Exercises"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{ maxHeight: "10rem", overflowX: "scroll" }}
                    >
                      {unAssignedWorkouts
                        ? unAssignedWorkouts.map((exercise, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                onClick={() => {
                                  setNewEvent({
                                    ...newEvent,
                                    workoutId: exercise._id,
                                    selectedExercise: exercise.name,
                                  });
                                }}
                              >
                                {exercise.name}
                              </Dropdown.Item>
                            );
                          })
                        : " "}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="my-2">
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {newEvent?.recReps || "Recommended Reps"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{ maxHeight: "10rem", overflowX: "scroll" }}
                    >
                      {Array.from({ length: 30 }).map((_, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setNewEvent({ ...newEvent, recReps: index + 1 });
                          }}
                        >
                          {index + 1}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {newEvent?.recSets || "Recommended Sets"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{ maxHeight: "10rem", overflowX: "scroll" }}
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setNewEvent({ ...newEvent, recSets: index + 1 });
                          }}
                        >
                          {index + 1}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    variant="solid"
                    color="danger"
                    className="my-2"
                    style={{ width: "100%" }}
                    onClick={() => {
                      assignWorkoutToUser();
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  maxWidth: "30rem",
                  overflow: "scroll",
                }}
              >
                {events.map((event) => {
                  if (
                    new Date(selectedDate).toDateString() ===
                    event.start.toDateString()
                  ) {
                    return (
                      <Chip
                        size="lg"
                        variant="solid"
                        color="danger"
                        className="m-1"
                        endDecorator={
                          <ChipDelete
                            onDelete={() => unAssignWorkoutToUser(event)}
                          />
                        }
                      >
                        {event.title}
                      </Chip>
                    );
                  }
                })}
              </div>
            )}
          </div>
          <Button
            color="danger"
            variant="solid"
            onClick={() => closeCalendarPopup()}
          >
            Close
          </Button>
        </div>
      )}
    </>
  );
}

export default UserList;
