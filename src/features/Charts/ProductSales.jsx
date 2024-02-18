import {
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
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
import { getHistoryInfo } from "../../store/HistoryInfoSlide";
import { setHistoryDate } from "../../store/HIstoryDatesSlice";
import { getPredictionInfo } from "../../store/PredictionSlice";
import { setPredictionDate } from "../../store/PredictionDatesSlice";
import LineChart from "./ProductSalesCharts/MonthTotalSales";
import TotalSalesCard from "./Common/TotalCard";
const StyledTabs = styled(Tabs)({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#fff",
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductSales() {
  const stations = useSelector((state) => state.access.stations);
  const [value, setValue] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Todos");
  const dateInfo = useSelector((state) => state.historyDate.month_year);
  const dateInfoP = useSelector((state) => state.predictionDate.month_year);
  const historyData = useSelector((state) => state.historyInformation.data);
  const loading = useSelector((state) => state.historyInformation.message);
  const ploading = useSelector((state) => state.predictionInformation.message);
  const id_user = useSelector((state) => state.login.user.id_user);
  const [chartData, setChartData] = useState([]);
  const [chartDataP, setChartDataP] = useState([]);
  const [chartDataHour, setChartDataHour] = useState([]);
  const [chartDataPHour, setChartDataPHour] = useState([]);
  const [chartDataWeekDay, setChartDataWeekDay] = useState([]);
  const [chartDataPWeekDay, setChartDataPWeekDay] = useState([]);
  const [days, setDays] = useState([]);
  const [hour, setHour] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [daysP, setDaysP] = useState([]);
  const parsedDate = dayjs(dateInfo.month_year, "MM-YYYY");
  const parsedDateP = dayjs(dateInfoP.month_year, "MM-YYYY");
  const [selectedDate, setSelectedDate] = useState(parsedDate);
  const [selectedDateP, setSelectedDateP] = useState(parsedDateP);
  const [totalHistory, setTotalHistory] = useState(0);
  const [totalPrediction, setTotalPrediction] = useState(0);
  const predictionData = useSelector(
    (state) => state.predictionInformation.data
  );
  const dispatch = useDispatch();
  const weekDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const optionsLabes = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ventas totales del Mes",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };
  const optionsLabesP = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Predicciones totales del Mes",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };
  const dataset = (chartData, chartDataP) => [
    {
      id: 1,
      label: "History",
      data: chartData,
      borderColor: "#222539",
      backgroundColor: "#383b4d",
    },
    {
      id: 2,
      label: "Prediction",
      data: chartDataP,
      borderColor: "#bdad1f",
      backgroundColor: "#ded68f",
    },
  ];

  function randomColor() {
    const colors = [
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function calculateChartDataAux(data, type, siteAux) {
    const uniqueFuelProd = [...new Set(data.map((obj) => obj["FUELPROD"]))]; // Obtener todos los valores únicos de FUELPROD
    const uniqueStations = [...new Set(data.map((obj) => obj["SITE"]))]; // Obtener todas las estaciones únicas
    let trlTime = data.map((obj) => obj[type]);
    let id = 1;
    let uniqueTrlTime = trlTime.filter(
      (time, index) => trlTime.indexOf(time) === index
    );
    const time = uniqueTrlTime.sort(compareHours);
    let fuelVolumes = time.map((trlTime) => {
      let filteredArr = data.filter((obj) => obj[type] === trlTime);
      let sum = filteredArr.reduce((acc, obj) => acc + obj.FUELVOLUME, 0);
      return sum;
    });
    const totalFuelVolume = fuelVolumes.reduce((acc, vol) => acc + vol, 0);
    const chartDataByFuelProd = uniqueFuelProd.map((fuelProd) => {
      const fuelProdData = data.filter((obj) => obj["FUELPROD"] === fuelProd); // Filtrar los objetos que pertenecen al FUELPROD actual

      const filteredFuelProdData = fuelProdData.filter((obj) => {
        if (siteAux === "TODAS") {
          return true;
        } else {
          return obj["SITE"] === siteAux;
        }
      });

      let trlTime = filteredFuelProdData.map((obj) => obj[type]);
      let uniqueTrlTime = trlTime.filter(
        (time, index) => trlTime.indexOf(time) === index
      );
      const time = uniqueTrlTime.sort(compareHours);

      let fuelVolumes = time.map((trlTime) => {
        let filteredArr = filteredFuelProdData.filter(
          (obj) => obj[type] === trlTime
        );
        let sum = filteredArr.reduce((acc, obj) => acc + obj.FUELVOLUME, 0);
        return sum;
      });
      let colorPicked;
      let fuelProdLabel;
      switch (fuelProd) {
        case 1:
          fuelProdLabel = "Regular";
          colorPicked = "#fe3946";
          break;
        case 2:
          fuelProdLabel = "Super";
          colorPicked = "#676766";
          break;
        case 3:
          fuelProdLabel = "Diesel";
          colorPicked = "#43963d";
          break;
        default:
          fuelProdLabel = "Desconocido";
      }
      return {
        id: id++,
        label: fuelProdLabel,
        data: fuelVolumes,
        borderColor: colorPicked,
        backgroundColor: colorPicked,
      };
    });

    return [time, chartDataByFuelProd, totalFuelVolume];
  }

  useEffect(() => {
    if (loading === "success") {
      const [daysAux, chartDataAux, totalFuelVolume] = calculateChartDataAux(
        historyData,
        "TRLDAY",
        "TODAS"
      );
      setDays(daysAux);
      setChartData(chartDataAux);
      setTotalHistory(totalFuelVolume);
      const [hoursAux, chartHourDataAux] = calculateChartDataAux(
        historyData,
        "TRLHOUR",
        "TODAS"
      );
      console.log(chartHourDataAux);
      const [weekday, chartWeekDayDataAux] = calculateChartDataAux(
        historyData,
        "WEEKDAY",
        "TODAS"
      );
      setChartDataWeekDay(chartWeekDayDataAux);
      setChartDataHour(chartHourDataAux);
      setHour(hoursAux);
      setWeekday(weekday);
    }
  }, [historyData, loading]);

  useEffect(() => {
    if (ploading === "success") {
      const [daysPAux, chartDataPAux, totalFuelVolume] = calculateChartDataAux(
        predictionData,
        "TRLDAY",
        "TODAS"
      );
      setDaysP(daysPAux);
      setChartDataP(chartDataPAux);
      setTotalPrediction(totalFuelVolume);
      const [, chartPHourDataAux] = calculateChartDataAux(
        predictionData,
        "TRLHOUR",
        "TODAS"
      );
      setChartDataPHour(chartPHourDataAux);
      const [, chartWeekDayDataAux] = calculateChartDataAux(
        predictionData,
        "WEEKDAY",
        "TODAS"
      );

      setChartDataPWeekDay(chartWeekDayDataAux);
    }
  }, [predictionData, ploading]);
  const options = [
    { id_station: 1, gu_station: null, station_name: "TODAS" },
    ...stations,
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const calculateTotalFuelVolume = (data, site) => {
    let filteredArr = data.filter(
      (obj) => site === "TODAS" || obj.SITE === site
    );
    let sum = filteredArr.reduce((acc, obj) => acc + obj.FUELVOLUME, 0);
    return sum;
  };

  const calculateFuelVolumes = (data, days, site, type) => {
    let fuelVolumes = days.map((trlDay) => {
      let filteredArr = data.filter(
        (obj) => obj[type] === trlDay && (site === "TODAS" || obj.SITE === site)
      );
      let sum = filteredArr.reduce((acc, obj) => acc + obj.FUELVOLUME, 0);
      return sum;
    });
    return fuelVolumes;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    let fuelVolumes;
    let fuelVolumesP;
    let fuelVolumesHour;
    let fuelVolumesPHour;
    let fuelVolumesWeekday;
    let fuelVolumesPWeekday;
    let totHist;
    let totPred;
    if (event.target.value !== "TODAS") {
      [, fuelVolumes] = calculateChartDataAux(
        historyData,
        "TRLDAY",
        event.target.value
      );
      [, fuelVolumesP] = calculateChartDataAux(
        predictionData,
        "TRLDAY",
        event.target.value
      );
      [, fuelVolumesHour] = calculateChartDataAux(
        historyData,
        "TRLHOUR",
        event.target.value
      );
      [, fuelVolumesPHour] = calculateChartDataAux(
        predictionData,
        "TRLHOUR",
        event.target.value
      );
      [, fuelVolumesWeekday] = calculateChartDataAux(
        historyData,
        "WEEKDAY",
        event.target.value
      );
      [, fuelVolumesPWeekday] = calculateChartDataAux(
        predictionData,
        "WEEKDAY",
        event.target.value
      );
      totHist = calculateTotalFuelVolume(historyData, event.target.value);
      totPred = calculateTotalFuelVolume(predictionData, event.target.value);
    } else {
      [, fuelVolumes] = calculateChartDataAux(historyData, "TRLDAY", "TODAS");
      [, fuelVolumesP] = calculateChartDataAux(
        predictionData,
        "TRLDAY",
        "TODAS"
      );
      [, fuelVolumesHour] = calculateChartDataAux(
        historyData,
        "TRLHOUR",
        "TODAS"
      );
      [, fuelVolumesPHour] = calculateChartDataAux(
        predictionData,
        "TRLHOUR",
        "TODAS"
      );
      [, fuelVolumesWeekday] = calculateChartDataAux(
        historyData,

        "WEEKDAY",
        "TODAS"
      );
      [, fuelVolumesPWeekday] = calculateChartDataAux(
        predictionData,

        "WEEKDAY",
        "TODAS"
      );
      totHist = calculateTotalFuelVolume(historyData, "TODAS");
      totPred = calculateTotalFuelVolume(predictionData, "TODAS");
    }
    setChartData(fuelVolumes);
    setChartDataP(fuelVolumesP);
    setChartDataHour(fuelVolumesHour);
    setChartDataPHour(fuelVolumesPHour);
    setChartDataWeekDay(fuelVolumesWeekday);
    setChartDataPWeekDay(fuelVolumesPWeekday);
    setTotalHistory(totHist);
    setTotalPrediction(totPred);
  };

  const handleHistoryDateChange = (event) => {
    let month_year = event.format("MM-YYYY");
    dispatch(getHistoryInfo({ month_year, id_user }));
    dispatch(setHistoryDate({ month_year }));
  };

  const handlePredicDateChange = (event) => {
    let month_year = event.format("MM-YYYY");
    dispatch(getPredictionInfo({ month_year, id_user }));
    dispatch(setPredictionDate({ month_year }));
  };
  function compareHours(a, b) {
    return parseInt(a) - parseInt(b);
  }

  return (
    <>
      <Paper
        elevation={2}
        style={{
          marginTop: "4.5rem",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
          padding: "0.5rem",
          backgroundColor: "transparent",
          height: "80rem",
        }}
      >
        <div style={{ width: "20rem", margin: "auto" }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Estacion
          </InputLabel>
          <NativeSelect
            onChange={handleOptionChange}
            defaultValue={1}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            style={{
              alignContent: "center",
              textAlign: "center",
              width: "20rem",
            }}
          >
            {options.map((option) => (
              <option
                key={option.id_station}
                value={option.gu_station}
                style={{ textAlign: "center", alignContent: "center" }}
              >
                {option.id_station === 1
                  ? option.station_name
                  : `${option.station_name} - ${option.gu_station}`}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="History Information"
              minDate={dayjs("2022-01-01")}
              maxDate={dayjs("2023-04-01")}
              value={selectedDate}
              onChange={handleHistoryDateChange}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="Prediction Information"
              minDate={dayjs("2022-01-01")}
              maxDate={dayjs("2023-12-01")}
              value={selectedDateP}
              onChange={handlePredicDateChange}
            />
          </LocalizationProvider>
        </div>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
        >
          <Grid item>
            <TotalSalesCard
              totalSales={totalHistory
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              titulo={"Total historico"}
            />
          </Grid>
          <Grid item>
            <TotalSalesCard
              totalSales={totalPrediction
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              titulo={"Total predicciones"}
            />
          </Grid>
        </Grid>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          >
            <Tab label="Por dia del mes" />
            <Tab label="Por hora" />
            <Tab label="Por dia de la semana" />
          </StyledTabs>
        </div>
        {value === 0 && (
          <div>
            {loading === "success" && ploading === "success" && (
              <LineChart
                days={days}
                dataSetsInfo={chartData}
                optionsLabes={optionsLabes}
              />
            )}
            {loading === "success" && ploading === "success" && (
              <LineChart
                days={days}
                dataSetsInfo={chartDataP}
                optionsLabes={optionsLabesP}
              />
            )}
          </div>
        )}
        {value === 1 && (
          <div>
            {/* {loading === "success" && ploading === "success" && (
              <LineChart
                days={hour}
                dataSetsInfo={dataset(chartDataHour, chartDataPHour)}
              />
            )} */}
            {loading === "success" && ploading === "success" && (
              <LineChart
                days={hour}
                dataSetsInfo={chartDataHour}
                optionsLabes={optionsLabes}
              />
            )}
            {loading === "success" && ploading === "success" && (
              <LineChart
                days={hour}
                dataSetsInfo={chartDataPHour}
                optionsLabes={optionsLabesP}
              />
            )}
          </div>
        )}
        {value === 2 && (
          <div>
            {/* {loading === "success" && ploading === "success" && (
              <LineChart
                days={weekDays}
                dataSetsInfo={dataset(chartDataWeekDay, chartDataPWeekDay)}
              />
            )} */}
            {loading === "success" && ploading === "success" && (
              <LineChart
                days={weekDays}
                dataSetsInfo={chartDataWeekDay}
                optionsLabes={optionsLabes}
              />
            )}
            {loading === "success" && ploading === "success" && (
              <LineChart
                days={weekDays}
                dataSetsInfo={chartDataPWeekDay}
                optionsLabes={optionsLabesP}
              />
            )}
          </div>
        )}
      </Paper>
    </>
  );
}
