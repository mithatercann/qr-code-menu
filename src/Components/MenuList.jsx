import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";

import getSymbolFromCurrency from "currency-symbol-map";
const MenuList = ({ menuList, addToCart, title }) => {
  const [state, setState] = useState("closedOne");
  const openInfo = () => {
    if (state == "closedOne") {
      setState("openedOne");
    } else {
      setState("closedOne");
    }
  };
  return (
    <section className="menu__list">
      <span className="menu__list--title">{title}</span>

      {menuList.map((item) => (
        <div
          onClick={(e) => {
            addToCart(item);
            openInfo();
          }}
          className="menu__list--item"
        >
          <span className="menu__list--detail">
            <div className="menu__list--top">
              <div className="menu__list--top--left">
                <span className="menu__list--name"> {item.NAME}</span>
                <div className="menu__list--desc">
                  Here is for product's description that i will complete later
                  on...
                </div>
              </div>
              <img
                className={"menu__list--img"}
                src={`/images/${item.TYPE.split(" ").join("_")}.jpg`}
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
  );
};

export default MenuList;
