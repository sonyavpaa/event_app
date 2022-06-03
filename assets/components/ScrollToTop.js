import React, { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <button
          type="button"
          className="btn btn-primary position-fixed"
          onClick={goToTop}
        >
          To top
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
