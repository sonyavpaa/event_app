import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    fetchEventList();
  }, []);

  const fetchEventList = () => {
    axios
      .get("http://api.hel.fi/linkedevents/v1/event")
      .then(function (response) {
        console.log(response.data.data); /* an array of object */
        setEventList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {eventList.map((event, key) => {
          return (
            <div key={event.id} className="col">
              <div className="card shadow-sm">
                <img
                  className="card-img-top"
                  src={event?.images[0].url}
                  alt={event?.images[0].alt_text}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.name.fi}</h5>

                  <p>{event?.short_description.fi}</p>
                  <p className="text-danger">{event.start_time}</p>
                  <Link
                    to={`/event/${event.id}`}
                    state={{ event: event }}
                    className="btn btn-primary mx-1"
                  >
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

export default EventList;
