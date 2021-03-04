import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import MenuTitleImage from "./MenuTitleImage";

const MenuTitle = React.memo(
  ({ menuTitles, callMenuList }) => {
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
            key={uuid()}
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
  },
  (prevProp, nextProps) => {
    if (prevProp.menuTitles.menuTitles === nextProps.menuTitles.menuTitles) {
      return false;
      console.log(prevProp.menuTitles.menuTitles);
    }
    return true;
  }
);

export default MenuTitle;
