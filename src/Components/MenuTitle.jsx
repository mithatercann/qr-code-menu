import React, { useEffect, useState } from "react";

const MenuTitle = ({ menuTitles, callMenuList, location }) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (!titles.includes(menuTitles)) {
      setTitles(menuTitles);
    }
  }, [menuTitles]);

  return (
    <section className="menu__titles">
      {titles.map((item) => (
        <div className="menu__title">
          <img
            onClick={(e) => callMenuList(item)}
            className="menu__title--img"
            src={`/images${location}/${item.split(" ").join("_")}.jpg`}
            alt="Title"
          />
          <small>{item}</small>
        </div>
      ))}
    </section>
  );
};

export default MenuTitle;
