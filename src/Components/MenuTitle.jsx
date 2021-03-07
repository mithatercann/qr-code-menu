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
          <div
            onClick={(e) => callMenuList(item)}
            style={{
              backgroundImage: `url("/images${location}/${item
                .split(" ")
                .join("_")}.jpg")`,
            }}
            className="menu__title--img"
          ></div>
          <small>{item}</small>
        </div>
      ))}
    </section>
  );
};

export default MenuTitle;
