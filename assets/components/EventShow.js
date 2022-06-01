import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

var parser = new DOMParser();

const EventShow = (props) => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState({});
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState([]);
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
    await axios.delete("/api/events/" + id).catch((err) => console.log(err));
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
    let date = new Date(
      dateString
    ).toString(); /* convert date object to string to insert into jsx */
    return date;
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
        </div>
      </div>
      <p>{event?.description}</p>
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
  );
};

export default EventShow;
