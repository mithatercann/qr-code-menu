import React, { useState } from "react";
import Header from "./Header";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";
import Cart from "./Cart";
import MoreInfo from "./MoreInfo";
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
  isInfoOpened,
  closeInfo,
  openInfo,
}) => {
  const [isCartOpened, setIsCartOpened] = useState("closed");
  const [blockScroll, setBlockScroll] = useState(false);
  const openCart = () => {
    setIsCartOpened("opened");
    setBlockScroll(true);
  };
  const closeCart = () => {
    setIsCartOpened("closed");
    setBlockScroll(false);
  };

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
        blockScroll={blockScroll}
      />
      <Cart
        currency={currency}
        cartData={cartData}
        removeFromCart={(itemId) => removeFromCart(itemId)}
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
      <Footer />
    </div>
  );
};

export default Layout;
