import React from "react";
import { render } from "react-dom";
import Routers from "./Routers";
import "./Styles/style.css";

function Index() {
  const w = window.innerWidth;
  console.log("width = " + w);

  return w >= 450 ? <h1>This app is only for mobile</h1> : <Routers />;
}

render(<Index />, document.getElementById("root"));
