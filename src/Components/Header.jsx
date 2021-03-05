import React from "react";
import { FiShoppingCart } from "react-icons/fi";
function Header({ openCart, cartData, restaurantName }) {
  return (
    <header className="header">
      <p className="header__logo">{restaurantName}</p>
      <span className="header__cart">
        <FiShoppingCart onClick={() => openCart()} size={24} />
        <i>{cartData.length}</i>
      </span>
    </header>
  );
}

export default Header;
