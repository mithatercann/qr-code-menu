import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import getWindowScrollTop from "get-window-scroll-top";

const MenuTitle = ({
  menuTitles,
  callMenuList,
  location,
  fixed,
  clearSearchValue,
  closeSearch,
}) => {
  const [selected, setSelected] = useState("");

  const scrollTop = () => {
    scroll.scrollToTop();
  };

  const checkScrollTop = (item) => {
    const interval = setInterval(() => {
      if (
        document.documentElement.scrollTop === 0 &&
        document.body.scrollTop === 0
      ) {
        callMenuList(item);
        clearInterval(interval);
      }
    }, 10);
  };

  return (
    <section
      className={`menu__titles ${
        fixed ? "menu__titles--fixed" : "menu__titles--normal"
      }`}
    >
      {menuTitles.map((item) => (
        <div
          onClick={(e) => {
            checkScrollTop(item);
            setSelected(item);
            scrollTop();
            clearSearchValue();
            closeSearch();
          }}
          className={`menu__title ${
            item == selected && "menu__title--selected"
          }`}
        >
          <div
            style={{
              backgroundImage: `url("/images${location}/categories/${item
                .split(" ")
                .join("_")}.jpg")`,
            }}
            className="menu__title--img"
          ></div>
          <small>{item}</small>
        </div>
      ))}
      {/* <div className="menu__titles--fixed">
        {menuTitles.map((item) => (
          <small
            onClick={(e) => {
              checkScrollTop(item);
              setSelected(item);
              scrollTop();
              clearSearchValue();
              closeSearch();
            }}
          >
            {item}
          </small>
        ))}
      </div> */}
    </section>
  );
};

export default MenuTitle;
