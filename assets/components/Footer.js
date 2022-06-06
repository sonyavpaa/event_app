import React from "react";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted mt-5">
      <ScrollToTop />
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a
            href="#"
            name="facebook"
            className="me-4 text-reset"
            onClick={(e) => share(e)}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            name="twitter"
            className="me-4 text-reset"
            onClick={(e) => share(e)}
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Eventful
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Plan Events</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Find Events</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Connect with us</h6>
              <p>
                <i className="fas fa-home me-3"></i> Helsinki Business College,
                Finland
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 EventFul
        <a
          className="text-reset fw-bold"
          target="_blank"
          href="https://www.bc.fi/?gclid=Cj0KCQjw4uaUBhC8ARIsANUuDjVR5k8-ps47V5qn8uZA0H6dNy6AcRSofQNjGx8aLlODBSNBXCm6jE4aAl2iEALw_wcB"
        >
          BCH
        </a>
      </div>
    </footer>
  );
};

export default Footer;
