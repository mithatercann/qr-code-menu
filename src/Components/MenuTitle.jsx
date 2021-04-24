import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { v4 as uuid } from "uuid";
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

  useEffect(() => {
    setSelected(menuTitles[0]);
  }, [menuTitles]);

  return (
    <>
      <section className={`menu__titles`}>
        {menuTitles.map((item) => (
          <div
            onClick={(e) => {
              checkScrollTop(item);
              setSelected(item);
              centerItems(e);
              if (fixed) centerItems(e);
              scrollTop(e);
              clearSearchValue();
              closeSearch();
            }}
            className={
              item == selected ? "menu__title--selected" : "menu__title"
            }
          >
            <div
              style={{
                backgroundImage: `url("images${location}/categories/${item
                  .split(" ")
                  .join("_")}.jpg")`,
              }}
              className="menu__title--img"
            ></div>

            <small>{item}</small>
            <span className="menu__title--bg"></span>
          </div>
        ))}
      </section>
      <div className={fixed ? "menu__fixed" : "hidden"}>
        {menuTitles.map((title) => (
          <small
            className={title == selected && "menu__fixed--selected"}
            onClick={(e) => {
              checkScrollTop(title);
              setSelected(title);
              centerItems(e);
              if (fixed) centerItems(e);
              scrollTop(e);
              clearSearchValue();
              closeSearch();
            }}
          >
            {title}
          </small>
        ))}
      </div>
    </>
  );
};

export default MenuTitle;
