import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      {/* <!-- Copyright --> */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Summer project:
        <br />
        <a className="text-dark" href="https://mdbootstrap.com/">
          BCH
        </a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
  );
};

export default Footer;
