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
  title,
}) => {
  const [selected, setSelected] = useState(title);

  const scrollTop = (e) => {
    scroll.scrollToTop();
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "center",
    });
  };

  const centerItems = (e) => {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "center",
    });
  };

  const checkScrollTop = (item) => {
    const interval = setInterval(() => {
      if (
        document.documentElement.scrollTop === 0 &&
        document.body.scrollTop === 0
      ) {
        callMenuList(item);
        document.querySelector(".menu__title--selected").scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "center",
        });
        clearInterval(interval);
      }
    }, 10);
  };

  useEffect(() => {
    setSelected(menuTitles[0]);
  }, [menuTitles]);

  return (
    <section className={`menu__titles ${fixed ? "menu__titles--fixed" : null}`}>
      {menuTitles.map((item) => (
        <div
          onClick={(e) => {
            checkScrollTop(item);
            setSelected(item);
            centerItems(e);
            scrollTop(e);
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
    </section>
  );
};

export default MenuTitle;
