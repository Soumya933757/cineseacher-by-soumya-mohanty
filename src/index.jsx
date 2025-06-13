import React from "react";

import initializeAxios from "apis/axios";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import queryClient from "utils/queryClient";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

initializeAxios();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

reportWebVitals();
