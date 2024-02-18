import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/loginSlice";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Paper,
  TextField,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import logo from "../../assets/UnoLogo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { setHeaderTitle } from "../../store/headerSlice";
import { getStationAccess } from "../../store/AccessSlice";
import { setHistoryDate } from "../../store/HIstoryDatesSlice";
import { getHistoryInfo } from "../../store/HistoryInfoSlide";
import { getPredictionInfo } from "../../store/PredictionSlice";
import { setPredictionDate } from "../../store/PredictionDatesSlice";

const LoginContainer = styled.div`
  background-color: #333652;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(getUserInfo({ email, password }))
      .then((response) => {
        const id_user = response.payload.body.user.id_user;
        if (response.payload.statusCode === 200) {
          let currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() + 1);
          let month_year =
            (currentDate.getMonth() - 3).toString().padStart(2, "0") +
            "-" +
            currentDate.getFullYear().toString();
          dispatch(setHeaderTitle("HOME"));
          dispatch(getStationAccess(response.payload.body.user.id_user));
          dispatch(setHistoryDate({ month_year }));

          dispatch(getHistoryInfo({ month_year, id_user }));
          month_year =
            (currentDate.getMonth() - 2).toString().padStart(2, "0") +
            "-" +
            currentDate.getFullYear().toString();
          dispatch(setPredictionDate({ month_year }));
          dispatch(getPredictionInfo({ month_year, id_user }));
          navigate("/home");
        } else {
          setNotificationMessage("Inicio de sesión inválido");
          setShowNotification(true);
        }
      })
      .catch(console.error);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <LoginContainer>
      <Grid container spacing={2} justify="center">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Box p={2} mb={10}>
            <Box>
              <img
                src={logo}
                style={{
                  maxHeight: 100,
                  maxWidth: 250,
                  height: "auto",
                }}
              />
            </Box>
            <Box>
              <span style={{ color: "#FFFFFF" }}>PIXAR PROJECT</span>
            </Box>
          </Box>
          <Paper
            variant="outlined"
            style={{
              backgroundColor: "#4A5572",
              borderRadius: "22px",
            }}
          >
            <Box p={3}>
              <Box display="flex" alignItems="center" mb={3}>
                <Icon
                  style={{
                    color: "#FFFFFF",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <PersonOutlineIcon fontSize="medium" />
                </Icon>
                <TextField
                  fullWidth
                  label="CORREO"
                  variant="standard"
                  margin="dense"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  InputProps={{
                    style: { color: "#FFFFFF" },
                  }}
                  InputLabelProps={{
                    style: { color: "#FFFFFF" },
                  }}
                />
              </Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Icon
                  style={{
                    color: "#FFFFFF",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <LockOutlinedIcon fontSize="medium" />
                </Icon>
                <TextField
                  fullWidth
                  label="CONTRASENA"
                  variant="standard"
                  margin="dense"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  InputProps={{
                    style: { color: "#FFFFFF" },
                  }}
                  InputLabelProps={{
                    style: { color: "#FFFFFF" },
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{ background: "#BCAC1F", color: "#333652" }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </LoginContainer>
  );
};
