import React from "react";

function Home() {
  return (
    <div className="home__container">
      <div
        style={{ backgroundImage: "url(/app-image/bg.jpg)" }}
        className="home__bg"
      ></div>
      <div className="home">
        <img src="/app-image/abeja.png" alt="" />
        <p>
          Your customers can easily review your menu without a waiter , with the
          digital menu.
        </p>
        <a href="https://menu.abejatechnology.com/demo">See Demo</a>
      </div>
    </div>
  );
}

export default Home;
