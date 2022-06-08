import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyEvents = () => {
  // States
  const [APIData, setAPIData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem("loggedInUser");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setLoggedInUser({ userId: user.userId });
    }

    const fetchLocalEvents = async () => {
      setLoading(true);
      const response = await axios.get("/api/events");
      setAPIData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    };
    fetchLocalEvents();
  }, []);

  const userEvents = APIData.filter((event) => {
    return event?.userId == loggedInUser?.userId;
  });

  // Date time format

  const dateTimeFormat = (dateString) => {
    // get day of the week (Mon)

    let dayOfWeek = new Date(dateString).toDateString().slice(0, 4);

    // get time(12:00)
    let time = new Date(dateString)
      .toLocaleTimeString()
      .slice(0, 5)
      .replaceAll(".", ":");

    // get date (06.06.2022)
    let date = new Date(dateString).toLocaleDateString().replaceAll("/", ".");

    // shorten timezone (EEST)
    let timeZone = new Date(dateString)
      .toLocaleDateString("en-FI", {
        day: "2-digit",
        timeZoneName: "short",
      })
      .slice(4);

    //combine all together
    let fulldate =
      dayOfWeek + "" + time + " " + date + " " + "(" + timeZone + ")";

    return fulldate;
  };

  // show today/tomorrow/date
  const findDay = (dateString) => {
    let eventDate = new Date(dateString);
    let currentDate = new Date();
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    const diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
    if (diffDays < 1) {
      return `Today at ${dateTimeFormat(dateString)
        .substring(3)
        .substring(0, 7)}`;
    } else if (diffDays >= 1 && diffDays < 2) {
      return "Tomorrow";
    } else {
      return dateTimeFormat(dateString);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      {/* search  */}
      <h2 className="text-center mt-3 mb-3">My Events</h2>
      <div className="d-flex justify-content-center align-items-center"></div>
      <div className="container my-3"></div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {userEvents.map((event) => {
          return (
            <div key={event.id} className="col">
              <div className="card shadow-sm h-100">
                <img
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "225px",
                    objectFit: "cover",
                  }}
                  src={
                    event?.image ||
                    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
                  }
                  alt="image name"
                />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p>{event?.price}</p>
                  <p className="text-danger">
                    {dateTimeFormat(event.startDateTime)}
                  </p>
                  <p>
                    {event?.venue} - {event?.city}
                  </p>
                  <Link to={`${event.id}`} className="btn btn-primary mx-1">
                    See more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEvents;
