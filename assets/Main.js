import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import EventShow from "./components/EventShow";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import CreateEvent from "./components/CreateEvent";
import Edit from "./components/Edit";
import MyEvents from "./components/MyEvents";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem("loggedInUser");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setLoggedInUser({ userId: user.userId });
    }
  }, []);

  return (
    <Router>
      <Layout loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/events/:id"
            element={<EventShow loggedInUser={loggedInUser} />}
          />
          <Route path="/events/:id/edit" element={<Edit />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/my_events"
            element={<MyEvents loggedInUser={loggedInUser} />}
          />
          <Route
            path="/my_events/:id"
            element={<EventShow loggedInUser={loggedInUser} />}
          />
          <Route
            path="/login"
            element={
              <LogIn
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
        </Routes>
      </Layout>
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
