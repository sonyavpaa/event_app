import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Map from "./Map";

const EventShow = (props) => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const link =
    "https://www.bc.fi/koulutukset/koodaajakoulutus-tieto-ja-viestintatekniikan-perustutkinnon-osat/";

  useEffect(() => {
    const fetchSingle = async () => {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
    };
    fetchSingle();
    setLoading(false);
  }, []);

  const deleteEvent = async () => {
    const token = JSON.parse(
      window.localStorage.getItem("loggedInUserToken")
    ).token;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(config);

    try {
      const response = await axios.delete(`/api/events/${id}`, config);
    } catch (error) {
      console.log(error);
    }

    window.location.href = "/";
  };

  const share = (e) => {
    let navUrl;
    switch (e.currentTarget.name) {
      case "facebook":
        navUrl = "https://www.facebook.com/sharer/sharer.php?u=" + link;
        break;
      case "twitter":
        navUrl = "https://twitter.com/intent/tweet?text=" + link;
        break;
    }

    window.open(navUrl, "_blank");
  };

  // format date and time
  const dateTimeFormat = (dateString) => {
    let dayOfWeek = new Date(dateString).toDateString().slice(0, 4);

    let time = new Date(dateString)
      .toLocaleTimeString()
      .slice(0, 5)
      .replaceAll(".", ":");
    let date = new Date(dateString).toLocaleDateString().replaceAll("/", ".");
    // shorten timezone
    let timeZone = new Date(dateString)
      .toLocaleDateString("en-FI", {
        day: "2-digit",
        timeZoneName: "short",
      })
      .slice(4);

    let fulldate =
      time + " " + dayOfWeek + "" + date + " " + "(" + timeZone + ")";
    return fulldate;
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" container px-3 mt-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to={`/events/${event.id}/edit`}
            className="btn btn-primary mx-1"
          >
            Edit event
          </Link>
          <input
            className="btn btn-primary mx-1"
            type="button"
            value="Delete event"
            onClick={deleteEvent}
          />
        </div>
      </div>
      <div className="container px-3 mt-5">
        <div className="d-flex align-items-center justify-content-between flex-wrap eventshow__top">
          <div className="eventshow__img">
            {" "}
            <img
              src={
                event?.image ||
                "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
              }
              alt="image name"
            />
          </div>

          <div className="eventshow__content">
            <h2>{event?.name}</h2>
            <p>Organized By: {event?.organizer}</p>
            <p>{event?.price}</p>
            {/* date and time, location  */}
            <h3>
              <CalendarMonthIcon /> Date and time
            </h3>
            <p>Start time: {dateTimeFormat(event?.startDateTime)}</p>
            <p>
              End time:
              {dateTimeFormat(event?.endDateTime) || "Not available"}
            </p>
            <h3>
              <LocationOnIcon />
              Location
            </h3>
            {event?.venue && <p>{event?.venue}</p>}
            {event?.streetname && <p>{event?.streetname}</p>}
            {event?.postalCode && <p>{event?.postalCode}</p>}
            <p>{event?.city}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3>About this event</h3>
          <p className="eventDescription">{event.description}</p>
        </div>
        <p>More info here:</p>
        <h3>Tags: </h3>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {event?.tags?.map((tag) => {
            return (
              <a
                className="btn btn-outline-primary mx-1 my-1"
                href="/"
                key={tag}
                style={{ margin: "1em" }}
              >
                {tag}
              </a>
            );
          })}
        </div>
        <h3>Share with friends</h3>
        <div>
          <a
            href="#"
            name="facebook"
            className="me-4 text-reset"
            onClick={(e) => share(e)}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            name="twitter"
            className="me-4 text-reset"
            onClick={(e) => share(e)}
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
      <Map
        id="map"
        event={event ? event : ""}
        streetname={event?.streetname ? event?.streetname : ""}
        postalCode={event?.postalCode ? event?.postalCode : ""}
        city={event?.city ? event?.city : ""}
      />
    </div>
  );
};

export default EventShow;
