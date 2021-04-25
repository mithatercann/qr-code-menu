import React, { useState, useEffect, useRef } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import getWindowScrollTop from "get-window-scroll-top";

import Header from "./Header";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";
import Cart from "./Cart";
import MoreInfo from "./MoreInfo";
import MoreInfoCart from "./MoreInfoCart";
import Popup from "./Popup";
import Footer from "./Footer";

const Layout = ({
  cartData,
  menuList,
  menuTitles,
  callMenuList,
  addToCart,
  title,
  removeFromCart,
  currency,
  location,
  restaurantName,
  info,
  cartInfo,
  isInfoOpened,
  isCartInfoOpened,
  closeInfo,
  closeCartInfo,
  openInfo,
  openCartInfo,
  fullData,
  clearCart,
  translateData,
  styleForLayout,
  language,
}) => {
  const [isCartOpened, setIsCartOpened] = useState("closed");
  const [style, setStyle] = useState({});
  const [fixed, setFixed] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [warning, setWarning] = useState(false);
  const openCart = () => {
    setIsCartOpened("opened");
    setTimeout(() => {
      setStyle({
        position: "fixed",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      });
    }, 150);
  };
  const closeCart = () => {
    setIsCartOpened("closed");
    setStyle({
      position: "relative",
      overflow: "scroll",
      width: "auto",
      height: "auto",
      animation: "fadeIn 1s forwards",
    });
  };

  useEffect(() => {
    if (isInfoOpened || isCartInfoOpened) {
      disablePageScroll();
    } else {
      setTimeout(() => {
        enablePageScroll();
      }, 220);
    }
  }, [isInfoOpened, isCartInfoOpened]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (getWindowScrollTop() >= 130) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", setSearchOpened(false), {
      passive: true,
    });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openSearch = () => {
    setIsSearchOpened(true);
  };

  return (
    <div style={{ ...style, ...styleForLayout }}>
      <Header
        openCart={() => openCart()}
        cartData={cartData}
        restaurantName={restaurantName}
        isSearchOpenedd={searchOpened}
        isSearchOpened={isSearchOpened}
        setSearchValue={(value) => setSearchValue(value)}
        fixed={fixed}
        searchValue={searchValue}
        openSearch={() => openSearch()}
        closeSearch={() => setIsSearchOpened(false)}
      />
      <MenuTitle
        title={title}
        menuTitles={menuTitles}
        callMenuList={(titleProp) => callMenuList(titleProp)}
        location={location}
        fixed={fixed}
        clearSearchValue={() => setSearchValue("")}
        closeSearch={() => setIsSearchOpened(false)}
        language={language}
      />
      <MenuList
        fullData={fullData}
        fixed={fixed}
        title={title}
        menuList={menuList}
        location={location}
        openInfo={(item) => openInfo(item)}
        isInfoOpened={isInfoOpened}
        searchValue={searchValue}
        language={language}
      />
      <Cart
        currency={currency}
        cartData={cartData}
        openCartInfo={(item) => openCartInfo(item)}
        isCartOpened={isCartOpened}
        closeCart={() => closeCart()}
        location={location}
        restaurantName={restaurantName}
        clearCart={() => clearCart()}
        setWarning={(prop) => setWarning(prop)}
        translateData={translateData}
      />
      <MoreInfo
        closeInfo={() => closeInfo()}
        isInfoOpened={isInfoOpened}
        data={info}
        location={location}
        addToCart={(item, quantity) => addToCart(item, quantity)}
        translateData={translateData}
      />
      <MoreInfoCart
        closeCartInfo={() => closeCartInfo()}
        isCartInfoOpened={isCartInfoOpened}
        data={cartInfo}
        location={location}
        addToCart={(item, quantity) => addToCart(item, quantity)}
        removeFromCart={(itemCode) => removeFromCart(itemCode)}
        translateData={translateData}
      />
      <Popup
        setWarning={(prop) => setWarning(prop)}
        warning={warning}
        clearCart={() => clearCart()}
        translateData={translateData}
      />
      <Footer />
    </div>
  );
};

export default Layout;
