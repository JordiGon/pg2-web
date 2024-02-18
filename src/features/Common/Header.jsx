import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/UnoLogo.png";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";

const RootAppBar = styled(AppBar)({
  flexGrow: 1,
});

const StyledText = styled.div`
  background-color: #4a5572;
  border-radius: 20px;
  padding: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
  flex-basis: 0;
  margin-right: auto;
  margin-left: auto;
  max-width: 60%;
`;

function Header({ toggleSidebar }) {
  const title = useSelector((state) => state.header.headerTitle);
  const dispatch = useDispatch();

  return (
    <RootAppBar position="fixed" sx={{ backgroundColor: "#333652" }}>
      <Toolbar
        sx={{ display: "flex", alignItems: "center", alignContent: "center" }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: 50,
            maxWidth: 100,
            height: "auto",
            paddingRight: "1em",
          }}
        />
        <StyledText>{title}</StyledText>
        <IconButton sx={{ color: "white" }}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </RootAppBar>
  );
}

export default Header;
