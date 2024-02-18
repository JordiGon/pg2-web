import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StyledPaper = styled(Paper)({
  width: "80%", // Ancho máximo del componente
  margin: "auto", // Centra el componente horizontalmente
  marginTop: "1rem", // Añade un margen superior
  marginBottom: "1rem", // Añade un margen inferior
  padding: "1rem", // Añade un padding interno
  boxSizing: "border-box", // Hace que el padding se incluya en el ancho total
});

const LineChart = ({ days, dataSetsInfo, optionsLabes }) => {
  return (
    <StyledPaper>
      <Line
        options={optionsLabes}
        datasetIdKey="id"
        data={{
          labels: days,
          datasets: dataSetsInfo,
        }}
        style={{ width: "100%", height: "25rem" }}
      />
    </StyledPaper>
  );
};

export default LineChart;
