import React from "react";
import { animateScroll as scroll } from "react-scroll";

function Footer() {
  return (
    <footer onClick={() => scroll.scrollToTop()} className="footer">
      ABEJA
    </footer>
  );
}

export default Footer;
