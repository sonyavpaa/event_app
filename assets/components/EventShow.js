import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

var parser = new DOMParser();

const EventShow = (props) => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState({});
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    const fetchSingle = async () => {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
    };
    fetchSingle();
    setLoading(false);
  }, []);

  // format date and time
  const dateTimeFormat = (dateString) => {
    let date = new Date(
      dateString
    ).toString(); /* convert date object to string to insert into jsx */
    return date;
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container px-3 mt-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap eventshow__top">
        <div className="eventshow__img">
          {" "}
          <img src={event?.image} alt="image name" />
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
          {event?.streetname && <p>{event?.streetname}</p>}
          {event?.postal_code && <p>{event?.postal_code}</p>}
          <p>{event?.city}</p>
        </div>
      </div>
      <hr />
      <div>
        <h3>About this event</h3>
        <p>{event.description}</p>
      </div>
      <p>
        More info here:
        {/* <a href="{event?.info_url?.en || event?.info_url.fi}">
      {event?.info_url?.en || event?.info_url?.fi
        ? event?.info_url.fi
        : "event url"}
    </a> */}
      </p>
      <h3>Tags: </h3>
      <h3>Share with friends</h3>
      <div>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-google"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
};

export default EventShow;