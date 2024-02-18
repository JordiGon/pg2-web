import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Card, Grid, Icon, MenuItem, Paper, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import TotalSales from "../Charts/TotalSales";
import { Link } from "react-router-dom";
import { setHeaderTitle } from "../../store/headerSlice";
//import "../../css/Home.css";

export const Home = () => {
  const dispatch = useDispatch();
  const handleClick = (title) => {
    dispatch(setHeaderTitle(title.toUpperCase()));
  };
  return (
    <Paper
      elevation={2}
      sx={{
        marginTop: "4.1rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        padding: "0.5rem",
        backgroundColor: "transparent",
        height: "55rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <MenuItem component={Link} to="/total-sales">
            <Card
              onClick={() => handleClick("VENTAS TOTALES")}
              style={{
                color: "white",
                backgroundColor: "#232439",
                fontWeight: "bold",
              }}
              sx={{
                width: "100%",
                minWidth: "150px",
                minHeight: "150px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BarChartIcon
                style={{
                  fontSize: "3rem",
                  color: "white",
                  marginRight: "1rem",
                }}
              />
              VENTAS TOTALES
            </Card>
          </MenuItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <MenuItem component={Link} to="/product-sales">
            <Card
              onClick={() => handleClick("VENTAS POR PRODUCTO")}
              style={{
                color: "white",
                backgroundColor: "#232439",
                fontWeight: "bold",
              }}
              sx={{
                width: "100%",
                minWidth: "150px",
                minHeight: "150px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DonutSmallIcon
                style={{
                  fontSize: "3rem",
                  color: "white",
                  marginRight: "1rem",
                }}
              >
                shopping_basket
              </DonutSmallIcon>
              VENTA POR PRODUCTO
            </Card>
          </MenuItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <MenuItem component={Link} to="/station-sales">
            <Card
              onClick={() => handleClick("VENTAS POR ESTACION")}
              style={{
                color: "white",
                backgroundColor: "#232439",
                fontWeight: "bold",
              }}
              sx={{
                width: "100%",
                minWidth: "150px",
                minHeight: "150px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StackedLineChartIcon
                style={{
                  fontSize: "3rem",
                  color: "white",
                  marginRight: "1rem",
                }}
              >
                store
              </StackedLineChartIcon>
              VENTAS POR ESTACION
            </Card>
          </MenuItem>
        </Grid>
      </Grid>
    </Paper>
  );
};
