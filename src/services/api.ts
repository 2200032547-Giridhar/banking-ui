import axios from "axios";

export const gatewayApi = axios.create({
  baseURL: "http://localhost:8081/api/gateway",
});

export const coreApi = axios.create({
  baseURL: "http://localhost:8082/api/core",
});
