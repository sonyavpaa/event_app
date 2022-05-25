import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  var par = doc.querySelectorAll("p");
  par.forEach((p) => document.getElementById("eventinfo").appendChild(p));
};

const EventShow = () => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState({
    name: "",
    short_description: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    axios
      .get(`http://api.hel.fi/linkedevents/v1/event/${id}`)
      .then(function (response) {
        setEvent(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="container border mt-5">
      <h2>{event.name.fi}</h2>
      <img src="" alt="" />
      <div>{stringToHTML(event.description?.fi)}</div>
      <div id="eventinfo"></div>
      <p>{event.start_time}</p>
      <p>{event.end_time}</p>
    </div>
  );
};

export default EventShow;
