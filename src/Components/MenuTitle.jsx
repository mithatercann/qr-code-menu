import React, { useEffect, useState } from "react";

const MenuTitle = ({ menuTitles, callMenuList, location }) => {
  const [selected, setSelected] = useState("");

  return (
    <section className="menu__titles">
      {menuTitles.map((item) => (
        <div
          className={`menu__title ${
            item == selected && "menu__title--selected"
          }`}
        >
          <div
            onClick={(e) => {
              callMenuList(item);
              setSelected(item);
            }}
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
