import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import ScrollLock, { TouchScrollable } from "react-scrolllock";

import getSymbolFromCurrency from "currency-symbol-map";
const MenuList = ({
  menuList,
  title,
  location,
  openInfo,
  blockScroll,
  isInfoOpened,
}) => {
  return (
    <ScrollLock isActive={isInfoOpened || blockScroll ? true : false}>
      <section className="menu__list">
        <span className="menu__list--title">{title}</span>

        {menuList.map((item) => (
          <div
            onClick={(e) => {
              openInfo(item);
            }}
            className="menu__list--item"
          >
            <span className="menu__list--detail">
              <div className="menu__list--top">
                <div className="menu__list--top--left">
                  <span className="menu__list--name"> {item.NAME}</span>
                  <div className="menu__list--desc">
                    {item.DESCRIPTION.split("").splice(0, 60).join("")}...
                  </div>
                </div>
                <img
                  className={"menu__list--img"}
                  src={`/images${location}/${item.TYPE.split(" ").join(
                    "_"
                  )}.jpg`}
                  alt={"image"}
                />
              </div>
              <div className="menu__list--bottom">
                <div className="menu__list--price">
                  {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}
                </div>
                <div className="menu__list-duration">
                  <AiOutlineFieldTime size={20} />
                  15-30 min
                </div>
              </div>
            </span>
          </div>
        ))}
      </section>
    </ScrollLock>
  );
};

export default MenuList;
