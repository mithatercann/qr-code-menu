import React, { useState } from "react";
import Header from "./Header";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";
import Cart from "./Cart";
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
}) => {
  const [isCartOpened, setIsCartOpened] = useState("closed");

  const openCart = () => {
    if (isCartOpened == "closed") {
      setIsCartOpened("opened");
    } else {
      setIsCartOpened("closed");
    }
  };
  const closeCart = () => {
    setIsCartOpened("closed");
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
        addToCart={(data) => addToCart(data)}
        location={location}
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
      <Footer />
    </div>
  );
};

export default Layout;
