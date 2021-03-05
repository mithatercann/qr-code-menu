import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./Styles/style.css";
function Index() {
  return <App />;
}

render(<App />, document.getElementById("root"));
