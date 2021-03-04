import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import MenuTitleImage from "./MenuTitleImage";

const MenuTitle = ({ menuTitles, callMenuList }) => {
  // const [selected, setSelected] = useState([menuTitles[0]]);
  const [titles, setTitles] = useState([]);
  // const selectTarget = (targetItem) => {
  //   setSelected(targetItem);
  // };

  useEffect(() => {
    if (!titles.includes(menuTitles)) {
      setTitles(menuTitles);
    }
  }, [menuTitles]);

  return (
    <section className="menu__titles">
      {titles.map((item) => (
        <div
          className="menu__title"
          // onClick={(e) => selectTarget(item)}
        >
          <MenuTitleImage
            // className={`menu__title--img ${
            //   selected.includes(item) && `selected`
            // }`}
            className="menu__title--img"
            src={`/images/${item.split(" ").join("_")}.jpg`}
            alt={"image"}
            onClick={(e) => callMenuList(item)}
          />

          <small>{item}</small>
        </div>
      ))}
    </section>
  );
};

export default MenuTitle;
