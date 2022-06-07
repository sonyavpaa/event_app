import React from "react";
import EventList from "./EventList";

const Home = (props) => {
  return (
    <div>
      {/* Main jumbotron for a primary marketing message or call to action  */}
      <div className="jumbotron p-3 mb-5">
        <div className="container">
          <h1 className="display-3 text-light">Now is your time!</h1>
          <p className="text-light">
            This is a website where you can browse interesting events near you
            and also share your own.
          </p>
        </div>
      </div>

      {/* Cards container  */}
      <EventList />
    </div>
  );
};

export default Home;
