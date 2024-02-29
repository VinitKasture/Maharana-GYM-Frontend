import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useRef } from "react";

export default function BioCard() {
  const fileInputRef = useRef(null);

  const handlePinIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    console.log("File selected:", e.target.files[0]);
  };
  return (
    <Card
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
          src="https://firebasestorage.googleapis.com/v0/b/drive-clone-b30b3.appspot.com/o/1.jpg?alt=media&token=4313c6a2-eee7-40af-93b9-78c16962bb40"
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
        <Typography level="title-lg text-white">Josephine Blanton</Typography>
      </CardContent>
    </Card>
  );
}
