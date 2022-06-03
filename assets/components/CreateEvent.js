import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateEvent.module.css";
let tags = [];

const CreateEvent = () => {
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

  // ****** ADDING TAGS ******

  const addTag = async (e) => {
    // removing unwanted spaces from user tag
    let tagArr = e.target.value.replace(/\s+/g, " ");
    if (tagArr.length > 1) {
      if (e.key === ",")
        if (tags.length < maxTags) {
          tagArr.split(",").forEach((tag) => {
            // makes sure no dublicates are imported
            if (!tags.includes(tag) && tag.length > 1) {
              tags.push(tag);
              createTag(tag);
              setData({ ...data, tags });
              e.target.value = "";
            }
          });
        }
    }
  };
  // creates single tag elements from the tag array
  const liTagArr = [];
  const createTag = () => {
    // empties the tagBox so there will be no dublicates
    const tagBox = document.querySelector(".tagBox");
    tagBox.querySelectorAll("li").forEach((li) => li.remove());
    // reverses the tags array so that the latest tag will be last one in the tagBox
    tags
      .slice()
      .reverse()
      .forEach((tag) => {
        let liTag = document.createElement("li");
        // adds tag inside the newly created li and creates the remove span icon inside li
        liTag.innerHTML = `${tag}<span>x</span>`;
        // adds event listener for the remove span icon
        liTag.children[0].addEventListener("click", (event) => {
          // removes the tag from the tags array and from DOM
          let index = tags.indexOf(tag);
          if (index !== -1) {
            tags.splice(index, 1);
            event.target.parentNode.remove();
          }
          countTag();
        });
        // adds the li element to tagBox
        tagBox.prepend(liTag);
        countTag();
      });
  };

  // gets rids of the comma in the input field after adding the tag
  const checkComma = (e) => {
    if (e.target.value === ",") {
      e.target.value = "";
    }
  };

  let maxTags = 5;
  const countTag = () => {
    const span = document.querySelector(".tagSpan");
    span.innerText = maxTags - tags.length;
  };

  const emptyTags = (e) => {
    console.log(e);
    tags = [];
    const tagBox = document.querySelector(".tagBox");
    tagBox.querySelectorAll("li").forEach((li) => li.remove());
    countTag();
  };

  // ******************

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

  const submitData = async (e) => {
    e.preventDefault();
    // empties the tags array and the DOM from tags
    emptyTags();

    await axios.post("/api/events", data).catch((err) => console.log(err));
    document.querySelector(".createForm").reset();

    const submitMessage = document.createElement("p");
    submitMessage.innerHTML = "New event added!";

    document.querySelector(".submitMessage").appendChild(submitMessage);
  };

  return (
    <>
      <div className="formFrame">
        <h2>Create Event</h2>

        <div className="submitMessage"></div>

        <form className="createForm" onSubmit={submitData}>
          <div>
            <div className="d-flex form-group my-1">
              <input
                className=" d-flex form-control"
                type="text"
                name="name"
                id="name"
                onChange={changeData}
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
            <div className="my-1 wrapper form-control">
              <label htmlFor="tags">Tags</label>
              <div className="content">
                <ul className="tagBox">
                  <input
                    type="text"
                    id="tags"
                    onKeyDown={addTag}
                    onKeyUp={checkComma}
                    placeholder="Enter comma after each tag"
                  />
                </ul>
              </div>
              <div className="details">
                <p className="tagPar my-2">
                  <span className="tagSpan">{maxTags}</span> tags are remaining
                </p>
                <button
                  className="button form-control row my-1 mx-0"
                  onClick={(e) => emptyTags(e)}
                  style={{ width: "80%", alignSelf: "flex-end" }}
                >
                  Remove all tags
                </button>
              </div>
            </div>
            <div className="category from-group row my-1">
              <div className="col-sm-20">
                <select
                  className="form-control my-1"
                  name="category"
                  id="category"
                  onChange={changeCategory}
                  required
                  defaultValue=""
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.map((c) => (
                    <option className="form-control" key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="locationFrame">
                <input
                  className="form-control my-1"
                  type="text"
                  name="venue"
                  id="venue"
                  placeholder="Venue name: e.g. Löyly"
                  onChange={changeData}
                />
                <input
                  className="form-control my-1"
                  type="text"
                  name="streetname"
                  id="streetname"
                  placeholder="Street: e.g. Annankatu 1"
                  onChange={changeData}
                />
                <input
                  className="form-control my-1"
                  type="text"
                  name="postalcode"
                  id="postalcode"
                  placeholder="Postal Code: e.g 00100"
                  onChange={changeData}
                />

                <input
                  className="form-control my-1"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City: e.g. Helsinki"
                  onChange={changeData}
                />
              </div>
            </div>
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
              />
            </div>
            <div>
              <input
                className="form-control my-1"
                type="text"
                name="price"
                id="price"
                onChange={changeData}
                placeholder="Price"
              />
            </div>
            <div>
              <input
                className="form-control my-1"
                type="url"
                name="image"
                id="image"
                onChange={changeData}
                placeholder="Add image url"
              />
            </div>
          </div>
          <input
            className="button form-control"
            type="submit"
            value="Add event"
          />
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
