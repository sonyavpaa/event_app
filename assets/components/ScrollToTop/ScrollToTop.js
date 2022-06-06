import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
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
        <div
          onClick={goToTop}
          className="ScrollToTop btn btn-outline-primary d-flex py-0 px-1"
        >
          <span>
            <KeyboardArrowUpIcon />
          </span>
          <span>Top</span>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
