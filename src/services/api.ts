import axios from "axios";

export const gatewayApi = axios.create({
  baseURL: "https://deploying-system1-gateway1.onrender.com/api/gateway",
});

export const coreApi = axios.create({
  baseURL: "https://deploying-system2-corebank.onrender.com/api/core",
});
