import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import AskMeProvider from "./Context/AskMeProvider";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AskMeProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AskMeProvider>
  </Router>
);
