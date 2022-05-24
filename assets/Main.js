import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Header from "./Components/Header";
import CreateEvent from "./Components/CreateEvent";
const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/createEvent" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

export default Main;
