import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import smoothscroll from "smoothscroll-polyfill";

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
  };

  const centerItems = (e) => {
    e.target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
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
  if (fixed) {
    smoothscroll.polyfill();
  }
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
            if (fixed) centerItems(e);
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
