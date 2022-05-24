import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventShow from "./components/EventShow";
import EventList from "./components/EventList";
=======
>>>>>>> upstream/master

import Home from "./Components/Home";
import Header from "./Components/Header";
import CreateEvent from "./Components/CreateEvent";
const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
<<<<<<< HEAD
        <Route index element={<EventList />} />
        <Route path="/event/:id" element={<EventShow />} />
      </Routes>
      <Footer />
=======
        <Route index element={<Home />} />
        <Route path="/createEvent" element={<CreateEvent />} />
      </Routes>
>>>>>>> upstream/master
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
