import api from "./Api";

// Definimos los métodos para hacer las peticiones a los endpoints
const services = {
  // Endpoint para hacer login
  login: (data) => api.post("/user/login", data),
  access: (id) => api.get(`user/get-access/${id}`),
  historyData: (month_year) =>
    api.post("/transactions/get-by-date", month_year),
  predictionData: (monthYear) =>
    api.post("/prediction-model/get-predict", monthYear),
};

export default services;
