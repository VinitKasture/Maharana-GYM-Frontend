import React from "react";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Typography from "@mui/joy/Typography";

function BreadcrumbsComponent({ tab, link }) {
  return (
    <Box sx={{ px: { xs: 2, md: 6 } }} style={{}}>
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
        {link && (
          <Link
            underline="none"
            color="neutral"
            href={`/${link}`}
            aria-label="Home"
            style={{
              color: "white",
            }}
          >
            {link}
          </Link>
        )}
        <Typography
          color="light"
          fontWeight={500}
          fontSize={12}
          style={{
            color: "white",
          }}
        >
          {tab}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default BreadcrumbsComponent;
