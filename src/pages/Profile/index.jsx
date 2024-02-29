import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import BioCard from "../../components/BioCard/BioCard";

import Profile3 from "../../assets/profile-picture-3.jpg";
import AuthLayout from "../../Layout/AuthLayout";

function Profile() {
  return (
    <AuthLayout>
      <div
        className="my-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "100%",
        }}
      >
        <GeneralInfoForm />
      </div>
    </AuthLayout>
  );
}

export default Profile;
