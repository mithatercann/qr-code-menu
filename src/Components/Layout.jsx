import React, { useState, useEffect } from "react";
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
  const [style, setStyle] = useState({});
  const openCart = () => {
    setIsCartOpened("opened");
    setBlockScroll(true);
  };
  const closeCart = () => {
    setIsCartOpened("closed");
    setBlockScroll(false);
  };

  useEffect(() => {
    if (isInfoOpened || isCartOpened == "opened") {
      setStyle({
        overflow: "hidden",
        position: "fixed",
        height: "100%",
        width: "100%",
      });
    } else {
      setTimeout(() => {
        setStyle({
          overflow: "",
          position: "",
          height: "",
          width: "",
        });
      }, 600);
    }
  }, [isInfoOpened, isCartOpened]);
  return (
    <div style={style}>
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
        isInfoOpened={isInfoOpened}
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
