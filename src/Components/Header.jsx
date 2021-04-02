import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { animateScroll as scroll } from "react-scroll";

function Header({
  openCart,
  cartData,
  restaurantName,
  isSearchOpenedd,
  setSearchValue,
  fixed,
  searchValue,
  openSearch,
  isSearchOpened,
}) {
  const handleClick = () => {
    scroll.scrollToTop();
  };

  return (
    <header className={`header ${fixed ? "header__fixed" : null}`}>
      <p
        onClick={() => {
          handleClick();
        }}
        className="header__logo"
      >
        {restaurantName}
      </p>
      <div className="header__input">
        <input
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            scroll.scrollToTop();
          }}
          spellCheck={false}
          className={`${isSearchOpened ? "opened" : "closed"} ${
            isSearchOpenedd ? "opened" : "closed"
          }`}
          type="text"
        />
        <AiOutlineSearch
          className="header__search"
          onClick={() => openSearch()}
          size={26}
        />
      </div>
      <span onClick={() => openCart()} className="header__cart">
        <div className="header__cart--inner">
          <FiShoppingCart size={24} />
          <i>{cartData.length}</i>
        </div>
      </span>
    </header>
  );
}

export default Header;
