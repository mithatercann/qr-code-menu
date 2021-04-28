import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";
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
  closeSearch,
  isSearchOpened,
}) {
  const heightOfWindow = window.innerHeight;
  const handleClick = () => {
    scroll.scrollToTop();
  };

  const test = (e) => {
    window.scrollTo(0, 0);
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
          onFocus={(e) => {
            openSearch();
            test(e);
          }}
          onBlur={() => {
            if (!searchValue) closeSearch();
          }}
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            test(e);
          }}
          spellCheck={false}
          className={`${isSearchOpened ? "opened" : "closed"} ${
            isSearchOpenedd ? "opened" : "closed"
          }`}
          type="text"
        />
        {isSearchOpened || isSearchOpenedd ? (
          <div className="svg">
            <MdClear
              onClick={() => {
                setSearchValue("");
                closeSearch();
              }}
              size={30}
            />
          </div>
        ) : (
          <div className="svg">
            <AiOutlineSearch className="header__search" size={26} />
          </div>
        )}
      </div>
      <span
        onClick={() => {
          if (cartData.length !== 0) {
            openCart();
          }
        }}
        className="header__cart"
      >
        <div className="header__cart--inner">
          <FiShoppingCart size={24} />
          <i>{cartData ? cartData.length : 0}</i>
        </div>
      </span>
    </header>
  );
}

export default Header;
