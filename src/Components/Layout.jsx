import React, { useState, useEffect } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Header from "./Header";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";
import Cart from "./Cart";
import MoreInfo from "./MoreInfo";
import MoreInfoCart from "./MoreInfoCart";
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
}) => {
  const [isCartOpened, setIsCartOpened] = useState("closed");

  const openCart = () => {
    setIsCartOpened("opened");
  };
  const closeCart = () => {
    setIsCartOpened("closed");
  };

  useEffect(() => {
    if (isInfoOpened || isCartInfoOpened) {
      disablePageScroll();
    } else {
      setTimeout(() => {
        enablePageScroll();
      }, 500);
    }
  }, [isInfoOpened, isCartInfoOpened]);
  return (
    <div>
      <Header
        openCart={() => openCart()}
        cartData={cartData}
        restaurantName={restaurantName}
      />
      <MenuTitle
        menuTitles={menuTitles}
        callMenuList={(titleProp) => callMenuList(titleProp)}
        location={location}
      />
      <MenuList
        title={title}
        menuList={menuList}
        location={location}
        openInfo={(item) => openInfo(item)}
        isInfoOpened={isInfoOpened}
      />
      <Cart
        currency={currency}
        cartData={cartData}
        openCartInfo={(item) => openCartInfo(item)}
        isCartOpened={isCartOpened}
        closeCart={() => closeCart()}
        location={location}
        restaurantName={restaurantName}
      />
      <MoreInfo
        closeInfo={() => closeInfo()}
        isInfoOpened={isInfoOpened}
        data={info}
        location={location}
        addToCart={(item, quantity) => addToCart(item, quantity)}
      />
      <MoreInfoCart
        closeCartInfo={() => closeCartInfo()}
        isCartInfoOpened={isCartInfoOpened}
        data={cartInfo}
        location={location}
        addToCart={(item, quantity) => addToCart(item, quantity)}
        removeFromCart={(itemCode) => removeFromCart(itemCode)}
      />
      <Footer />
    </div>
  );
};

export default Layout;
