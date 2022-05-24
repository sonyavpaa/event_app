import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [data, setData] = useState({
    eventname: "",
    organizer: "",
    description: "",
    category: "",
    street_address: "",
    city: "",
    startDateTime: "",
    endDateTime: "",
    price: "",
    image: "",
  });

  const categories = ["music", "pets", "food"];

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeCategory = (e) => {
    const categoryChosen = categories.find((c) => c === e.target.value);
    setData({
      ...data,
      category: categoryChosen,
    });
  };

  const submitData = (e) => {
    e.preventDefault();
    // document.querySelector("form").reset();
    // axios
    //   .post("mysql://root:lionPass@db:3306/events_app", data)
    //   .catch((err) => console.log(err));
    // const submitMessage = document.createElement("p");
    // submitMessage.innerHTML = "New recipe added!";
    // document.querySelector(".submitMessage").appendChild(submitMessage);
    console.log(data);
  };

  return (
    <div>
      <div>
        <h2>Create Event</h2>
        <div className="submitMessage"></div>
      </div>
      <form onSubmit={submitData}>
        <div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="eventname"
              id="eventname"
              onChange={changeData}
              placeholder="Event name"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="organizer"
              id="organizer"
              onChange={changeData}
              placeholder="Organizer"
            />
          </div>
          <div>
            <textarea
              className="form-control"
              type="text"
              name="description"
              id="description"
              onChange={changeData}
              placeholder="Description"
            />
          </div>
          <div className="category">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              name="category"
              id="category"
              onChange={changeCategory}
            >
              {categories.map((c) => (
                <option className="form-control" key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="locationFrame">
              <input
                className="form-control"
                type="text"
                name="street_address"
                id="street_address"
                placeholder="Street: e.g. Annankatu 1"
                onChange={changeData}
              />

              <input
                className="form-control"
                type="text"
                name="city"
                id="city"
                placeholder="City: e.g. Helsinki"
                onChange={changeData}
              />
            </div>
          </div>
          <div>
            <label htmlFor="startDateTime">Start date and time</label>
            <input
              type="datetime-local"
              name="startDateTime"
              id="startDateTime"
              onChange={changeData}
            />
          </div>
          <div>
            <label htmlFor="endDateTime">End date and time</label>
            <input
              type="datetime-local"
              name="endDateTime"
              id="endDateTime"
              onChange={changeData}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="text"
              name="price"
              id="price"
              onChange={changeData}
              placeholder="Price"
            />
          </div>
          <div>
            <input
              className="form-control"
              type="url"
              name="image"
              id="image"
              onChange={changeData}
              placeholder="Add image url"
            />
          </div>
        </div>
        <input className="button" type="submit" value="Add event" />
      </form>
    </div>
  );
};

export default CreateEvent;
