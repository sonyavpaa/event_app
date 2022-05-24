import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventShow from "./components/EventShow";
import EventList from "./components/EventList";

const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<EventList />} />
        <Route path="/event/:id" element={<EventShow />} />
        <Route path="/createEvent" element={<CreateEvent />} />
      </Routes>
      <Footer />
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
