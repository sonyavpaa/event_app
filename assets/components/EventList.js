import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = (props) => {
  const [eventList, setEventList] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetchEventList();
    fetchLocalEvents();
    setLoading(false);
  }, []);

  const fetchLocalEvents = async () => {
    await axios
      .get("api/events")
      .then((response) => {
        console.log(response.data);
        setEventList(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // //   Fetch data from helsinki api
  // const fetchEventList = async () => {
  //   await axios
  //     .get("http://api.hel.fi/linkedevents/v1/event")
  //     .then(function (response) {
  //       console.log(response.data.data); /* an array of object */
  //       setEventList(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {eventList.map((event, _) => {
          return (
            <div key={event.id} className="col">
              <div className="card shadow-sm">
                <img
                  className="card-img-top"
                  src={
                    // event?.images[0]?.url ||
                    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
                  }
                  alt={
                    // event?.images[0].alt_text ||
                    "image name"
                  }
                />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="text-gray-dark">{event.description}</p>
                  <p>{event.price}</p>
                  <p className="text-danger">
                    {props.dateTimeFormat(event.start_date_time)}
                  </p>
                  <Link
                    to={`event/${event.id}`}
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
