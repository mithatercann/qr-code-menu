import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Routers from "./Routers";
import "./Styles/style.css";

function Index() {
  const w = window.innerWidth;
  console.log("width = " + w);

  return w >= 650 ? (
    <div className="intro">
      <img src="/app-image/abeja.png" alt="" />
      <p>This app is only for mobiles</p>
      <a className="intro__link" href="https://abeja.com.tr">
        Visit website
      </a>
    </div>
  ) : (
    <Routers />
  );
}

render(<Index />, document.getElementById("root"));
