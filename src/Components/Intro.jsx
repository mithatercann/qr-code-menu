import React, { useEffect, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useLocation } from "react-router-dom";

function Intro({ languages, setLanguage }) {
  const location = useLocation();
  const [fadeOut, setFadeOut] = useState(false);
  const [style, setStyle] = useState({});
  if (!fadeOut) {
    disablePageScroll();
  }
  const test = () => {
    var num = 0;
    var interval = setInterval(() => {
      enablePageScroll();

      num++;
      if (num === 10) {
        clearInterval(interval);
        setStyle({
          display: "none",
        });
      }
    }, 40);
  };

  console.log(languages);
  return (
    <div style={style} className={`intro ${fadeOut ? "fadeOut" : null}`}>
      <img src={`images${location.pathname}/logo.png`} alt="" />
      <div className="intro__btns">
        {languages.map((language) => (
          <button
            onClick={() => {
              setFadeOut(true);
              setLanguage(language.language);
              test();
            }}
          >
            {languages.length > 1 ? language.language : "Open Menu"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Intro;
