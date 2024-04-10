import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { DateRangePicker } from "rsuite";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { AdminApi } from "../../utils/api";
import { Toast } from "../Alert/Alert";

export default function ProfileCard({ setProfileModalClose, userId }) {
  const [user, setUser] = useState();

  const getUserById = async (userId) => {
    try {
      const response = await AdminApi.get("/get-user-by-id", {
        params: {
          userId: userId,
        },
      });
      if (response.status === 200) {
        setUser(response.data.data);
      }
    } catch (error) {
      return Toast(`${error.response.data.error}`);
    }
  };

  const formatDate = (date) => {
    let newDate = new Date(date);
    return (newDate = newDate.toDateString());
  };

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src={
                    user?.profilePic ||
                    require("../../assets/profile-picture-icon.jpg")
                  }
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    placeholder="First name"
                    value={user?.firstName + " " + user?.lastName}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Phone No.</FormLabel>
                  <Input size="sm" value={user?.number} />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Email"
                    value={user?.email}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Address</FormLabel>
              <FormControl
                sx={{
                  display: { sm: "flex-column", md: "flex-row" },
                  gap: 2,
                }}
              >
                <Input size="sm" placeholder="Address" value={user?.address} />
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 85,
                    top: 180,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" defaultValue="UI Developer" />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                defaultValue="siriwatk@test.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <FormLabel>Membership</FormLabel>
            <FormControl
              sx={{
                display: {
                  sm: "flex-column",
                  md: "flex-row",
                },
                gap: 2,
              }}
            >
              <Input size="sm" value={formatDate(user?.membership?.from)} />
              <Input size="sm" value={formatDate(user?.membership?.to)} />
            </FormControl>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="solid"
                color="success"
                onClick={() => setProfileModalClose(false)}
              >
                Update Membership
              </Button>
              <DateRangePicker />
              <Button
                size="sm"
                variant="solid"
                color="danger"
                onClick={() => setProfileModalClose(false)}
              >
                Close
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
