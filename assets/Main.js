import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import CreateEvent from "./components/CreateEvent";
import SignUp from "./components/SignUp";

const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/signUp" element={<SignUp />} />
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
