import React, { useEffect, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useLocation } from "react-router-dom";

function Intro({ languages, setLanguage, setStyleForLayout }) {
  const location = useLocation();
  const [fadeOut, setFadeOut] = useState(false);
  const [style, setStyle] = useState({});

  const [customer, setCustomer] = useState([]);
  const CUSTOMER_API = "./customers.json";

  const locationName = location.pathname
    .split("")
    .splice(1, location.pathname.length)
    .join("");

  useEffect(() => {
    const fetchCustomer = async () => {
      fetch(CUSTOMER_API)
        .then((resp) => resp.json())
        .then((respData) => {
          for (let i = 0; i < respData.length; i++) {
            if (respData[i].name == locationName) {
              setCustomer(respData[i]);
              console.log(respData[i]);
            }
          }
        });
    };

    fetchCustomer();
  }, []);

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
      <div className="intro__inner">
        <div className="intro__top">
          <h1>{customer.restaurantName}</h1>
          <p>{customer.description}</p>
        </div>
        <div className="intro__btns">
          {languages.map((language) => (
            <button
              onClick={() => {
                setStyleForLayout();
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
    </div>
  );
}

export default Intro;
