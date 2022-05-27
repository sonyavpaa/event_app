import React from "react";
import EventList from "./EventList";

const Home = (props) => {
  return (
    <div>
      {/* Main jumbotron for a primary marketing message or call to action  */}
      <div className="jumbotron p-3 mb-5">
        <div className="container">
          <h1 className="display-3">Now is your time!</h1>
          <p>
            This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>
          <p>
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Find your next event &raquo;
            </a>
          </p>
        </div>
      </div>

      {/* Cards container  */}
      <EventList dateTimeFormat={props.dateTimeFormat} />
    </div>
  );
};

export default Home;
