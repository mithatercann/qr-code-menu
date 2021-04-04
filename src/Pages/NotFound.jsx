import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="notfound">
      <img src="/app-image/not-found.jpg" alt="" />
      <h1>OOPS...</h1>
      <p>The page you are trying to open could not be found on the server.</p>
      <Link to="/">Go to home page</Link>
    </div>
  );
}

export default NotFound;
