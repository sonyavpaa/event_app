import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const EventShow = () => {
  const [id, setId] = useState(useParams().id);
  const location = useLocation();
  const event = location.state.event;
  console.log(event);

  useEffect(() => {
    axios
      .get(`http://api.hel.fi/linkedevents/v1/event/${id}`)
      .then(function (response) {
        setProject(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
};

export default EventShow;
