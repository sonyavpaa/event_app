import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

const Edit = (props) => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState({});
  const [originalData, setoriginalData] = useState({});
  const [data, setData] = useState({
    name: "",
    organizer: "",
    description: "",
    category: "",
    streetname: "",
    city: "",
    venue: "",
    startDateTime: "",
    endDateTime: "",
    price: "",
    image: "",
    postalCode: "",
    tags: [],
  });
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState([]);

  const categories = ["music", "pets", "food"];

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    e.target.placeholder = "";
    if (e.target["id"] === "image") {
      const img = document.querySelector("img");
      let src = e.target.value;
      img.maxWidth = "10em";
      img.src = src;
    }
  };
  const changeCategory = (e) => {
    const categoryChosen = categories.find((c) => c === e.target.value);
    setData({
      ...data,
      category: categoryChosen,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const token = JSON.parse(
      window.localStorage.getItem("loggedInUserToken")
    ).token;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(config);

    try {
      const response = await axios.put(`/api/events/${id}`, data, config);
    } catch (error) {
      console.log(error);
    }

    document.querySelector("form").reset();
    const submitMessage = document.createElement("p");

    submitMessage.innerHTML = "Event edited!";

    document.querySelector(".submitMessage").appendChild(submitMessage);
  };

  const restore = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchSingle = async () => {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
      setData(response.data);
      setoriginalData(response.data);
    };
    fetchSingle();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="editFrame">
      <div className="imageFrame">
        <img src={event?.image} alt="event image" />
      </div>
      <form className="px-3 mt-5" onSubmit={submitData}>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="form-control" style={{ border: "none" }}>
            <input
              className="form-control my-1"
              type="url"
              name="image"
              id="image"
              onChange={changeData}
              defaultValue={event?.image}
              placeholder="Add image url"
            />
            <div className="d-flex form-group my-1">
              <input
                className=" d-flex form-control"
                type="text"
                name="name"
                id="name"
                onChange={changeData}
                defaultValue={event?.name}
                placeholder="Event name"
              />
            </div>
            <div className="form-group my-1">
              <input
                className="form-control"
                type="text"
                name="organizer"
                id="organizer"
                onChange={changeData}
                defaultValue={event?.organizer}
                placeholder="Organizer"
              />
            </div>
            <div>
              <input
                className="form-control my-1"
                type="text"
                name="price"
                id="price"
                onChange={changeData}
                defaultValue={event?.price}
                placeholder="Price"
              />
            </div>

            {/* date and time, location  */}

            <h3 style={{ marginTop: "1em" }}>
              {" "}
              <CalendarMonthIcon /> Date and time
            </h3>
            <div className="form-group  my-3">
              <label htmlFor="startDateTime" className="form-control">
                Start date and time
              </label>
              <input
                className="form-control"
                type="datetime-local"
                name="startDateTime"
                id="startDateTime"
                onChange={changeData}
                defaultValue={event?.startDateTime}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="endDateTime" className="form-control">
                End date and time
              </label>
              <input
                className="form-control"
                type="datetime-local"
                name="endDateTime"
                id="endDateTime"
                onChange={changeData}
                defaultValue={event?.endDateTime}
              />
            </div>
            <h3 style={{ marginTop: "1em" }}>
              {" "}
              <LocationOnIcon />
              Location
            </h3>
            <div className="locationFrame">
              <input
                className="form-control my-1"
                type="text"
                name="venue"
                id="venue"
                defaultValue={event.venue}
                onChange={changeData}
                placeholder="Venue name"
              />
              <input
                className="form-control my-1"
                type="text"
                name="streetname"
                id="streetname"
                defaultValue={event.streetname}
                placeholder="Street name and number"
                onChange={changeData}
              />
              <input
                className="form-control my-1"
                type="text"
                name="postalcode"
                id="postalcode"
                defaultValue={event.postalCode}
                onChange={changeData}
                placeholder="Postal Code"
              />
              <input
                className="form-control my-1"
                type="text"
                name="city"
                id="city"
                defaultValue={event.city}
                onChange={changeData}
                placeholder="City"
              />
            </div>
          </div>
          <hr />

          <h3 style={{ marginTop: "1em" }}>About this event</h3>
          <textarea
            className="form-control"
            type="text"
            name="description"
            id="description"
            rows="10"
            onChange={changeData}
            defaultValue={event.description}
            placeholder="Description"
          />
          <div
            className="category from-group row my-1"
            style={{ width: "100%" }}
          >
            <label htmlFor="category" className="col-sm-2 col-form-label">
              Category
            </label>
            <div className="col-sm-10">
              <select
                className="form-control my-1"
                name="category"
                id="category"
                onChange={changeCategory}
              >
                {categories.map((c) => (
                  <option
                    selected={c === event.category ? "selected" : null}
                    className="form-control"
                    key={c}
                    defaultValue={c}
                  >
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <input
          className="button form-control my-1"
          type="button"
          value="Restore original info"
          onClick={restore}
        />
        <input
          className="button form-control my-1 btn-primary"
          type="submit"
          value="Edit event"
        />
        <Link
          to={`/`}
          className="btn my-1 form-control btn-primary"
          style={{ backgroundColor: "rgb(245, 108, 108)", border: "none" }}
        >
          Cancel edit
        </Link>
        <div className="submitMessage" style={{ alignContent: "center" }}></div>
      </form>
    </div>
  );
};

export default Edit;
