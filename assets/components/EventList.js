import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { number } from "prop-types";

const EventList = (props) => {
  // States
  const [APIData, setAPIData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // fetch events

  useEffect(() => {
    const fetchLocalEvents = async () => {
      setLoading(true);
      const response = await axios.get("/api/events");

      // filter out past events
      const validEvents = response?.data

        .filter(
          (event) => Date.parse(event.endDateTime) >= Date.parse(new Date())
        )

        .sort(function (a, b) {
          return new Date(a.startDateTime) - new Date(b.startDateTime);
        });

      setAPIData(validEvents);
      setFilteredData(validEvents);
      setLoading(false);
    };
    fetchLocalEvents();
  }, []);

  // create category array from APIData
  const categoryItems = [...new Set(APIData.map((event) => event.category))];

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

  // handle search
  const handleSearch = (searchValue) => {
    // set search state to the searchValue
    setSearch(searchValue);
    if (search === "") {
      setFilteredData(APIData);
    } else {
      // filter out APIData using filter method
      const result = APIData.filter((event) => {
        return Object.values(event)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredData(result);
    }
  };

  // handle free filter
  const handleFreeFilter = (e) => {
    const freeButtonValue = e.target.value.toLowerCase();
    const filteredFreeEvents = APIData.filter((eventItem) => {
      return eventItem.price.toLowerCase() === freeButtonValue;
    });
    setFilteredData(filteredFreeEvents);
  };

  // handle Category filter

  const handleCategoryFilter = (currentCategory) => {
    const result = APIData.filter((event) => {
      return event.category.toLowerCase() === currentCategory.toLowerCase();
    });
    setFilteredData(result);
  };

  // handle today filter
  const handleTodayFilter = (event) => {
    const buttonValue = event.target.value.toLowerCase();
    const result = APIData.filter((eventItem) => {
      return findDay(eventItem.startDateTime)
        .toLowerCase()
        .includes(buttonValue);
    });
    setFilteredData(result);
  };

  // handle clear search input
  const clearSearchInput = () => {
    setFilteredData(APIData);
    setSearch("");
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      {/* search  */}
      <div className="d-flex justify-content-center align-items-center">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search for events"
          aria-label="Search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {search.length != 0 && (
          <ClearIcon id="clearBtn" onClick={clearSearchInput} />
        )}
      </div>
      <div className="container my-3">
        Filters
        <FilterListIcon />
        <button
          type="button"
          className="btn btn-outline-primary mx-1 my-1"
          onClick={() => setFilteredData(APIData)}
        >
          All
        </button>
        <button
          type="button"
          value="free"
          className="btn btn-outline-primary mx-1 my-1"
          onClick={handleFreeFilter}
        >
          Free
        </button>
        <button
          value="today"
          type="button"
          className="btn btn-outline-primary mx-1 my-1"
          onClick={handleTodayFilter}
        >
          Today
        </button>
        {categoryItems.map((cat) => {
          return (
            <button
              type="button"
              className="btn btn-outline-primary mx-1 my-1"
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredData.length == 0 && <p>No results found</p>}
        {filteredData.map((event) => {
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
                  <h5 className="card-title">{event?.name}</h5>
                  <p>{event?.price}</p>
                  <p className="text-danger">{findDay(event?.startDateTime)}</p>
                  <p>
                    {event?.venue} - {event?.city}
                  </p>
                  <Link
                    to={`events/${event.id}`}
                    className="btn btn-primary mx-1"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          );
        }) ||
          APIData.map((event) => {
            return (
              <div key={event.id} className="col">
                <div className="card shadow-sm">
                  <img
                    className="card-img-top"
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
                    <Link
                      to={`events/${event.id}`}
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
