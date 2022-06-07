import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

const Header = ({ loggedInUser, setLoggedInUser }) => {
  const [APIData, setAPIData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();
  // fetch events

  useEffect(() => {
    const fetchLocalEvents = async () => {
      const response = await axios.get("/api/events");
      setAPIData(response.data);
    };
    fetchLocalEvents();
  }, []);

  // handle search
  const handleLiveSearch = (e) => {
    const searchWord = e.target.value;
    setSearch(searchWord);
    const result = APIData.filter((eventItem) => {
      return eventItem.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(result);
    }
  };

  // handle clear search input
  const clearSearchInput = () => {
    setFilteredData([]);
    setSearch("");
  };

  const logout = () => {
    localStorage.clear();
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand d-inline-block px-2" to="/">
            <i className="fas fa-gem me-1"></i>
            eventful
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <MenuIcon />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Browse events
                </Link>
              </li>
              {!loggedInUser ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Create an event
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/createEvent">
                      Create an event
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/my_events">
                      My events
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="search">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search keyword.."
                  aria-label="Search"
                  value={search}
                  onChange={handleLiveSearch}
                />
                {search.length == 0 ? (
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                ) : (
                  <ClearIcon id="clearBtn" onClick={clearSearchInput} />
                )}
              </form>
              {filteredData.length != 0 && (
                <div className="dataResult">
                  {filteredData.slice(0, 15).map((event, index) => {
                    return (
                      <Link
                        target="_blank"
                        key={index}
                        className="dataItem"
                        to={`events/${event.id}`}
                      >
                        <p>{event.name}</p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {!loggedInUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {loggedInUser && (
                <>
                  <li className="nav-item mt-2 mt-lg-0">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
