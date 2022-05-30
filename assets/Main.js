import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventShow from "./components/EventShow";
import EventList from "./components/EventList";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import CreateEvent from "./components/CreateEvent";

const Main = () => {
  // format date and time
  const dateTimeFormat = (str) => {
    let date = new Date(
      Date.parse(str)
    ).toString(); /* convert date object to string to insert into jsx */
    return date;
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home dateTimeFormat={dateTimeFormat} />} />
        <Route
          path="/events/:id"
          element={<EventShow dateTimeFormat={dateTimeFormat} />}
        />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
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
