import React from "react";
import { render } from "react-dom";
import Routers from "./Routers";
import "./Styles/style.css";
function Index() {
  return <Routers />;
}

render(<Routers />, document.getElementById("root"));
